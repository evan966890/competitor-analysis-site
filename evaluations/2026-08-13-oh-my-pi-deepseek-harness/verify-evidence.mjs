import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import vm from 'node:vm';

const root = new URL('../../', import.meta.url);
const evalDir = new URL('./', import.meta.url);
const result = JSON.parse(fs.readFileSync(new URL('eval-results.json', evalDir), 'utf8'));

function lines(url) {
  return fs.readFileSync(url, 'utf8').trim().split('\n').filter(Boolean).map(line => JSON.parse(line));
}

const ompEvents = lines(new URL('artifacts/omp-session.jsonl', evalDir));
const ompMessages = ompEvents.filter(event => event.type === 'message').map(event => event.message);
const ompAssistant = ompMessages.filter(message => message?.role === 'assistant');
const ompToolCalls = ompAssistant.flatMap(message => message.content ?? []).filter(block => block.type === 'toolCall');
const ompUsage = ompAssistant.map(message => message.usage).filter(Boolean);

assert.equal(ompAssistant.length, result.results.ohMyPi.modelSteps);
assert.equal(ompToolCalls.length, result.results.ohMyPi.toolCalls);
assert.equal(ompUsage.reduce((sum, usage) => sum + usage.input, 0), result.results.ohMyPi.tokens.inputNonCached);
assert.equal(ompUsage.reduce((sum, usage) => sum + usage.cacheRead, 0), result.results.ohMyPi.tokens.cacheRead);
assert.equal(ompUsage.reduce((sum, usage) => sum + usage.output, 0), result.results.ohMyPi.tokens.output);
assert.ok(ompAssistant.every(message => message.provider === 'mify'));
assert.ok(ompAssistant.every(message => message.model === result.model.wireModel));
assert.ok(ompMessages.some(message => message?.role === 'toolResult' && JSON.stringify(message).includes('pass 2')));

const dshText = execFileSync('zstdcat', [new URL('artifacts/dsh-session.jsonl.zstd', evalDir).pathname], { encoding: 'utf8' });
const dshEvents = dshText.trim().split('\n').filter(Boolean).map(line => JSON.parse(line));
const dshAssistant = dshEvents.filter(event => event.type === 'assistant/message');
const dshToolCalls = dshEvents.filter(event => event.type === 'tool/call');
const dshUsages = dshAssistant.map(event => event.data?.usage).filter(Boolean);

assert.equal(dshAssistant.length, result.results.deepseekHarness.modelSteps);
assert.equal(dshToolCalls.length, result.results.deepseekHarness.toolCalls);
assert.equal(dshUsages.reduce((sum, usage) => sum + usage.inputTokens, 0), result.results.deepseekHarness.tokens.inputNonCached);
assert.equal(dshUsages.reduce((sum, usage) => sum + usage.cacheReadTokens, 0), result.results.deepseekHarness.tokens.cacheRead);
assert.equal(dshUsages.reduce((sum, usage) => sum + usage.outputTokens, 0), result.results.deepseekHarness.tokens.output);
assert.ok(dshAssistant.every(event => event.data?.message?.source?.provider === 'mify'));
assert.ok(dshAssistant.every(event => event.data?.message?.source?.model === result.model.wireModel));
assert.ok(dshEvents.some(event => event.type === 'tool/result' && JSON.stringify(event).includes('pass 2')));

const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(new URL('data/products.js', root), 'utf8'), context);
assert.equal(context.window.TD_PRODUCTS.length, 169);
assert.equal(new Set(context.window.TD_PRODUCTS.map(product => product.id)).size, 168);
assert.equal(context.window.TD_PRODUCTS.filter(product => product.id === 'opencode').length, 2);
assert.equal(context.window.TD_PRODUCTS.filter(product => product.id === 'deepseek-harness').length, 1);
assert.equal(context.window.TD_PRODUCTS.filter(product => product.id === 'oh-my-pi').length, 1);

const index = fs.readFileSync(new URL('index.html', root), 'utf8');
assert.ok(index.includes('<script src="data/oh-my-piDeepDive.js"></script>'));
assert.ok(index.includes('<script src="data/deepseek-harnessDeepDive.js"></script>'));
assert.ok(index.includes("'oh-my-pi': TD_OH_MY_PI_DEEPDIVE"));
assert.ok(index.includes("'deepseek-harness': TD_DEEPSEEK_HARNESS_DEEPDIVE"));
assert.ok(index.includes('以下 ${d.demoShots.length} 张均为实机截图'));

for (const relative of [
  'assets/shots/oh-my-pi/01-live-session-model-tools.jpg',
  'assets/shots/oh-my-pi/02-live-eval-result.jpg',
  'assets/shots/deepseek-harness/01-live-home-mify.jpg',
  'assets/shots/deepseek-harness/02-live-mimo-eval-result.jpg',
  'assets/shots/deepseek-harness/03-live-trajectory.jpg',
  'assets/shots/deepseek-harness/04-live-model-settings.jpg',
]) {
  assert.ok(fs.statSync(new URL(relative, root)).size > 0, `${relative} must be non-empty`);
}

console.log('evidence consistency: PASS (OMP 6 steps/7 tools; DSH 8 steps/9 tools; tokens, model, tests, routes, screenshots verified)');

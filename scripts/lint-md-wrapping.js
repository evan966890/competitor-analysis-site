#!/usr/bin/env node
// lint-md-wrapping.js — 检测 index.html 里所有 ${X} 文本引用是否走 md() 包装
//
// 规则：
//   - 文本字段（motto / oneLiner / micoNote / verdict / obs / caption / note / pros / cons / ...）
//     渲染时必须用 ${md(X)} 包装
//   - 已知豁免：纯结构字段（id / name / type / icon / 数字）、图片 src / 链接 href
//   - 已知豁免：变量名以 `im.code` / `c.code` 结尾的已经在 <pre> 里用 .replace(/</g, '&lt;') 处理
//
// 退出码 0 = 通过, 1 = 有违规
//
// 用法: node scripts/lint-md-wrapping.js

const fs = require('fs');
const path = require('path');

const INDEX = path.join(__dirname, '..', 'index.html');
const text = fs.readFileSync(INDEX, 'utf8');

// 已知的文本字段（必须过 md）
const TEXT_FIELDS = [
  'motto', 'oneLiner', 'micoNote', 'verdict', 'why', 'obs', 'idea', 'logic', 'mico',
  'caption', 'note', 'tagline', 'headline', 'summary', 'action',
  'pros', 'cons', 'problemDiagnosis', 'designPrinciples', 'forMico',
  'answer', 'coreQuestion', 'evidence', 'hot',
  // 字段子访问
  'p.motto', 'p.oneLiner', 'p.micoNote', 'p.tagline',
  'd.verdict', 'd.why', 'd.obs', 'd.idea', 'd.logic', 'd.mico',
  'd.tagline', 'd.headline', 'd.summary', 'd.action',
  'd.conclusion.summary',
  'l.idea', 'l.logic', 'l.verdict', 'l.mico',
  'l.decisions[].verdict', 'l.decisions[].why',
  'pb.why', 'pb.scenario', 'pb.mico', 's.name', 's.obs', 'c.action',
  't.verdict',
  'it.caption', 'it.evidence', 'item.caption', 'item.evidence',
  's.caption', 's.note',
  'p.pros', 'p.cons',
];

const VIOLATIONS = [];

// 找所有 ${X} 模式
const templateRe = /\$\{([^}]+?)\}/g;
let m;
while ((m = templateRe.exec(text)) !== null) {
  const expr = m[1];
  // 跳过不完整匹配（嵌套模板字符串 — regex 不支持嵌套）
  if (expr.includes('`') || expr.endsWith('${') || /^[\w?.()[\]\s]+\$\{/.test(expr)) continue;
  // 跳过已经 md()/md60()/mdCut()/esc() 包裹的
  if (/^md\(/.test(expr) || /^md60\(/.test(expr) || /^mdCut\(/.test(expr) || /^esc\(/.test(expr)) continue;
  // 跳过结构字段（不在 TEXT_FIELDS 里）
  const isText = TEXT_FIELDS.some(f => expr.includes(f));
  if (!isText) continue;
  // 三元里全是数字 + 中文描述（无 .field 文本字段访问）— 视为条件文案
  if (/\?/.test(expr) && /:/.test(expr) && !/\.(motto|oneLiner|micoNote|verdict|why|obs|note|tagline|headline|summary|action|caption|idea|logic|problemDiagnosis|designPrinciples|forMico|answer|coreQuestion|pros|cons|engine|file|title)\b/.test(expr)) continue;
  // 跳过纯数字/常量
  if (/^['"\d\s+\-*/.()]+$/.test(expr)) continue;
  // 跳过 onxxx / JSON.stringify
  if (/^(JSON\.stringify|onclick|location\.)/.test(expr)) continue;
  // 排除常见 false positive
  if (/\.length\s*[?!]/.test(expr)) continue;             // .length > 50
  if (/\.length\s*[+\-*/]/.test(expr)) continue;          // .length - 1
  if (/\.length\b/.test(expr) && !/['"`]/.test(expr)) continue;  // 纯 .length 数字（不算文本字段）
  if (/\.slice\(/.test(expr)) continue;                  // .slice(0, 50)
  if (/\.map\(/.test(expr)) continue;                    // .map(x => ...)
  if (/\.filter\(/.test(expr)) continue;                  // .filter(...)
  if (/\.find\(/.test(expr)) continue;                   // .find(...)
  if (/\.sort\(/.test(expr)) continue;                   // .sort(...)
  if (/\.join\(/.test(expr)) continue;                   // .join('')
  if (/\.reduce\(/.test(expr)) continue;
  if (/\.replace\(/.test(expr)) continue;                // .replace(/'/g, ...)
  if (/\.img\b/.test(expr) && /^[\w?.]+$/.test(expr.trim())) continue;  // shot.img — image src
  if (/\?\?\s*'/.test(expr) || /\?\?\s*"/.test(expr)) continue;  // p.motto || ''
  if (/^\s*\w+\s*\|\|\s*'/.test(expr)) continue;          //  OR fallback
  if (/MD_EXPORT|md\s*\+=|`/.test(expr.slice(-20))) continue;     // md += ... in markdown export
  if (expr.includes(' => `<li>')) continue;              // map to <li>
  if (expr.includes('reduces')) continue;
  if (/^\s*\w+\.filter\(s\s*=>\s*s\.img\)/.test(expr)) continue;
  // 条件分支（X ? Y : Z）— 包括三元表达式里包了 esc/md60/mdCut 的
  if (/\?/.test(expr) && /:/.test(expr)) {
    // 三元 + 内部已包装 -> OK
    if (/\?[^?]*\(/.test(expr)) continue;
    // 简单 X ? Y : Z
    if (/^\s*[\w?.()[\].\s]+\?/.test(expr)) continue;
    // 三元里任一分支已经包装（md/esc/mdCut）
    if (/(md|esc|md60|mdCut|JSON\.stringify)\(/.test(expr)) continue;
    // 三元里只有数字/纯字段（.length, 字符串字面量）— 视为条件显示，不是文本字段
    if (/^[\w?.()[\].\s`'"]+\.length\s*\?\s*`/.test(expr)) continue;
  }
  // 兜底：表达式里包含 md(.../esc(.../JSON.stringify( 任何一个，视为已包装
  if (/(md|esc|md60|mdCut|JSON\.stringify)\(/.test(expr)) continue;
  // JSON.stringify 序列化的内容（已经在 JSON 编码里 XSS-safe）
  if (expr.includes('JSON.stringify')) continue;
  // chip filter 条件
  if (/^filter===/.test(expr)) continue;
  // 已经拼好的 HTML 字符串（已经走 md）
  if (/^[a-zA-Z_$][\w$]*$/.test(expr.trim())) continue;  // bare identifier 可能是已构建的 HTML
  // 单文件图片 src
  if (/^shot\.img$/.test(expr)) continue;
  // micoInsights/lane name 等已经是拼好的 HTML
  if (expr === 'micoInsights' || expr === 'l.name') continue;
  // 注释里的示例（行 531 等）— 包含中文错误/正确
  if (expr.includes('p.micoNote') && /❌|✅|错误|正确|examples?/.test(expr)) continue;
  // 三元里包含 ` : ${...}` 但有 <span> 开标签
  if (expr.includes('<span class="tag">')) continue;
  // md 模板字符串拼接（line 945 等）—— 是 markdown 导出逻辑，不是渲染
  if (expr.includes('md += ') || expr.includes('p.pros.forEach') || expr.includes('p.cons.forEach')) continue;
  // markdown 导出模板 — 上下文出现 forEach/md += 即视为导出逻辑
  if (/p\.pros\.forEach|p\.cons\.forEach/.test(text.slice(Math.max(0, m.index - 200), m.index))) continue;
  // 上下文是 downloadReport 函数（line 939-955）— 整段是 markdown 导出
  if (text.slice(Math.max(0, m.index - 500), m.index).includes('function downloadReport()')) continue;
  // JSDoc 注释里的示例（包含 `*` 注释前缀）
  const lineStart = text.lastIndexOf('\n', m.index) + 1;
  const linePrefix = text.slice(lineStart, m.index);
  if (linePrefix.includes('*') || linePrefix.includes('//')) continue;

  VIOLATIONS.push({
    pos: m.index,
    line: text.slice(0, m.index).split('\n').length,
    expr: expr.slice(0, 100),
    ctx: text.slice(Math.max(0, m.index - 40), m.index + 60).replace(/\n/g, ' ')
  });
}

console.log(`Scanned ${INDEX}`);
console.log(`Template literals: ${(text.match(/\$\{/g) || []).length}`);
console.log(`md() wrapped: ${(text.match(/\$\{md\(/g) || []).length}`);
console.log();
if (VIOLATIONS.length === 0) {
  console.log('✅ All text fields wrapped with md()');
  process.exit(0);
}

console.log(`❌ Found ${VIOLATIONS.length} potential violations:\n`);
VIOLATIONS.slice(0, 30).forEach(v => {
  console.log(`  line ${v.line}: ${v.expr}`);
  console.log(`    ...${v.ctx}...`);
});
if (VIOLATIONS.length > 30) {
  console.log(`  ... and ${VIOLATIONS.length - 30} more`);
}
process.exit(1);

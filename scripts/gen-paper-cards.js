#!/usr/bin/env node
// gen-paper-cards.js — 给 137 个论文项目批量生成 GitHub repo card 风格 SVG
// 目的：解决"大量站点没有截图"问题 — 用 SVG 占位卡代替真实 README 截图
// 优点：秒出 137 张 + 信息密度高 + 不依赖 kimi-webbridge/headless Chrome
// 缺点：不是真实截图（用户可在深阶段用 kimi-webbridge 替换为实拍）

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const dataDir = path.join(ROOT, 'data');

// 读 products.js 拿产品 entry（不执行）
const productsText = fs.readFileSync(path.join(dataDir, 'products.js'), 'utf8');

// 解析 paper 类型产品
const paperRe = /\{\s*id:\s*'([\w-]+)'[^{}]*name:\s*'([^']+)'[^{}]*type:\s*'paper'[^{}]*motto:\s*'([^']+)'[^{}]*oneLiner:\s*'([^']+)'[^{}]*scores:\s*(\{[^}]+\})[^{}]*pros:\s*\[([^\]]+)\][^{}]*cons:\s*\[([^\]]+)\]/g;

const paperProducts = [];
let m;
while ((m = paperRe.exec(productsText)) !== null) {
  const id = m[1];
  const name = m[2];
  const motto = m[3];
  const oneLiner = m[4];
  const prosRaw = m[6];  // [5] is scores (skipped)
  // 从 pros 提取 stars
  const starMatch = prosRaw.match(/\*\*([\d.]+k?)\s+stars\*\*/);
  const stars = starMatch ? starMatch[1] : '?';
  // 从 oneLiner 提取 Layer
  const layerMatch = oneLiner.match(/论文\s+([A-Z])\s*层/) || oneLiner.match(/论文\s+([A-Z]\s*\/\s*[A-Z])\s*层/);
  const layer = layerMatch ? layerMatch[1].replace(/\s/g, '') : '?';
  if (!paperProducts.find(x => x.id === id)) paperProducts.push({ id: id, name: name, oneLiner: oneLiner, stars: stars, layer: layer });
}

console.log('Found ' + paperProducts.length + ' paper products');

// 读 deepDive 文件找 primaryLayer
const ddFiles = fs.readdirSync(dataDir).filter(f => /DeepDive\.js$/.test(f));
for (let i = 0; i < ddFiles.length; i++) {
  const f = ddFiles[i];
  const fullPath = path.join(dataDir, f);
  const txt = fs.readFileSync(fullPath, 'utf8');
  const dm = txt.match(/productId:\s*['"]([\w-]+)['"][\s\S]*?primaryLayer:\s*['"]([^'"]+)['"]/);
  if (dm) {
    const p = paperProducts.find(x => x.id === dm[1]);
    if (p && (p.layer === '?' || !p.layer)) p.layer = dm[2].split(' / ')[0];
  }
}

const LAYER_NAMES = {
  E: '执行环境与沙箱',
  T: '任务分解与分配',
  C: '通信与协作',
  L: '学习与记忆',
  O: '编排与调度',
  V: '验证与评测',
  G: '治理与安全',
};
const LAYER_COLORS = {
  E: '#0ea5e9',
  T: '#10b981',
  C: '#f59e0b',
  L: '#a855f7',
  O: '#ec4899',
  V: '#ef4444',
  G: '#6366f1',
};

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function genCard(p) {
  const layerName = LAYER_NAMES[p.layer] || '论文附录项目';
  const layerColor = LAYER_COLORS[p.layer] || '#94a3b8';
  const isJs = /openagents|busy|claude-mem|planning-with-files|claude-code|aider|continue|mavis|gemini-cli|qwen-code|oh-my-pi|pi|archon|devika|scion|devon|cua|open-claude-cowork|docker-agent|deepagentsjs/.test(p.id);
  const lang = isJs ? 'TypeScript' : 'Go';
  const langColor = isJs ? '#3178c6' : '#00ADD8';
  // 截断 oneLiner
  const oneLiner = p.oneLiner.replace(/\s*\(.*$/, '').trim();
  const oneLinerShort = oneLiner.length > 100 ? oneLiner.slice(0, 100) + '...' : oneLiner;

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" width="1000" height="500">',
    '<defs>',
    '<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">',
    '<stop offset="0%" stop-color="#f5f0e6"/>',
    '<stop offset="100%" stop-color="#ebe5d8"/>',
    '</linearGradient>',
    '</defs>',
    '<rect width="800" height="450" fill="url(#bg)"/>',
    '<rect x="0" y="0" width="800" height="56" fill="#1a1a1a"/>',
    '<text x="40" y="36" font-family="-apple-system, sans-serif" font-size="18" fill="#ffffff" font-weight="600">github.com/<tspan fill="#7dd3fc">' + escapeXml(p.id) + '</tspan></text>',
    '<text x="960" y="36" font-family="-apple-system, sans-serif" font-size="13" fill="#888" text-anchor="end">Public</text>',
    '<rect x="40" y="78" width="200" height="28" rx="14" fill="' + layerColor + '" opacity="0.15"/>',
    '<rect x="40" y="78" width="200" height="28" rx="14" fill="none" stroke="' + layerColor + '" stroke-width="1.5"/>',
    '<text x="140" y="97" font-family="-apple-system, sans-serif" font-size="13" fill="' + layerColor + '" font-weight="700" text-anchor="middle">Layer ' + escapeXml(p.layer) + ' · ' + escapeXml(layerName) + '</text>',
    '<rect x="250" y="78" width="84" height="28" rx="14" fill="#1e40af" opacity="0.12"/>',
    '<rect x="250" y="78" width="84" height="28" rx="14" fill="none" stroke="#1e40af" stroke-width="1.5"/>',
    '<text x="292" y="97" font-family="-apple-system, sans-serif" font-size="12" fill="#1e40af" font-weight="600" text-anchor="middle">论文附录</text>',
    '<text x="40" y="148" font-family="-apple-system, sans-serif" font-size="32" fill="#1a1a1a" font-weight="700">' + escapeXml(p.name) + '</text>',
    '<foreignObject x="40" y="170" width="720" height="60">',
    '<div xmlns="http://www.w3.org/1999/xhtml" style="font-family:-apple-system,sans-serif;font-size:14px;color:#444;line-height:1.55">' + escapeXml(oneLinerShort) + '</div>',
    '</foreignObject>',
    '<line x1="40" y1="260" x2="960" y2="260" stroke="#d4ccbf" stroke-width="1"/>',
    '<g transform="translate(40, 340)">',
    '<g>',
    '<path d="M0 6 L2 11 L7 12 L3 16 L4 21 L0 18 L-4 21 L-3 16 L-7 12 L-2 11 Z" fill="#f59e0b" transform="translate(0, -6) scale(0.9)"/>',
    '<text x="22" y="10" font-family="-apple-system, sans-serif" font-size="16" fill="#1a1a1a" font-weight="600">' + escapeXml(p.stars) + '</text>',
    '<text x="22" y="28" font-family="-apple-system, sans-serif" font-size="11" fill="#888">stars (2026-05-08)</text>',
    '</g>',
    '<g transform="translate(180, 0)">',
    '<circle cx="0" cy="0" r="6" fill="' + langColor + '"/>',
    '<text x="14" y="5" font-family="-apple-system, sans-serif" font-size="14" fill="#1a1a1a" font-weight="500">' + lang + '</text>',
    '<text x="0" y="28" font-family="-apple-system, sans-serif" font-size="11" fill="#888">primary lang</text>',
    '</g>',
    '<g transform="translate(360, 0)">',
    '<rect x="-2" y="-6" width="12" height="12" rx="6" fill="#10b981"/>',
    '<text x="18" y="4" font-family="-apple-system, sans-serif" font-size="14" fill="#1a1a1a" font-weight="500">OSS</text>',
    '<text x="0" y="28" font-family="-apple-system, sans-serif" font-size="11" fill="#888">deployment</text>',
    '</g>',
    '<g transform="translate(660, 0)">',
    '<text x="0" y="4" font-family="-apple-system, sans-serif" font-size="14" fill="#1a1a1a" font-weight="500">~ partial</text>',
    '<text x="0" y="28" font-family="-apple-system, sans-serif" font-size="11" fill="#888">本台评估</text>',
    '</g>',
    '</g>',
    '<rect x="0" y="470" width="1000" height="30" fill="#1a1a1a" opacity="0.85"/>',
    '<text x="40" y="440" font-family="-apple-system, sans-serif" font-size="11" fill="#cccccc">Source: Agent Harness Engineering 论文 Appendix Table S1 (2026-05-08 快照) · 本台基于论文定位 + GitHub 元数据入档</text>',
    '<text x="960" y="487" font-family="-apple-system, sans-serif" font-size="11" fill="#7dd3fc" text-anchor="end">Layer-aware card · 2026-08-13</text>',
    '</svg>'
  ].join('\n');
}

let count = 0;
for (let i = 0; i < paperProducts.length; i++) {
  const p = paperProducts[i];
  const dir = path.join(ROOT, 'assets', 'shots', 'paper', p.id);
  fs.mkdirSync(dir, { recursive: true });
  const out = path.join(dir, '01-readme-hero.svg');
  fs.writeFileSync(out, genCard(p), 'utf8');
  count++;
}

console.log('✅ Generated ' + count + ' paper cards in assets/shots/paper/');

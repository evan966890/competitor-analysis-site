// Arrakis 深度评测（v3 骨架入库 · 2026-08-10）
// 来源：Agent Harness Engineering 论文 Appendix Table S1（2026-05-08 快照）
// 标注：骨架入库 — 仅含 meta + score + 简介；完整 deep-dive（demo×6 / code×3 / philosophy / timeline / conclusion）留给深度阶段
window.TD_ARRAKIS_DEEPDIVE = {
  productId: 'arrakis',
  productName: 'Arrakis',
  tagline: 'sandbox + microVM + snapshots',
  dateAdded: '2026-08-10',
  isRealScreenshot: false,
  source: 'Agent Harness Engineering: A Survey (Junjie Li et al., CMU/UAB 2026) · Appendix Table S1 (2026-05-08 快照) · https://github.com/arrakis-cloud/arrakis · 808 stars',
  author: '本台研究团队（基于论文附录骨架 + GitHub 元数据）',
  primaryLayer: 'E',
  deployment: 'self-host',

  // ============ ① DEMO（占位，深度阶段补）============
  demoShots: [
    {
      id: 'placeholder',
      caption: 'Arrakis 主页（占位，深度阶段补实拍）',
      img: 'assets/shots/placeholder.jpg',
      note: '本图为骨架占位。深度阶段将通过 社区/云端 补全 6-9 张实拍。',
    }
  ],

  // ============ ② CODE（占位，深度阶段补）============
  codeSnippets: [
    {
      title: 'Arrakis 核心抽象（占位）',
      file: 'arrakis/...（深度阶段补）',
      code: '// 论文附录骨架入库 — 完整 code snippet 留给深度阶段',
      points: ['论文定位：Execution Substrates & Sandboxing', '本台收录：v3 骨架入库（808）', '完整 deep-dive 留给深度阶段']
    }
  ],

  // ============ ③ PHILOSOPHY（基于论文定位的简要）============
  philosophy: {
    coreQuestion: 'Arrakis 在 Execution Substrates & Sandboxing 的核心定位是什么？',
    answer: '**Arrakis** ——sandbox + microVM + snapshots。**808 stars**（2026-05-08 快照）。**论文分类**：E 层（Execution Substrates & Sandboxing）。**部署形态**：self-host。',
    problemDiagnosis: [
      '**论文定位**：sandbox + microVM + snapshots',
      '**对 MiCo 价值**：作为 Execution Substrates & Sandboxing 的代表项目，对标 MiCo 的 沙箱/部署 维度。'
    ],
    designPrinciples: ['**sandbox + microVM + snapshots**'],
    differentiationMatrix: [
      { vs: 'MiCo', diff: '**Arrakis** 是 Execution Substrates & Sandboxing 代表项目（808）。MiCo 在该层的差异点需深度阶段补。' }
    ],
  },

  // ============ 时间线（基于公开信息）============
  timeline: [
    { date: '2026-05-08', event: '本台骨架入库（论文附录 Table S1 808 快照）' },
  ],

  // ============ 评测结论 ============
  conclusion: {
    summary: '**Arrakis** 是论文 Execution Substrates & Sandboxing 的 808 项目。骨架入库——完整 deep-dive（含实拍截图 + 源码 + 评分）留待深度阶段。',
    forMico: [
      '**Arrakis** 作为 E 层代表——深度阶段补完整评测。',
      '**论文定位**：sandbox + microVM + snapshots（808）',
      '**骨架入库时间**：2026-08-10（与本台 v3 全面重构同步）'
    ],
  },
};

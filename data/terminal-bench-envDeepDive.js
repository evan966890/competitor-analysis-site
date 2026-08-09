// terminal-bench-env 深度评测（v3 骨架入库 · 2026-08-10）
// 来源：Agent Harness Engineering 论文 Appendix Table S1（2026-05-08 快照）
// 标注：骨架入库 — 仅含 meta + score + 简介；完整 deep-dive（demo×6 / code×3 / philosophy / timeline / conclusion）留给深度阶段
window.TD_TERMINAL_BENCH_ENV_DEEPDIVE = {
  productId: 'terminal-bench-env',
  productName: 'terminal-bench-env',
  tagline: 'terminal benchmark environment',
  dateAdded: '2026-08-10',
  isRealScreenshot: false,
  source: 'Agent Harness Engineering: A Survey (Junjie Li et al., CMU/UAB 2026) · Appendix Table S1 (2026-05-08 快照) · https://github.com/Terminal-Bench/terminal-bench-env · 80 stars',
  author: '本台研究团队（基于论文附录骨架 + GitHub 元数据）',
  primaryLayer: 'E',
  deployment: 'self-host',

  // ============ ① DEMO（占位，深度阶段补）============
  demoShots: [
    {
      id: 'placeholder',
      caption: 'terminal-bench-env 主页（占位，深度阶段补实拍）',
      img: 'assets/shots/placeholder.jpg',
      note: '本图为骨架占位。深度阶段将通过 社区/云端 补全 6-9 张实拍。',
    }
  ],

  // ============ ② CODE（占位，深度阶段补）============
  codeSnippets: [
    {
      title: 'terminal-bench-env 核心抽象（占位）',
      file: 'terminal-bench-env/...（深度阶段补）',
      code: '// 论文附录骨架入库 — 完整 code snippet 留给深度阶段',
      points: ['论文定位：Execution Substrates & Sandboxing', '本台收录：v3 骨架入库（80）', '完整 deep-dive 留给深度阶段']
    }
  ],

  // ============ ③ PHILOSOPHY（基于论文定位的简要）============
  philosophy: {
    coreQuestion: 'terminal-bench-env 在 Execution Substrates & Sandboxing 的核心定位是什么？',
    answer: '**terminal-bench-env** ——terminal benchmark environment。**80 stars**（2026-05-08 快照）。**论文分类**：E 层（Execution Substrates & Sandboxing）。**部署形态**：self-host。',
    problemDiagnosis: [
      '**论文定位**：terminal benchmark environment',
      '**对 MiCo 价值**：作为 Execution Substrates & Sandboxing 的代表项目，对标 MiCo 的 沙箱/部署 维度。'
    ],
    designPrinciples: ['**terminal benchmark environment**'],
    differentiationMatrix: [
      { vs: 'MiCo', diff: '**terminal-bench-env** 是 Execution Substrates & Sandboxing 代表项目（80）。MiCo 在该层的差异点需深度阶段补。' }
    ],
  },

  // ============ 时间线（基于公开信息）============
  timeline: [
    { date: '2026-05-08', event: '本台骨架入库（论文附录 Table S1 80 快照）' },
  ],

  // ============ 评测结论 ============
  conclusion: {
    summary: '**terminal-bench-env** 是论文 Execution Substrates & Sandboxing 的 80 项目。骨架入库——完整 deep-dive（含实拍截图 + 源码 + 评分）留待深度阶段。',
    forMico: [
      '**terminal-bench-env** 作为 E 层代表——深度阶段补完整评测。',
      '**论文定位**：terminal benchmark environment（80）',
      '**骨架入库时间**：2026-08-10（与本台 v3 全面重构同步）'
    ],
  },
};

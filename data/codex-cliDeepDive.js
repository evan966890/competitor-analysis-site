// Codex CLI 深度评测（v3 骨架入库 · 2026-08-10）
// 来源：Agent Harness Engineering 论文 Appendix Table S1（2026-05-08 快照）
// 标注：骨架入库 — 仅含 meta + score + 简介；完整 deep-dive（demo×6 / code×3 / philosophy / timeline / conclusion）留给深度阶段
window.TD_CODEX_CLI_DEEPDIVE = {
  productId: 'codex-cli',
  productName: 'Codex CLI',
  tagline: 'OpenAI terminal coding agent + local execution',
  dateAdded: '2026-08-10',
  isRealScreenshot: false,
  source: 'Agent Harness Engineering: A Survey (Junjie Li et al., CMU/UAB 2026) · Appendix Table S1 (2026-05-08 快照) · https://github.com/openai/codex · 80.4k stars',
  author: '本台研究团队（基于论文附录骨架 + GitHub 元数据）',
  primaryLayer: 'L',
  deployment: 'proprietary',

  // ============ ① DEMO（占位，深度阶段补）============
  demoShots: [
    {
      id: 'placeholder',
      caption: 'Codex CLI 主页（占位，深度阶段补实拍）',
      img: 'assets/shots/placeholder.jpg',
      note: '本图为骨架占位。深度阶段将通过 google 账号 / chrome 登录 补全 6-9 张实拍。',
    }
  ],

  // ============ ② CODE（占位，深度阶段补）============
  codeSnippets: [
    {
      title: 'Codex CLI 核心抽象（占位）',
      file: 'codex-cli/...（深度阶段补）',
      code: '// 论文附录骨架入库 — 完整 code snippet 留给深度阶段',
      points: ['论文定位：Harness Architecture & Orchestration', '本台收录：v3 骨架入库（80.4k）', '完整 deep-dive 留给深度阶段']
    }
  ],

  // ============ ③ PHILOSOPHY（基于论文定位的简要）============
  philosophy: {
    coreQuestion: 'Codex CLI 在 Harness Architecture & Orchestration 的核心定位是什么？',
    answer: '**Codex CLI** ——OpenAI terminal coding agent + local execution。**80.4k stars**（2026-05-08 快照）。**论文分类**：L 层（Harness Architecture & Orchestration）。**部署形态**：proprietary。',
    problemDiagnosis: [
      '**论文定位**：OpenAI terminal coding agent + local execution',
      '**对 MiCo 价值**：作为 Harness Architecture & Orchestration 的代表项目，对标 MiCo 的 编制化/编排 维度。'
    ],
    designPrinciples: ['**OpenAI terminal coding agent + local execution**'],
    differentiationMatrix: [
      { vs: 'MiCo', diff: '**Codex CLI** 是 Harness Architecture & Orchestration 代表项目（80.4k）。MiCo 在该层的差异点需深度阶段补。' }
    ],
  },

  // ============ 时间线（基于公开信息）============
  timeline: [
    { date: '2026-05-08', event: '本台骨架入库（论文附录 Table S1 80.4k 快照）' },
  ],

  // ============ 评测结论 ============
  conclusion: {
    summary: '**Codex CLI** 是论文 Harness Architecture & Orchestration 的 80.4k 项目。骨架入库——完整 deep-dive（含实拍截图 + 源码 + 评分）留待深度阶段。',
    forMico: [
      '**Codex CLI** 作为 L 层代表——深度阶段补完整评测。',
      '**论文定位**：OpenAI terminal coding agent + local execution（80.4k）',
      '**骨架入库时间**：2026-08-10（与本台 v3 全面重构同步）'
    ],
  },
};

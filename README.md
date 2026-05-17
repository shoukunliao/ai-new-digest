# AI News Digest

[![npm version](https://img.shields.io/npm/v/ai-new-digest)](https://www.npmjs.com/package/ai-new-digest)
[![License](https://img.shields.io/npm/l/ai-new-digest)](LICENSE)

聚合 TechCrunch、The Verge、Hacker News 等 RSS 源的 AI 资讯，自动生成 Markdown 日报。

```bash
npx ai-new-digest
# ✅ 日报已生成 → output/ai-news-2026-05-17.md
```

## 安装

### npx（推荐，无需安装）

```bash
npx ai-new-digest
```

### 全局安装

```bash
npm install -g ai-new-digest
ai-new-digest
```

### 本地安装

```bash
npm install ai-new-digest
npx ai-new-digest
```

## 用法

```bash
# 抓取最近 1 天的 AI 新闻（默认）
npx ai-new-digest

# 抓取最近 3 天
npx ai-new-digest --days=3

# 在开发模式下运行（无需构建）
npm start

# 或
npx tsx src/index.ts --days=3
```

## 数据源

| 源 | RSS 地址 |
|---|---|
| [TechCrunch AI](https://techcrunch.com/category/artificial-intelligence/) | `https://techcrunch.com/category/artificial-intelligence/feed/` |
| [The Verge AI](https://www.theverge.com/ai-artificial-intelligence) | `https://www.theverge.com/rss/ai-artificial-intelligence/index.xml` |
| [Hacker News](https://hnrss.org/) | `https://hnrss.org/newest?q=AI&count=30` |

## 输出

日报生成在 `output/` 目录，文件名格式 `ai-news-YYYY-MM-DD.md`。

每期日报包含：

- **统计摘要** — 收录篇数、来源数量
- **文章列表** — 每篇的标题（可点击）、来源、发布时间、摘要（前 100 字）
- **按时间倒序排列**

### 示例

```markdown
# AI 新闻日报 — 2026-05-17

共收录 **42** 篇文章 · 来源 **3** 个源 (TechCrunch AI, The Verge AI, Hacker News)
时间范围: 最近 1 天

---

### [Article Title](https://example.com)
**来源**: TechCrunch AI · **时间**: 2026-05-17 09:30

> This is a summary of the article content, truncated to 100 characters…

---
```

## 开发

```bash
# 克隆仓库
git clone https://github.com/shoukunliao/ai-new-digest.git
cd ai-new-digest

# 安装依赖
npm install

# 开发运行
npx tsx src/index.ts --days=3

# 构建
npm run build

# 发布前检查（自动构建）
npm run prepublishOnly
```

### 项目结构

```
src/
├── index.ts    # 入口：CLI 参数解析、流程编排、Markdown 生成
├── fetcher.ts  # RSS 抓取与数据归一化（HTML 剥离、摘要提取）
├── filter.ts   # 时间窗口过滤
└── types.ts    # 类型定义（Article, FeedSource）
output/         # 日报输出目录
```

### 技术栈

- **运行时** — Node.js + TypeScript（tsx 直接执行，无需预构建）
- **构建** — TypeScript 编译器（tsc）
- **RSS 解析** — [rss-parser](https://github.com/rbren/rss-parser)

## License

MIT © [shoukunliao](https://github.com/shoukunliao)

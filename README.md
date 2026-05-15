# AI News Digest 📰

一个命令行 AI 新闻聚合工具，从多个 RSS 源抓取最新 AI 资讯，自动生成 Markdown 日报。

## 数据源

| 源 | 说明 |
|---|---|
| TechCrunch AI | TechCrunch 人工智能专栏 |
| The Verge AI | The Verge AI/Artificial Intelligence 频道 |
| Hacker News | HN 最新帖中含 AI 关键词的前 30 条 |

## 快速开始

```bash
# 安装依赖
npm install

# 抓取最近 24 小时的 AI 新闻
npm start

# 抓取最近 N 天
npx tsx src/index.ts --days=3
```

## 输出

日报生成在 `output/` 目录，文件名格式 `ai-news-YYYY-MM-DD.md`，包含：

- 统计摘要（收录篇数、来源数量）
- 每篇文章的标题、链接、来源、发布时间、摘要（前 100 字）
- 按时间倒序排列

## 技术栈

- TypeScript + tsx 运行时
- rss-parser 解析 RSS/Atom

## 项目结构

```
src/
├── index.ts    # 入口：CLI 解析、流程编排、Markdown 生成
├── fetcher.ts  # RSS 抓取与数据归一化
├── filter.ts   # 时间窗口过滤
└── types.ts    # 类型定义
output/         # 日报输出目录
```

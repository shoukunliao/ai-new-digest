# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Run in development** (with tsx, no build needed): `npm start` or `npx tsx src/index.ts --days=3`
- **Build** (compile to dist/): `npm run build`
- **Build before publish**: `npm run prepublishOnly` (auto-runs build)

## Architecture

A CLI tool that fetches AI-related news from RSS feeds and outputs a Markdown digest to `output/ai-news-YYYY-MM-DD.md`.

### Data flow

```
types.ts (Article, FeedSource)
  → fetcher.ts (RSS parsing via rss-parser, HTML stripping, summary extraction)
    → filter.ts (time-window filtering by pubDate)
      → index.ts (CLI entry, orchestration, Markdown rendering)
```

### Key details

- **Entry point**: `src/index.ts` — has a shebang, parses `--days=N` from CLI args (default 1), fetches all feeds concurrently with `Promise.allSettled`, filters by time window, generates Markdown, writes to `output/`.
- **RSS feeds** are hardcoded as a `FEEDS` array in `index.ts`: TechCrunch AI, The Verge AI, Hacker News (via hnrss.org with `?q=AI&count=30`).
- **Build output**: `tsc` compiles `src/` → `dist/`, using `NodeNext` module resolution targeting ES2022.
- The npm package exposes a binary `ai-new-digest` so users can run `npx ai-new-digest` directly.

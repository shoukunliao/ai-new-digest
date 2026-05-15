#!/usr/bin/env node
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { fetchFeed } from "./fetcher.js";
import { filterByTime } from "./filter.js";
import type { Article, FeedSource } from "./types.js";

const FEEDS: FeedSource[] = [
  {
    name: "TechCrunch AI",
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
  },
  {
    name: "The Verge AI",
    url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
  },
  {
    name: "Hacker News",
    url: "https://hnrss.org/newest?q=AI&count=30",
  },
];

function parseArgs(): { days: number } {
  const daysArg = process.argv.find((a) => a.startsWith("--days="));
  const days = daysArg ? parseInt(daysArg.split("=")[1], 10) : 1;
  return { days: isNaN(days) || days < 1 ? 1 : days };
}

function formatDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function generateMarkdown(articles: Article[], days: number): string {
  const dateStr = new Date().toISOString().slice(0, 10);
  const sources = [...new Set(articles.map((a) => a.source))];

  let md = `# AI 新闻日报 — ${dateStr}\n\n`;
  md += `共收录 **${articles.length}** 篇文章 · 来源 **${sources.length}** 个源 (${sources.join(", ")})\n`;
  md += `时间范围: 最近 ${days} 天\n\n---\n\n`;

  for (const a of articles) {
    md += `### [${a.title}](${a.link})\n`;
    md += `**来源**: ${a.source} · **时间**: ${formatDate(a.pubDate)}\n\n`;
    if (a.summary) {
      md += `> ${a.summary}\n\n`;
    }
    md += `---\n\n`;
  }

  return md;
}

async function main() {
  const { days } = parseArgs();
  console.log(`🔍 正在抓取 ${FEEDS.length} 个源的文章...\n`);

  const results = await Promise.allSettled(FEEDS.map(fetchFeed));

  let allArticles: Article[] = [];
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (r.status === "fulfilled") {
      console.log(`  ✓ ${FEEDS[i].name}: ${r.value.length} 篇`);
      allArticles.push(...r.value);
    } else {
      console.error(`  ✗ ${FEEDS[i].name}: ${r.reason}`);
    }
  }

  const filtered = filterByTime(allArticles, days);
  filtered.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  const dateStr = new Date().toISOString().slice(0, 10);
  const filename = `ai-news-${dateStr}.md`;
  const outputDir = join(process.cwd(), "output");
  const outputPath = join(outputDir, filename);

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, generateMarkdown(filtered, days), "utf-8");

  console.log(`\n✅ 日报已生成 → output/${filename}`);
  console.log(`   共 ${filtered.length} 篇文章，来自 ${[...new Set(filtered.map((a) => a.source))].length} 个源`);
}

main().catch((err) => {
  console.error("❌ 执行失败:", err);
  process.exit(1);
});

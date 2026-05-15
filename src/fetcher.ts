import RssParser from "rss-parser";
import type { Article, FeedSource } from "./types.js";

const parser = new RssParser();

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function cleanHnContent(text: string): string {
  const pointsMatch = text.match(/Points:\s*\d+/);
  const commentsMatch = text.match(/# Comments:\s*\d+/);
  if (pointsMatch || commentsMatch) {
    return [pointsMatch?.[0], commentsMatch?.[0]].filter(Boolean).join(" · ");
  }
  return text;
}

function extractSummary(text: string | undefined, maxLen = 100): string {
  if (!text) return "";
  let cleaned = stripHtml(text).replace(/\s+/g, " ").trim();
  if (/^(Article URL|Comments URL):/.test(cleaned)) {
    cleaned = cleanHnContent(cleaned);
  }
  return cleaned.length > maxLen ? cleaned.slice(0, maxLen) + "…" : cleaned;
}

export async function fetchFeed(source: FeedSource): Promise<Article[]> {
  const feed = await parser.parseURL(source.url);

  return feed.items.map((item) => ({
    title: item.title?.trim() ?? "(无标题)",
    link: item.link ?? "",
    pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
    source: source.name,
    summary: extractSummary(
      item.contentSnippet ?? item.content ?? item.summary
    ),
  }));
}

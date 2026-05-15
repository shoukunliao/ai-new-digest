import type { Article } from "./types.js";

export function filterByTime(articles: Article[], days: number): Article[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  return articles.filter((a) => a.pubDate >= cutoff);
}

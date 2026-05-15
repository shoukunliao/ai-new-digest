export interface Article {
  title: string;
  link: string;
  pubDate: Date;
  source: string;
  summary: string;
}

export interface FeedSource {
  name: string;
  url: string;
}

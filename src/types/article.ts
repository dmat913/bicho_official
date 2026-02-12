import { StaticImageData } from "next/image";

export type ArticleCategory = "match" | "news" | "event" | "column";

export interface ArticleMeta {
  id: string;
  title: string;
  description: string;
  date: string;
  category: ArticleCategory;
  thumbnail?: string | StaticImageData;
  tags?: string[];
}

export interface ArticleContent extends ArticleMeta {
  component: React.ComponentType;
}

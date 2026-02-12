import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Article1 from "@/data/article/Article1";
import Article2 from "@/data/article/Article2";
import Article3 from "@/data/article/Article3";
import Article4 from "@/data/article/Article4";
import { generateSEO } from "@/utils/seo";
import { Metadata } from "next";

type Props = {
  searchParams: { no?: string };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const articleNo = searchParams.no;

  const articles: { [key: string]: { title: string; description: string } } = {
    "1": {
      title: "2024年度シーズン総括",
      description:
        "FC.BICHOの2024年度シーズンを振り返り、主な成績、印象的な試合、チームの成長についてまとめます。",
    },
    "2": {
      title: "チーム創設20周年記念",
      description:
        "FC.BICHO創設20周年を迎え、チームの歴史、これまでの軌跡、記念イベントについてご紹介します。",
    },
    "3": {
      title: "新加入選手紹介",
      description:
        "FC.BICHOに新しく加わった選手たちの紹介。経歴、ポジション、意気込みをお伝えします。",
    },
    "4": {
      title: "練習環境の改善",
      description:
        "FC.BICHOの練習環境の改善、新しい取り組み、トレーニング方法についてご紹介します。",
    },
  };

  const article = articleNo && articles[articleNo] ? articles[articleNo] : null;

  if (article) {
    return generateSEO({
      title: article.title,
      description: article.description,
      path: `/article?no=${articleNo}`,
      keywords: ["ニュース", "記事", "最新情報", "お知らせ"],
      type: "article",
    });
  }

  return generateSEO({
    title: "記事・ニュース",
    description: "FC.BICHOの最新ニュース、お知らせ、記事をご覧いただけます。",
    path: "/article",
    keywords: ["ニュース", "記事", "最新情報", "お知らせ"],
  });
}

export default function NewsPage({ searchParams }: Props) {
  const articleNo = searchParams.no;

  return (
    <div className="w-full">
      <Header />
      <div className="pt-20">
        {articleNo === "1" && <Article1 />}
        {articleNo === "2" && <Article2 />}
        {articleNo === "3" && <Article3 />}
        {articleNo === "4" && <Article4 />}
      </div>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "チームデータ・統計",
  description:
    "FC.BICHOのチームデータと統計情報を視覚的に表示。年齢構成、活動率、得点ランキング、アシストランキングなどのチーム分析データをグラフで確認できます。",
  keywords: [
    "FC.Bicho",
    "データ",
    "統計",
    "チーム分析",
    "年齢構成",
    "活動率",
    "得点ランキング",
    "アシスト",
    "サッカー統計",
    "川口市",
    "社会人サッカー",
  ],
  openGraph: {
    title: "チームデータ・統計 | FC.Bicho Official Site",
    description:
      "FC.BICHOのチームデータと統計情報を視覚的に表示。年齢構成、活動率、得点・アシストランキングなどを確認できます。",
    url: "https://bicho-official.vercel.app/data",
  },
  twitter: {
    title: "チームデータ・統計 | FC.Bicho Official Site",
    description: "FC.BICHOのチームデータと統計情報を視覚的に表示。",
  },
  alternates: {
    canonical: "https://bicho-official.vercel.app/data",
  },
};

export default function DataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

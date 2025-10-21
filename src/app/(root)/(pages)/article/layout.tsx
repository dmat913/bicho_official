import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "記事・ニュース",
  description:
    "FC.BICHOに関する最新のニュースや記事をご覧いただけます。試合レポート、チーム情報、イベント情報などを随時更新中。",
  keywords: [
    "FC.Bicho",
    "記事",
    "ニュース",
    "試合レポート",
    "サッカーニュース",
    "チーム情報",
    "川口市",
    "社会人サッカー",
    "埼玉県",
  ],
  openGraph: {
    title: "記事・ニュース | FC.Bicho Official Site",
    description:
      "FC.BICHOに関する最新のニュースや記事をご覧いただけます。試合レポート、チーム情報、イベント情報などを随時更新中。",
    url: "https://bicho-official.vercel.app/article",
  },
  twitter: {
    title: "記事・ニュース | FC.Bicho Official Site",
    description: "FC.BICHOに関する最新のニュースや記事をご覧いただけます。",
  },
  alternates: {
    canonical: "https://bicho-official.vercel.app/article",
  },
};

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

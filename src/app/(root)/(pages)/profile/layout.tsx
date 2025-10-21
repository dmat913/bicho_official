import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "選手プロフィール",
  description:
    "FC.BICHOの全選手のプロフィール情報をご紹介。ゴールキーパー、ディフェンダー、ミッドフィルダー、フォワードの各ポジション別に選手情報を掲載。",
  keywords: [
    "FC.Bicho",
    "選手",
    "プロフィール",
    "メンバー",
    "ゴールキーパー",
    "ディフェンダー",
    "ミッドフィルダー",
    "フォワード",
    "社会人サッカー",
    "川口市",
    "埼玉県",
  ],
  openGraph: {
    title: "選手プロフィール | FC.Bicho Official Site",
    description:
      "FC.BICHOの全選手のプロフィール情報をご紹介。各ポジション別に選手情報を掲載しています。",
    url: "https://bicho-official.vercel.app/profile",
  },
  twitter: {
    title: "選手プロフィール | FC.Bicho Official Site",
    description: "FC.BICHOの全選手のプロフィール情報をご紹介。",
  },
  alternates: {
    canonical: "https://bicho-official.vercel.app/profile",
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "試合日程・結果",
  description:
    "FC.BICHOの最新の試合スケジュールと結果一覧。埼玉県社会人サッカーリーグの試合日程、会場情報、試合結果、得点者情報を随時更新。",
  keywords: [
    "FC.Bicho",
    "試合日程",
    "試合結果",
    "スケジュール",
    "埼玉県社会人サッカーリーグ",
    "会場",
    "得点者",
    "キックオフ",
    "川口市",
    "社会人サッカー",
  ],
  openGraph: {
    title: "試合日程・結果 | FC.Bicho Official Site",
    description:
      "FC.BICHOの最新の試合スケジュールと結果一覧。試合日程、会場情報、試合結果を随時更新しています。",
    url: "https://bicho-official.vercel.app/schedule",
  },
  twitter: {
    title: "試合日程・結果 | FC.Bicho Official Site",
    description: "FC.BICHOの最新の試合スケジュールと結果一覧。",
  },
  alternates: {
    canonical: "https://bicho-official.vercel.app/schedule",
  },
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

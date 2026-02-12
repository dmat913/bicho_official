import { getSchedules } from "@/lib/server-actions";
import ScheduleClient from "./ScheduleClient";
import { generateSEO, generateStructuredData } from "@/utils/seo";

export const metadata = generateSEO({
  title: "試合日程・結果",
  description:
    "FC.BICHOの試合日程、試合結果、対戦相手、会場情報、得点者などの詳細情報をご覧いただけます。埼玉県社会人サッカーリーグの最新スケジュールを掲載。",
  path: "/schedule",
  keywords: [
    "試合日程",
    "試合結果",
    "対戦カード",
    "スケジュール",
    "得点者",
    "会場情報",
    "埼玉県社会人サッカーリーグ",
  ],
});

// サーバーコンポーネントでデータを取得
export default async function SchedulePage() {
  const schedules = await getSchedules();

  // 構造化データを生成
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FC.BICHO 試合スケジュール",
    description: "FC.BICHOの試合日程と結果の一覧",
    itemListElement: schedules.slice(0, 10).map((schedule, index) => ({
      "@type": "SportsEvent",
      position: index + 1,
      name: `${schedule.title} - FC.BICHO vs ${schedule.teamName}`,
      startDate: schedule.date,
      location: {
        "@type": "Place",
        name: schedule.location,
      },
      homeTeam: {
        "@type": "SportsTeam",
        name: "FC.BICHO",
      },
      awayTeam: {
        "@type": "SportsTeam",
        name: schedule.teamName,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ScheduleClient schedules={schedules} />
    </>
  );
}

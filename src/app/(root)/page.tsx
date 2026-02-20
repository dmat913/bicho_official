import { getImages, getSchedules } from "@/lib/server-actions";
import HomeClient from "./HomeClient";
import { generateSEO } from "@/utils/seo";

// ISR: 5分ごとに再生成（バックグラウンドで自動更新）
export const revalidate = 300;

export const metadata = generateSEO({
  title: "FC.BICHO Official Site - 川口市の社会人サッカーチーム",
  description:
    "FC.BICHOは、2005年に創設され、川口市を拠点に活動している社会人サッカーチームです。埼玉県社会人サッカーリーグ3部所属。試合日程、リーグ順位表、選手紹介、チーム写真、最新ニュースを掲載。",
  path: "/",
  keywords: [
    "試合日程",
    "リーグ順位表",
    "選手紹介",
    "写真ギャラリー",
    "チームニュース",
    "埼玉県2部",
    "フットボール",
    "地域スポーツ",
  ],
});

// サーバーコンポーネントでデータを取得
export default async function HomePage() {
  // サーバーサイドでデータを並列取得
  const [images, schedules] = await Promise.all([
    getImages(10),
    getSchedules(),
  ]);

  return <HomeClient initialImages={images} initialSchedules={schedules} />;
}

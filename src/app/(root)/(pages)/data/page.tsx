import { generateSEO, generateStructuredData } from "@/utils/seo";
import DataClient from "./DataClient";

export const metadata = generateSEO({
  title: "チームデータ・統計",
  description:
    "FC.BICHOのチームデータを分析。得点ランキング、アシストランキング、年齢分布、活動内容などの詳細な統計情報をグラフで可視化。チームの傾向と選手のパフォーマンスを確認できます。",
  path: "/data",
  keywords: [
    "チームデータ",
    "統計",
    "分析",
    "得点ランキング",
    "アシストランキング",
    "年齢分布",
    "グラフ",
    "パフォーマンス",
  ],
});

export default function DataPage() {
  const structuredData = generateStructuredData({
    type: "team-data",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DataClient />
    </>
  );
}

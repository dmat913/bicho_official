"use client";

import {
  ArticleH2,
  ArticleP,
  ArticleSection,
} from "@/features/article/components/ArticleParts";

type MatchResultProps = {
  round: string;
  date: string;
  opponent: string;
  result: string;
  scorers?: string;
  type: "win" | "loss" | "draw";
};

const MatchItem = ({
  round,
  date,
  opponent,
  result,
  scorers,
  type,
}: MatchResultProps) => {
  const bgColor =
    type === "win"
      ? "bg-green-50 border-green-100"
      : type === "loss"
        ? "bg-blue-50 border-blue-100"
        : "bg-gray-50 border-gray-100";
  const resultColor =
    type === "win"
      ? "text-green-600"
      : type === "loss"
        ? "text-blue-600"
        : "text-gray-600";
  const badgeColor =
    type === "win"
      ? "bg-green-500"
      : type === "loss"
        ? "bg-blue-500"
        : "bg-gray-500";

  return (
    <div className={`p-4 rounded-xl border ${bgColor} mb-3`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span
            className={`${badgeColor} text-white-1 px-2 py-0.5 rounded text-xs font-bold`}
          >
            {round}
          </span>
          <span className="text-sm text-neutral-500">{date}</span>
        </div>
        <div className={`font-black text-lg ${resultColor}`}>{result}</div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h3 className="font-bold text-neutral-800">vs {opponent}</h3>
        {scorers && (
          <p className="text-xs text-neutral-600 mt-1 sm:mt-0">⚽️ {scorers}</p>
        )}
      </div>
    </div>
  );
};

export default function Post2() {
  const matches: MatchResultProps[] = [
    {
      round: "1節",
      date: "2024/3/17",
      opponent: "川口SC",
      result: "×0-1",
      type: "loss",
    },
    {
      round: "2節",
      date: "2024/4/7",
      opponent: "S・F・C",
      result: "○3-0",
      scorers: "11 榎本歩夢,18 石川諒×2",
      type: "win",
    },
    {
      round: "3節",
      date: "2024/4/21",
      opponent: "HGC",
      result: "○2-1",
      scorers: "15 谷侑樹,4 賀川優斗",
      type: "win",
    },
    {
      round: "4節",
      date: "2024/9/8",
      opponent: "川口朝日クラブ",
      result: "○1-0",
      scorers: "8 中田湧大",
      type: "win",
    },
    {
      round: "5節",
      date: "2024/9/15",
      opponent: "埼玉パスポットFC",
      result: "○1-0",
      scorers: "18 石川諒",
      type: "win",
    },
    {
      round: "6節",
      date: "2024/10/6",
      opponent: "川口FCセカンド",
      result: "△0-0(雨天中止)",
      type: "draw",
    },
  ];

  return (
    <>
      <ArticleSection>
        <ArticleP>
          2024年度川口市リーグの全日程が終了しました。
          初戦こそ落としましたが、その後は全勝し8勝1敗という成績を収めることができました。
        </ArticleP>
        <ArticleP>
          この結果により、南部ブロック決勝大会への出場権を獲得しました。
          応援ありがとうございました。
        </ArticleP>
      </ArticleSection>

      <ArticleSection>
        <ArticleH2>試合結果詳細</ArticleH2>
        <div className="space-y-2">
          {matches.map((match, index) => (
            <MatchItem key={index} {...match} />
          ))}
        </div>
      </ArticleSection>
    </>
  );
}

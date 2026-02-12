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
  type: "win" | "loss" | "draw" | "pending";
};

const MatchItem = ({
  round,
  date,
  opponent,
  result,
  scorers,
  type,
}: MatchResultProps) => {
  let bgColor, resultColor, badgeColor;

  if (type === "win") {
    bgColor = "bg-green-50 border-green-100";
    resultColor = "text-green-600";
    badgeColor = "bg-green-500";
  } else if (type === "loss") {
    bgColor = "bg-blue-50 border-blue-100";
    resultColor = "text-blue-600";
    badgeColor = "bg-blue-500";
  } else if (type === "draw") {
    bgColor = "bg-gray-50 border-gray-100";
    resultColor = "text-gray-600";
    badgeColor = "bg-gray-500";
  } else {
    // pending
    bgColor = "bg-white border-neutral-100 shadow-sm";
    resultColor = "text-neutral-400";
    badgeColor = "bg-neutral-400";
  }

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

export default function Post4() {
  const matches: MatchResultProps[] = [
    {
      round: "1節",
      date: "2025/3/16",
      opponent: "Area大谷場",
      result: "○3-2",
      scorers: "10 横山博一, 4 賀川優斗, 37 武田康希",
      type: "win",
    },
    {
      round: "2節",
      date: "2025/3/23",
      opponent: "TACKY'S",
      result: "○3-0",
      scorers: "11 榎本歩夢, 18 石川諒, 19 岩瀬輝",
      type: "win",
    },
    {
      round: "3節",
      date: "2025/3/30",
      opponent: "繋信FC",
      result: "○1-0",
      scorers: "19 岩瀬輝",
      type: "win",
    },
    {
      round: "4節",
      date: "2025/4/6",
      opponent: "RIVER NORTE FC",
      result: "○3-1",
      scorers: "18 石川諒×2, 11 榎本歩夢",
      type: "win",
    },
    {
      round: "5節",
      date: "2025/4/27",
      opponent: "与野八王子クラブ",
      result: "△1-1",
      scorers: "11 榎本歩夢",
      type: "draw",
    },
    {
      round: "6節",
      date: "2025/5/4",
      opponent: "GRANDE FC",
      result: "×1-3",
      scorers: "17 山口大貴",
      type: "loss",
    },
    {
      round: "7節",
      date: "2025/5/18",
      opponent: "朝日FC GRAZIE",
      result: "○4-0",
      scorers: "2 石川靖人, 10 横山博一, 25 荒井克弥, 18 石川諒",
      type: "win",
    },
    {
      round: "8節",
      date: "2025/6/15",
      opponent: "与野LIVERTY",
      result: "○3-1",
      scorers: "11 榎本歩夢, 10 横山博一, 7 貫井直",
      type: "win",
    },
    {
      round: "9節",
      date: "2025/6/22",
      opponent: "FCフルゴン",
      result: "○2-0",
      scorers: "11 榎本歩夢, 4 賀川優斗",
      type: "win",
    },
    {
      round: "10節",
      date: "2025/9/28",
      opponent: "川口市役所",
      result: "○2-0",
      scorers: "22 浅子太我, 8 中田湧大",
      type: "win",
    },
    {
      round: "11節",
      date: "2025/10/5",
      opponent: "ほのぼのクラブ",
      result: "×0-2",
      type: "loss",
    },
  ];

  return (
    <>
      <ArticleSection>
        <ArticleP>2025年度埼玉県3部リーグの結果をお知らせします。</ArticleP>
        <ArticleP>
          激戦のリーグ戦を勝ち抜き、見事優勝を果たすことができました。
          これにより、来季からの2部リーグ昇格が決定しました。
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

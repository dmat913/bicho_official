"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { getLeagueData, getLogo } from "@/utils/date";

const LeagueTable = () => {
  const textRef = useRef(null);
  const tableRef = useRef(null);
  const isInView = useInView(textRef, { once: true });
  const tableInView = useInView(tableRef, { once: true });

  // const [selectedYear, setSelectedYear] = useState<string>("2025");

  const LEAGUE_DATA = getLeagueData("2025");

  // const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedYear(e.target.value);
  // };

  return (
    <div
      id="league-table"
      className="relative w-full bg-gradient-to-br from-green-50 to-green-100 overflow-hidden"
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      <div className="absolute top-10 right-10 w-64 h-64 bg-green-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-green-300/15 rounded-full blur-2xl" />

      <div className="relative">
        {/* モダンなタイトルセクション */}
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* スクロールするタイトル */}
          <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-green-700 to-green-600 py-6 shadow-lg">
            <div className="flex whitespace-nowrap">
              <div className="flex animate-marquee">
                {[...Array(15)].map((_, i) => (
                  <span
                    key={i}
                    className="text-green-200 font-display font-black text-4xl lg:text-5xl mx-8 tracking-wider uppercase"
                    style={{ textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
                  >
                    League Standing 2025
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        {/* モダンなリーグテーブル */}
        <motion.div
          ref={tableRef}
          className="bg-white-2 shadow-strong overflow-hidden border border-neutral-200"
          initial={{ opacity: 0, y: 50 }}
          animate={tableInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* テーブル本体 */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="px-2 py-4 text-left text-xs font-bold text-neutral-700 uppercase tracking-wider w-16">
                    順位
                  </th>
                  <th className="px-2 py-4 text-left text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    チーム
                  </th>
                  <th className="px-1 py-4 text-center text-xs font-bold text-neutral-700 uppercase tracking-wider w-12">
                    試合
                  </th>
                  <th className="px-1 py-4 text-center text-xs font-bold text-neutral-700 uppercase tracking-wider w-12">
                    勝点
                  </th>
                  <th className="px-1 py-4 text-center text-xs font-bold text-neutral-700 uppercase tracking-wider w-10">
                    勝
                  </th>
                  <th className="px-1 py-4 text-center text-xs font-bold text-neutral-700 uppercase tracking-wider w-10">
                    分
                  </th>
                  <th className="px-1 py-4 text-center text-xs font-bold text-neutral-700 uppercase tracking-wider w-10">
                    負
                  </th>
                  <th className="px-1 py-4 text-center text-xs font-bold text-neutral-700 uppercase tracking-wider hidden lg:table-cell w-12">
                    得点
                  </th>
                  <th className="px-1 py-4 text-center text-xs font-bold text-neutral-700 uppercase tracking-wider hidden lg:table-cell w-12">
                    失点
                  </th>
                  <th className="px-1 py-4 text-center text-xs font-bold text-neutral-700 uppercase tracking-wider hidden lg:table-cell w-12">
                    差
                  </th>
                </tr>
              </thead>
              <tbody>
                {LEAGUE_DATA.league.map((row, index) => {
                  const isBicho = row.team === "FC.BICHO";
                  const isTop3 = index < 3;

                  // チーム名の短縮処理（スマホ用）
                  const getShortTeamName = (teamName: string) => {
                    if (teamName.length > 10) {
                      return teamName.substring(0, 15) + "...";
                    }
                    return teamName;
                  };

                  return (
                    <motion.tr
                      key={index}
                      className={`
                        border-b border-neutral-100 transition-all duration-300 hover:bg-neutral-50
                        ${
                          isBicho
                            ? "bg-gradient-to-r from-green-500/20 to-green-400/20 hover:from-green-500/30 hover:to-green-400/30"
                            : index % 2 === 0
                              ? "bg-white-2"
                              : "bg-neutral-50/50"
                        }
                      `}
                      initial={{ opacity: 0, x: -20 }}
                      animate={tableInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                    >
                      {/* 順位 */}
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={`
                            w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs
                            ${
                              isTop3
                                ? index === 0
                                  ? "bg-gradient-to-r from-accent-gold to-yellow-400 text-white-2"
                                  : index === 1
                                    ? "bg-gradient-to-r from-neutral-400 to-neutral-500 text-white-2"
                                    : "bg-gradient-to-r from-amber-600 to-amber-700 text-white-2"
                                : isBicho
                                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white-2"
                                  : "bg-neutral-100 text-neutral-600"
                            }
                          `}
                          >
                            {index + 1}
                          </div>
                          {isTop3 && (
                            <span className="text-sm sm:inline">
                              {index === 0 ? "🏆" : index === 1 ? "🥈" : "🥉"}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* チーム名 - モバイル対応で短縮 */}
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-2">
                          {getLogo(row.team) !== "" && (
                            <div className="w-6 h-6 rounded-lg overflow-hidden border border-neutral-200 flex-shrink-0">
                              <Image
                                src={getLogo(row.team)}
                                alt={row.team}
                                width={24}
                                height={24}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            {/* デスクトップ: フル名 */}
                            <span
                              className={`
                              font-semibold text-sm hidden md:block
                              ${isBicho ? "text-green-700" : "text-neutral-700"}
                            `}
                            >
                              {row.team}
                            </span>
                            {/* モバイル: 短縮名 */}
                            <span
                              className={`
                              font-semibold text-xs md:hidden block truncate
                              ${isBicho ? "text-green-700" : "text-neutral-700"}
                            `}
                              title={row.team}
                            >
                              {getShortTeamName(row.team)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* 試合数 */}
                      <td className="px-1 py-3 text-center">
                        <span className="font-semibold text-xs text-neutral-700">
                          {row.game_count}
                        </span>
                      </td>

                      {/* 勝点 - 常に表示 */}
                      <td className="px-1 py-3 text-center">
                        <div
                          className={`
                          inline-flex items-center justify-center w-8 h-6 rounded-lg font-bold text-xs
                          ${
                            isBicho
                              ? "bg-green-500 text-white-2"
                              : "bg-neutral-100 text-neutral-700"
                          }
                        `}
                        >
                          {row.points}
                        </div>
                      </td>

                      {/* 勝/分/負 - タブレット以上で表示 */}
                      <td className="px-1 py-3 text-center text-xs font-medium text-neutral-600">
                        {row.wins}
                      </td>
                      <td className="px-1 py-3 text-center text-xs font-medium text-neutral-600">
                        {row.draws}
                      </td>
                      <td className="px-1 py-3 text-center text-xs font-medium text-neutral-600">
                        {row.losses}
                      </td>

                      {/* 得点/失点/差 - デスクトップのみ */}
                      <td className="px-1 py-3 text-center text-xs font-medium text-neutral-600 hidden lg:table-cell">
                        {row.goalsFor}
                      </td>
                      <td className="px-1 py-3 text-center text-xs font-medium text-neutral-600 hidden lg:table-cell">
                        {row.goalsAgainst}
                      </td>
                      <td className="px-1 py-3 text-center hidden lg:table-cell">
                        <span
                          className={`
                          inline-flex items-center justify-center w-10 h-5 rounded-md text-xs font-bold
                          ${
                            row.goalsFor - row.goalsAgainst > 0
                              ? "bg-green-100 text-green-700"
                              : row.goalsFor - row.goalsAgainst < 0
                                ? "bg-red-100 text-red-700"
                                : "bg-neutral-100 text-neutral-600"
                          }
                        `}
                        >
                          {row.goalsFor - row.goalsAgainst > 0 ? "+" : ""}
                          {row.goalsFor - row.goalsAgainst}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* モバイル用の情報表示 */}
          <div className="px-4 py-3 bg-neutral-50/50 border-t border-neutral-200 md:hidden">
            <div className="flex items-center justify-between text-xs text-neutral-600">
              <span>最終順位 2025年度埼玉県南部地区3部リーグ</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>勝点</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-accent-gold">🏆</span>
                  <span>上位</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeagueTable;

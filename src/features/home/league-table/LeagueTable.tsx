"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import Image from "next/image";
import { getLeagueData, getLogo } from "@/utils/date";
import { FaCrown, FaMinus, FaTrophy } from "react-icons/fa";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const LeagueTable = () => {
  const LEAGUE_DATA = getLeagueData("2025");

  // メモ化してパフォーマンス最適化
  const sortedLeague = useMemo(() => LEAGUE_DATA.league, [LEAGUE_DATA]);

  return (
    <section className="relative w-full pb-12 overflow-hidden bg-black">
      {/* 背景の装飾的要素 - グラデーションとブラーでモダンな雰囲気を演出 */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-black z-0" />
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-green-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* グリッドパターン（薄く） */}
      <div
        className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full">
        {/* マーキー（流れる文字）セクション */}
        <div className="w-full overflow-hidden bg-green-950/20 border-y border-green-500/10 mb-8 py-4 relative backdrop-blur-sm">
          <div className="flex whitespace-nowrap">
            <div className="flex animate-leagueMarquee min-w-full">
              {[...Array(15)].map((_, i) => (
                <span
                  key={i}
                  className="text-green-500/40 font-black italic text-4xl mx-8 tracking-widest uppercase font-display"
                  style={{ textShadow: "0 0 20px rgba(34,197,94,0.3)" }}
                >
                  LEAGUE STANDING 2025
                </span>
              ))}
            </div>
          </div>
          {/* サイドのフェードアウト効果 */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10"></div>
        </div>

        {/* テーブルヘッダー (PC用) */}
        <div
          className="hidden md:grid grid-cols-12 gap-4 place-items-center text-xs text-neutral-400 font-bold tracking-wider uppercase mb-4 px-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <div className="col-span-1">Rank</div>
          <div className="col-span-4 justify-self-start pl-4">Club</div>
          <div className="col-span-1">Pts</div>
          <div className="col-span-1">Pld</div>
          <div className="col-span-1">W</div>
          <div className="col-span-1">D</div>
          <div className="col-span-1">L</div>
          <div className="col-span-2">GD</div>
        </div>

        {/* リスト本体 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="space-y-3 px-4 md:px-8 lg:px-12"
        >
          {sortedLeague.map((team, index) => {
            const isBicho = team.team === "FC.BICHO";
            const rank = index + 1;
            const goalDiff = team.goalsFor - team.goalsAgainst;

            return (
              <motion.div
                key={team.team}
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0 },
                }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: isBicho
                    ? "rgba(34, 197, 94, 0.8)"
                    : "rgba(255, 255, 255, 0.3)",
                }}
                className={`
                  relative grid grid-cols-12 gap-2 md:gap-4 items-center 
                  p-3 md:p-4 rounded-xl border backdrop-blur-md transition-all duration-300
                  ${
                    isBicho
                      ? "bg-green-900/40 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.2)] z-10"
                      : "bg-white/5 border-white/10 hover:border-white/20 hover:shadow-lg hover:z-10"
                  }
                `}
              >
                {/* 順位バッジ */}
                <div className="col-span-2 md:col-span-1 flex justify-center">
                  <div
                    className={`
                    w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-lg md:text-xl shadow-lg relative
                    ${
                      rank === 1
                        ? "bg-gradient-to-br from-yellow-300 to-yellow-600 text-yellow-950 ring-2 ring-yellow-200/50"
                        : rank === 2
                          ? "bg-gradient-to-br from-slate-300 to-slate-500 text-slate-900 ring-2 ring-slate-200/50"
                          : rank === 3
                            ? "bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100 ring-2 ring-amber-500/50"
                            : isBicho
                              ? "bg-green-600 text-white-1 ring-2 ring-green-400/50"
                              : "bg-neutral-800/80 text-neutral-400 border border-neutral-700"
                    }
                  `}
                  >
                    {rank <= 3 && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-sm z-20">
                        {rank === 1 ? (
                          <FaTrophy className="text-yellow-400 drop-shadow-md filter" />
                        ) : (
                          <FaCrown
                            className={
                              rank === 2 ? "text-slate-300" : "text-amber-500"
                            }
                          />
                        )}
                      </div>
                    )}
                    {rank}
                  </div>
                </div>

                {/* チームロゴ＆名前 */}
                <div className="col-span-7 md:col-span-4 flex items-center gap-3 overflow-hidden">
                  <div className="relative flex w-10 h-10 md:w-14 md:h-14 flex-shrink-0 items-center justify-center bg-white-1 rounded-full p-1 md:p-2 backdrop-blur-sm border border-white/10 shadow-inner">
                    {getLogo(team.team) ? (
                      <Image
                        src={getLogo(team.team)}
                        alt={team.team}
                        width={56}
                        height={56}
                        className="w-full h-full object-contain drop-shadow-md"
                      />
                    ) : (
                      <span>{team.team.charAt(0)}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`font-bold text-sm md:text-lg truncate tracking-tight ${isBicho ? "text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" : "text-white-1"}`}
                    >
                      {team.team}
                    </p>
                    <div className="flex md:hidden items-center gap-3 mt-1 text-[10px] text-neutral-400">
                      <span>
                        Pt:{" "}
                        <span className="text-white-1 font-bold text-xs">
                          {team.points}
                        </span>
                      </span>
                      <span className="text-neutral-300">
                        {team.wins}勝{team.draws}分{team.losses}敗
                      </span>
                    </div>
                  </div>
                </div>

                {/* PC用スタッツ表示 */}
                <div className="hidden md:flex col-span-1 justify-center">
                  <span
                    className={`text-xl font-black ${isBicho ? "text-green-400" : "text-white-1"}`}
                  >
                    {team.points}
                  </span>
                </div>
                <div className="hidden md:flex col-span-1 justify-center font-medium text-neutral-300">
                  {team.game_count}
                </div>
                <div className="hidden md:flex col-span-1 justify-center font-medium text-neutral-300">
                  {team.wins}
                </div>
                <div className="hidden md:flex col-span-1 justify-center font-medium text-neutral-300">
                  {team.draws}
                </div>
                <div className="hidden md:flex col-span-1 justify-center font-medium text-neutral-300">
                  {team.losses}
                </div>

                {/* 得失点差（グラフィカルに） */}
                <div className="col-span-3 md:col-span-2 flex flex-col items-center justify-center pl-2">
                  <div className="flex items-center gap-1 font-bold text-sm md:text-base">
                    {goalDiff > 0 ? (
                      <IoMdArrowDropup className="text-green-500" />
                    ) : goalDiff < 0 ? (
                      <IoMdArrowDropdown className="text-red-500" />
                    ) : (
                      <FaMinus className="text-neutral-500 text-[10px]" />
                    )}
                    <span
                      className={`${goalDiff > 0 ? "text-green-400" : goalDiff < 0 ? "text-red-400" : "text-neutral-400"}`}
                    >
                      {goalDiff > 0 ? "+" : ""}
                      {goalDiff}
                    </span>
                  </div>

                  {/* 簡易バーグラフ */}
                  <div className="hidden md:flex w-full h-1.5 bg-neutral-800 rounded-full mt-1 overflow-hidden relative">
                    <div
                      className={`absolute h-full rounded-full ${goalDiff > 0 ? "bg-gradient-to-r from-green-600 to-green-400" : "bg-gradient-to-r from-red-600 to-red-400"}`}
                      style={{
                        width: `${Math.min(Math.abs(goalDiff) * 3, 100)}%`,
                        left: goalDiff >= 0 ? "50%" : "auto",
                        right: goalDiff < 0 ? "50%" : "auto",
                      }}
                    />
                    {/* センターライン */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20"></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default LeagueTable;

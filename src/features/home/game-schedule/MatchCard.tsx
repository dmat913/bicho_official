"use client";

import BichoLogo from "@/public/bicho-icon.png";
import { ScheduleData } from "@/types/schedule";
import { getLogo } from "@/utils/date";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaMapMarkerAlt, FaClock, FaFutbol, FaTrophy } from "react-icons/fa";

const MatchCard = ({
  schedule,
  isActive = false,
}: {
  schedule: ScheduleData;
  isActive?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const matchDate = new Date(schedule.date);
  // ハイドレーションエラー回避のため日付比較ではなく結果の有無で判定
  const isMatchPlayed = Boolean(schedule.result);

  // 日付フォーマット
  const month = matchDate.toLocaleDateString("ja-JP", { month: "2-digit" });
  const day = matchDate.toLocaleDateString("ja-JP", { day: "2-digit" });
  const dayOfWeek = matchDate.toLocaleDateString("ja-JP", { weekday: "short" });

  const shouldShowScorers =
    isMatchPlayed && schedule.scorer.length > 0 && (isActive || isHovered);

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto h-[420px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* カード本体 */}
      <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-white shadow-xl transition-all duration-300">
        {/* 上部デザイン（画像やパターン） */}
        <div className="absolute top-0 w-full h-32 bg-gradient-to-br from-green-600 via-green-500 to-emerald-400">
          <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-10 mix-blend-overlay"></div>
          {/* 光のエフェクト */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent"></div>
        </div>

        {/* 日付バッジ (浮遊感) */}
        <div className="absolute top-6 left-6 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg z-10 border border-white/50">
          <div
            className="text-sm font-bold text-gray-700 uppercase tracking-wider"
            suppressHydrationWarning
          >
            {month.replace(/^0/, "")}
          </div>
          <div
            className="text-xl font-black text-gray-700 leading-none"
            suppressHydrationWarning
          >
            {day}
          </div>
          <div
            className="text-xs font-bold text-green-700 mt-1"
            suppressHydrationWarning
          >
            {dayOfWeek}
          </div>
        </div>

        {/* 試合ステータス */}
        <div
          className={`absolute top-6 right-6 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide z-10 backdrop-blur-md border shadow-sm ${
            isMatchPlayed
              ? "bg-gray-900/10 text-white border-white/20"
              : "bg-amber-400 text-white border-amber-300"
          }`}
        >
          {isMatchPlayed ? "FINISHED" : "UPCOMING"}
        </div>

        {/* メインコンテンツエリア */}
        <div className="absolute top-24 w-full px-6 flex flex-col items-center">
          {/* 対戦カードビジュアル */}
          <div className="relative w-full bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 flex items-center justify-between z-10 mt-2">
            {/* ホームチーム (Bicho) */}
            <div className="flex flex-col items-center space-y-2 w-1/3">
              <motion.div
                className="relative w-16 h-16 drop-shadow-md"
                animate={
                  isHovered
                    ? { scale: 1.1, rotate: -5 }
                    : { scale: 1, rotate: 0 }
                }
              >
                <Image
                  src={BichoLogo}
                  alt="Bicho"
                  fill
                  className="object-contain"
                />
              </motion.div>
              <span className="text-xs font-bold text-gray-700 tracking-tight">
                BICHO
              </span>
            </div>

            {/* VS / スコア */}
            <div className="flex flex-col items-center w-1/3 z-20">
              {isMatchPlayed ? (
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-black text-gray-800 tracking-tighter tabular-nums flex items-baseline gap-1">
                    <span>{schedule.result?.split("-")[0] || 0}</span>
                    <span className="text-gray-300 text-xl">-</span>
                    <span>{schedule.result?.split("-")[1] || 0}</span>
                  </div>
                  {schedule.pk && (
                    <span className="text-[10px] font-bold text-orange-500 bg-orange-100 px-2 py-0.5 rounded-full mt-1">
                      PK {schedule.pk}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-2xl font-black text-gray-200 italic pr-1">
                  VS
                </span>
              )}
            </div>

            {/* アウェイチーム */}
            <div className="flex flex-col items-center space-y-2 w-1/3">
              <motion.div
                className="relative w-16 h-16 drop-shadow-md flex items-center justify-center bg-gray-50 rounded-full p-2"
                animate={
                  isHovered
                    ? { scale: 1.1, rotate: 5 }
                    : { scale: 1, rotate: 0 }
                }
              >
                {getLogo(schedule.teamName) ? (
                  <Image
                    src={getLogo(schedule.teamName)}
                    alt={schedule.teamName}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-2xl font-black text-gray-300">
                    {schedule.teamName.charAt(0)}
                  </span>
                )}
              </motion.div>
              <span className="text-xs font-bold text-gray-700 tracking-tight truncate w-full text-center">
                {schedule.teamName}
              </span>
            </div>
          </div>

          {/* インフォメーション詳細 */}
          <div className="relative w-full mt-6 px-2 h-32">
            {/* 通常情報 */}
            <motion.div
              className="absolute inset-0 flex flex-col space-y-3"
              animate={{
                opacity: shouldShowScorers ? 0 : 1,
                y: shouldShowScorers ? 10 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center text-gray-500 text-sm">
                <div className="w-8 flex justify-center">
                  <FaClock className="text-green-500" />
                </div>
                <span className="font-medium text-gray-700">
                  {schedule.kickoffTime} Kick Off
                </span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <div className="w-8 flex justify-center">
                  <FaMapMarkerAlt className="text-green-500" />
                </div>
                <span className="font-medium text-gray-700 line-clamp-1">
                  {schedule.location}
                </span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <div className="w-8 flex justify-center">
                  <FaTrophy className="text-green-500" />
                </div>
                <span className="font-medium text-gray-700 line-clamp-1">
                  {schedule.title}
                </span>
              </div>
            </motion.div>

            {/* 得点者 (ある場合) - 最上位に表示 */}
            <AnimatePresence>
              {shouldShowScorers && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute inset-0 z-20"
                >
                  <div className="w-full h-full bg-green-50 rounded-2xl border border-green-100 p-4 shadow-inner overflow-y-auto">
                    <div className="flex items-center gap-2 mb-2 text-green-700 sticky top-0 bg-green-50 pb-1 z-10 border-b border-green-200/50">
                      <FaFutbol className="animate-bounce text-green-600" />
                      <span className="font-bold text-xs uppercase tracking-wider">
                        Goal Scorers
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {schedule.scorer.map((scorer, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-semibold text-green-800 bg-white px-2 py-1 rounded-md border border-green-200 shadow-sm flex items-center gap-1"
                        >
                          {scorer}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 装飾用背景文字 */}
        <div className="absolute bottom-4 right-6 text-9xl font-black text-gray-50 opacity-5 select-none pointer-events-none -rotate-12 z-0">
          VS
        </div>
      </div>
    </motion.div>
  );
};

export default MatchCard;

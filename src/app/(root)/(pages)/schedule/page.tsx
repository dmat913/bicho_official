"use client";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { scheduleState } from "@/recoil/atom/schedule";
import React, { useEffect, useMemo, useRef } from "react";
import { useRecoilValue } from "recoil";
import BichoLogo from "@/public/bicho-icon.png";
import { formatDate, getLogo } from "@/utils/date";
import Image from "next/image";
import { motion } from "framer-motion";

const SchedulePage = () => {
  const nextMatchRef = useRef<HTMLDivElement>(null);

  // 試合日程取得
  const schedules = useRecoilValue(scheduleState);
  const today = new Date();

  // 一番近い試合のindex
  const nextMatchIndex: number = useMemo(() => {
    if (schedules.length === 0) return -1;
    // 今日の日付を取得
    const today = new Date();
    // 未来の日程
    const closestIndex = schedules.findIndex((schedule) => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate >= today;
    });
    if (closestIndex === -1) return -1;
    return closestIndex;
  }, [schedules]);

  // マウント時に次の試合の位置までスクロール
  useEffect(() => {
    if (nextMatchRef.current && nextMatchIndex !== -1) {
      // スムーズスクロールのオプションを設定
      nextMatchRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    // eslint-disable-next-line
  }, [nextMatchIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-green-50">
      <Header />

      {/* ヘッダーセクション */}
      <div className="pt-28 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-green-50/50 backdrop-blur-sm border border-green-200/30 rounded-2xl px-6 py-3 mb-6">
              <span className="text-2xl">📅</span>
              <span className="text-green-700 font-bold text-sm uppercase tracking-wider">
                Schedule
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
              試合日程・結果
            </h1>
            <p className="text-neutral-600 text-lg">
              FC.BICHOの最新の試合スケジュールと結果をご覧いただけます
            </p>
          </motion.div>
        </div>
      </div>

      {/* スケジュールリスト */}
      <div className="px-4 pb-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {schedules.map((schedule, index) => {
            const isNextMatch = index === nextMatchIndex;
            const isFinished = new Date(schedule.date) < today;
            const hasResult = schedule.result !== "";

            return (
              <motion.div
                key={schedule._id}
                ref={isNextMatch ? nextMatchRef : null}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`
                  relative overflow-hidden rounded-2xl shadow-medium border transition-all duration-300 hover:shadow-strong
                  ${
                    isNextMatch
                      ? "bg-gradient-to-r from-green-50 to-green-100 border-green-300 ring-2 ring-green-400/20"
                      : "bg-white-1 border-neutral-200 hover:border-neutral-300"
                  }
                `}
              >
                {/* Next試合のバッジ */}
                {isNextMatch && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="absolute top-4 left-4 z-10"
                  >
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white-1 px-4 py-2 rounded-xl font-bold text-sm shadow-md">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-white-1 rounded-full animate-pulse"></span>
                        NEXT MATCH
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* 結果バッジ */}
                {isFinished && hasResult && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="absolute bottom-4 right-4 z-10"
                  >
                    <div className="bg-gradient-to-r from-neutral-600 to-neutral-700 text-white-1 px-3 py-1 rounded-lg font-bold text-xs shadow-md">
                      FINISHED
                    </div>
                  </motion.div>
                )}

                <div className="p-6 pt-8">
                  {/* 試合情報ヘッダー */}
                  <div className="text-center mb-8 mt-4">
                    <h3 className="text-lg lg:text-xl font-bold text-neutral-800 mb-2">
                      {schedule.title}
                    </h3>
                    <p className="text-neutral-600 text-sm lg:text-base">
                      {schedule.description}
                    </p>
                  </div>

                  {/* 日時・会場情報 */}
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 p-4 bg-neutral-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2 lg:mb-0">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-white-1 text-sm">📅</span>
                      </div>
                      <span className="text-neutral-700 font-medium">
                        {formatDate(schedule.date, schedule.kickoffTime)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent-gold rounded-lg flex items-center justify-center">
                        <span className="text-white-1 text-sm">📍</span>
                      </div>
                      <span className="text-neutral-700 font-medium">
                        {schedule.location}
                      </span>
                    </div>
                  </div>

                  {/* 対戦カード */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="grid grid-cols-3 gap-6 items-center w-full max-w-lg">
                      {/* Bichoチーム */}
                      <div className="text-center">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-3 bg-green-500 rounded-2xl flex items-center justify-center shadow-md">
                          <Image
                            src={BichoLogo}
                            alt="FC.BICHO"
                            width={40}
                            height={40}
                            className="w-8 h-8 lg:w-10 lg:h-10"
                          />
                        </div>
                        <div className="font-bold text-neutral-800 text-sm lg:text-base">
                          FC.BICHO
                        </div>
                      </div>

                      {/* VS・スコア */}
                      <div className="text-center">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white-1 rounded-2xl py-4 px-6 shadow-md">
                          {hasResult ? (
                            <div className="flex flex-col items-center justify-center gap-2">
                              <div className="text-lg lg:text-3xl font-bold">
                                {schedule.result}
                              </div>
                              {schedule.pk && schedule.pk !== "" && (
                                <div className="text-xs lg:text-sm opacity-90 whitespace-nowrap">
                                  PK:{schedule.pk}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-xl lg:text-2xl font-bold">
                              VS
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 相手チーム */}
                      <div className="text-center">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-3 bg-neutral-100 rounded-2xl flex items-center justify-center shadow-md">
                          {getLogo(schedule.teamName) !== "" ? (
                            <Image
                              src={getLogo(schedule.teamName)}
                              alt={schedule.teamName}
                              width={40}
                              height={40}
                              className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
                            />
                          ) : (
                            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-neutral-300" />
                          )}
                        </div>
                        <div className="font-bold text-neutral-800 text-sm lg:text-base">
                          {schedule.teamName}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 得点者情報 */}
                  {isFinished && schedule.scorer.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="mt-6 p-4 bg-green-50 rounded-xl border-l-4 border-green-500"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-green-600 text-lg">⚽</span>
                        <h4 className="text-green-700 font-bold text-sm">
                          得点者
                        </h4>
                      </div>
                      <div className="space-y-1">
                        {schedule.scorer.map((scorer, scorerIndex) => (
                          <div
                            key={scorerIndex}
                            className="text-green-600 text-sm lg:text-base"
                          >
                            {scorer}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SchedulePage;

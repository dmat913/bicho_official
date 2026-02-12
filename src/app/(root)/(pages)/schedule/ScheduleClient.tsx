"use client";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Breadcrumb from "@/components/elements/Breadcrumb";
import React, { useEffect, useMemo, useRef } from "react";
import BichoLogo from "@/public/bicho-icon.png";
import { getLogo } from "@/utils/date";
import Image from "next/image";
import { motion } from "framer-motion";
import { MdOutlineStadium, MdAccessTime, MdSportsSoccer } from "react-icons/md";
import { ScheduleData } from "@/types/schedule";

interface ScheduleClientProps {
  schedules: ScheduleData[];
}

const ScheduleClient: React.FC<ScheduleClientProps> = ({ schedules }) => {
  const nextMatchRef = useRef<HTMLDivElement>(null);

  // 一番近い試合のindex
  const nextMatchIndex: number = useMemo(() => {
    if (schedules.length === 0) return -1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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
      nextMatchRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [nextMatchIndex]);

  // 日付フォーマット関数
  const formatMatchDate = (dateInput: Date | string) => {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      date.getDay()
    ];
    return { full: `${year}.${month}.${day}`, dayOfWeek };
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-neutral-800">
      <Header />

      <Breadcrumb items={[{ name: "試合日程・結果", path: "/schedule" }]} />

      {/* ヒーローセクション */}
      <section className="relative pt-32 pb-16 px-4 bg-white shadow-sm mb-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">
              MATCH SCHEDULE
            </h1>
            <p className="text-neutral-500 font-medium tracking-wide">
              FC.BICHO 試合日程・結果
            </p>
          </motion.div>
        </div>
      </section>

      {/* スケジュールリスト */}
      <section className="px-4 pb-24">
        <div className="max-w-3xl mx-auto space-y-8">
          {schedules.length === 0 ? (
            <div className="text-center py-20 text-neutral-400">
              試合日程がありません
            </div>
          ) : (
            schedules.map((schedule, index) => {
              const isNextMatch = index === nextMatchIndex;
              const isFinished = new Date(schedule.date) < new Date();
              const hasResult = schedule.result !== "";
              const matchDate = formatMatchDate(schedule.date);

              return (
                <motion.div
                  key={schedule._id}
                  ref={isNextMatch ? nextMatchRef : null}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`
                    group relative rounded-3xl overflow-hidden transition-all duration-300
                    ${
                      isNextMatch
                        ? "bg-white shadow-2xl ring-4 ring-green-400/20 scale-[1.02] z-10 border-2 border-green-500"
                        : "bg-white shadow-md hover:shadow-xl border border-slate-200"
                    }
                  `}
                >
                  {/* NEXT MATCH インジケーター */}
                  {isNextMatch && (
                    <div className="bg-green-600 text-white-1 text-xs font-bold tracking-widest text-center py-1.5 uppercase">
                      Next Match
                    </div>
                  )}

                  <div className="p-6 md:p-8">
                    {/* 上部：大会名・日時 */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-neutral-100 gap-4">
                      <div>
                        <div className="text-sm font-bold text-green-600 mb-1">
                          {schedule.title}
                        </div>
                        <div className="text-xs text-neutral-400">
                          {schedule.description}
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-neutral-600 bg-neutral-50 px-4 py-2 rounded-full">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-lg font-bold text-neutral-800">
                            {matchDate.full}
                          </span>
                          <span className="text-xs font-medium uppercase text-neutral-400">
                            {matchDate.dayOfWeek}
                          </span>
                        </div>
                        <div className="w-px h-4 bg-neutral-300"></div>
                        <div className="flex items-center gap-1.5">
                          <MdAccessTime className="text-green-500" />
                          <span>{schedule.kickoffTime} KO</span>
                        </div>
                      </div>
                    </div>

                    {/* メイン：対戦カード */}
                    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center mb-8">
                      {/* HOME (BICHO) */}
                      <div className="flex flex-col items-center justify-center text-center gap-3">
                        <div className="relative w-16 h-16 md:w-24 md:h-24 bg-white rounded-2xl p-2 shadow-sm border border-neutral-50 flex items-center justify-center">
                          <Image
                            src={BichoLogo}
                            alt="FC.BICHO"
                            width={80}
                            height={80}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="font-bold text-neutral-800 text-sm md:text-base">
                          FC.BICHO
                        </span>
                      </div>

                      {/* VS / SCORE */}
                      <div className="flex flex-col items-center justify-center px-2 md:px-8">
                        {hasResult ? (
                          <>
                            <div className="text-4xl md:text-5xl font-black text-neutral-800 tracking-tighter leading-none">
                              {schedule.result}
                            </div>
                            {schedule.pk && schedule.pk !== "" && (
                              <span className="text-xs font-medium text-neutral-400 mt-2 bg-neutral-100 px-2 py-0.5 rounded">
                                PK: {schedule.pk}
                              </span>
                            )}
                            <div className="mt-2 text-xs font-bold text-neutral-400 tracking-widest uppercase">
                              Full Time
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center">
                            <span className="text-3xl md:text-4xl font-black text-neutral-200 tracking-widest">
                              VS
                            </span>
                          </div>
                        )}
                      </div>

                      {/* AWAY (OPPONENT) */}
                      <div className="flex flex-col items-center justify-center text-center gap-3">
                        <div className="relative w-16 h-16 md:w-24 md:h-24 bg-white rounded-2xl p-2 shadow-sm border border-neutral-50 flex items-center justify-center">
                          {getLogo(schedule.teamName) ? (
                            <Image
                              src={getLogo(schedule.teamName)}
                              alt={schedule.teamName}
                              width={80}
                              height={80}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-400 font-bold text-xl">
                              {schedule.teamName.slice(0, 1)}
                            </div>
                          )}
                        </div>
                        <span className="font-bold text-neutral-800 text-sm md:text-base">
                          {schedule.teamName}
                        </span>
                      </div>
                    </div>

                    {/* 下部：会場・得点者 */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 bg-neutral-50/50 rounded-2xl p-4">
                      {/* 会場 */}
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <MdOutlineStadium className="text-green-500 text-lg" />
                        <span>{schedule.location}</span>
                      </div>

                      {/* 得点者（試合終了かつ得点がある場合） */}
                      {isFinished && schedule.scorer.length > 0 && (
                        <div className="flex flex-col items-start md:items-end gap-1">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-green-700 uppercase tracking-wider mb-1">
                            <MdSportsSoccer /> Scorers
                          </div>
                          <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                            {schedule.scorer.map((scorer, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center px-2 py-1 rounded bg-white border border-neutral-100 text-xs font-medium text-neutral-600 shadow-sm"
                              >
                                {scorer}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ScheduleClient;

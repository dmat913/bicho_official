"use client";

import { scheduleState } from "@/recoil/atom/schedule";
import { useRecoilValue } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import DPagination from "@/components/elements/DPagination";
import { useState, useEffect, memo, useMemo } from "react";
import DMoreButton from "@/components/elements/DMoreButton";
import { ScheduleData } from "@/types/schedule";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import MatchCard from "./MatchCard";
import HomeLoading from "../loading/HomeLoading";

const GameSchedule = () => {
  const schedules = useRecoilValue(scheduleState);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // Swiperの再レンダリング用のキー
  const [swiperKey, setSwiperKey] = useState(0);

  // 画面に入ったかどうかを監視するための参照
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // 今日の日付から一番近い試合日程のindex
  const closestIndex = useMemo(() => {
    const today = new Date();
    if (!schedules) return 0;
    const index = schedules.findIndex((schedule) => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate >= today;
    });
    return index ?? -1;
  }, [schedules]);

  // 表示する5つの日程
  const displaySchedules: ScheduleData[] = useMemo(() => {
    if (!schedules) return [];

    const arr1 = schedules.slice(closestIndex, schedules.length);
    if (arr1.length === 0) {
      return [...schedules.slice(-5)];
    }

    const arr2 = schedules.slice(0, schedules.length - arr1.length);

    if (arr1.length > 3) {
      return arr2.slice(-2).concat(arr1.slice(0, 3));
    }

    return arr2.slice(arr1.length - 5).concat(arr1);
    // eslint-disable-next-line
  }, [schedules]);

  // 画面開いた際に一番最初に表示するindexを設定
  useEffect(() => {
    // 今日の日付を取得
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const closestIndex = displaySchedules.findIndex((schedule) => {
      const scheduleDate = new Date(schedule.date);
      return (
        scheduleDate.toISOString().split("T")[0] === formattedDate ||
        scheduleDate >= today
      );
    });
    if (closestIndex !== -1) {
      setCurrentPage(closestIndex + 1);
      setSwiperKey((prevKey) => prevKey + 1);
    } else {
      setCurrentPage(1);
    }
  }, [displaySchedules]);

  return (
    <div
      id="game-schedule"
      className="relative w-full px-4 py-16 bg-gradient-to-br from-neutral-50 to-green-50 overflow-hidden"
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20" />
      <div className="absolute top-20 right-20 w-32 h-32 bg-green-200/30 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent-gold/20 rounded-full blur-xl" />

      <div className="relative section-container max-w-6xl mx-auto">
        {/* モダンなタイトルセクション */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-accent-gold rounded-full" />
            <span className="text-green-700 font-medium text-sm tracking-widest uppercase">
              Upcoming Matches
            </span>
            <div className="w-16 h-1 bg-gradient-to-r from-accent-gold to-green-400 rounded-full" />
          </div>

          <motion.h2
            className="text-gradient-hero font-display font-black text-2xl lg:text-3xl mb-4 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Game Schedule
          </motion.h2>

          <motion.p
            className="text-neutral-600 font-semibold text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            試合日程
          </motion.p>
        </motion.div>
        {/* スケジュールコンテンツ */}
        {schedules?.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Swiper
              spaceBetween={24}
              slidesPerView={1}
              onSlideChange={(swiper) => setCurrentPage(swiper.realIndex + 1)}
              initialSlide={currentPage - 1}
              key={swiperKey}
              className="pb-8"
              breakpoints={{
                350: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
            >
              {displaySchedules.map((schedule, index) => (
                <SwiperSlide key={schedule._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <MatchCard schedule={schedule} />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* ページネーション */}
            <div className="flex gap-2 justify-center py-6">
              <DPagination
                data={displaySchedules}
                currentPage={currentPage - 1}
              />
            </div>

            {/* モアボタン */}
            <div className="flex justify-center mt-8">
              <DMoreButton path="/schedule" />
            </div>
          </motion.div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <HomeLoading />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(GameSchedule);

"use client";

import { scheduleState } from "@/recoil/atom/schedule";
import { useRecoilValue } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import DPagination from "@/components/elements/DPagination";
import { useState, useEffect, memo, useMemo, useRef } from "react";
import DMoreButton from "@/components/elements/DMoreButton";
import { ScheduleData } from "@/types/schedule";
import { motion, useInView } from "framer-motion";
import MatchCard from "./MatchCard";

const GameSchedule = () => {
  const schedulesFromState = useRecoilValue(scheduleState);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [swiperKey, setSwiperKey] = useState(0);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const schedules = useMemo(() => {
    if (!schedulesFromState) return [];
    return [...schedulesFromState].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }, [schedulesFromState]);

  const closestIndex = useMemo(() => {
    const today = new Date();
    if (!schedules) return 0;
    const index = schedules.findIndex((schedule) => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate >= today;
    });
    return index ?? -1;
  }, [schedules]);

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

  useEffect(() => {
    // 今日の日付（時刻を0時0分0秒にリセット）
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const index = displaySchedules.findIndex((schedule) => {
      const scheduleDate = new Date(schedule.date);
      scheduleDate.setHours(0, 0, 0, 0);
      return scheduleDate >= today;
    });

    // 今日以降の試合があればその位置、なければ最後の試合
    setCurrentPage(index !== -1 ? index + 1 : displaySchedules.length);
    setSwiperKey((prevKey) => prevKey + 1);
  }, [displaySchedules]);

  return (
    <div
      id="game-schedule"
      className="relative w-full py-16 overflow-hidden bg-gradient-to-br from-white-1 via-neutral-50 to-gray-100"
    >
      {/* ドットグリッドパターン */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(134 239 172 / 0.15) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* 斜めのアクセントライン */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-green-300/30 to-transparent transform rotate-12" />
        <div className="absolute top-0 left-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-emerald-300/20 to-transparent transform -rotate-12" />
      </div>

      {/* アニメーション円形グラデーション - より洗練された */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-15%] right-[-5%] w-[700px] h-[700px] bg-gradient-radial from-green-300/30 via-emerald-200/20 to-transparent rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -40, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-[-15%] left-[-5%] w-[600px] h-[600px] bg-gradient-radial from-emerald-300/25 via-green-200/15 to-transparent rounded-full blur-[110px] pointer-events-none"
      />

      {/* 幾何学的な装飾要素 */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[20%] left-[10%] w-32 h-32 border border-green-200/20 rounded-lg pointer-events-none"
      />
      <motion.div
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[15%] right-[15%] w-24 h-24 border border-emerald-200/20 rounded-full pointer-events-none"
      />

      <div className="relative section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* タイトルセクション */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            GAME{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
              SCHEDULE
            </span>
          </h2>
        </motion.div>

        {/* スケジュール Swiper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <Swiper
            key={swiperKey}
            modules={[EffectCoverflow, Pagination]}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            onSlideChange={(swiper) => setCurrentPage(swiper.realIndex + 1)}
            initialSlide={currentPage - 1}
            className="w-full py-10 !overflow-visible"
            breakpoints={{
              320: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
          >
            {displaySchedules.map((schedule) => (
              <SwiperSlide
                key={schedule._id}
                className="max-w-sm transition-transform duration-300"
              >
                {({ isActive }) => (
                  <div
                    className={`transition-all duration-500 ${isActive ? "scale-100 opacity-100 z-10" : "scale-90 opacity-60 hover:opacity-100"}`}
                  >
                    <MatchCard schedule={schedule} isActive={isActive} />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ページネーションインジケーター */}
          <div className="flex flex-col items-center mt-8 gap-6">
            <div className="hidden md:block">
              <DPagination
                data={displaySchedules}
                currentPage={currentPage - 1}
              />
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <DMoreButton path="/schedule" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(GameSchedule);

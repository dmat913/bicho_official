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
    let arr2 = schedules.slice(0, -arr1.length);
    arr2 = arr2.splice(arr1.length - 5);
    if (arr1.length <= 3) {
      return [...arr2.slice(-5)]
    }
    return [...arr2.slice(-2), ...arr1.slice(0,3)];
    // eslint-disable-next-line
  }, [schedules]);

  // 画面開いた際に一番最初に表示するindexを設定
  useEffect(() => {
    // 今日の日付を取得
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const closestIndex = displaySchedules.findIndex((schedule) => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate.toISOString().split("T")[0] === formattedDate || scheduleDate >= today;
    });
    if (closestIndex !== -1) {
      setCurrentPage(closestIndex + 1);
      setSwiperKey((prevKey) => prevKey + 1);
    } else {
      setCurrentPage(1);
    }
  }, [displaySchedules]);

  // schedulesが空の場合のローディング表示
  if (!schedules || schedules.length === 0) {
    return (
      <div id="game-schedule" className="py-10 px-4 bg-noise-green-3">
        <div className="flex flex-col items-center mb-4">
          <span className="text-gradient font-bold text-2xl">
            Game Schedule
          </span>
          <span className="text-gradient font-semibold">
            試合日程
          </span>
        </div>
        <div className="flex justify-center items-center h-64">
          <span className="text-gray-300">日程を取得中...</span>
        </div>
      </div>
    );
  }

  return (
    <div id="game-schedule" className="py-10 px-4 bg-noise-green-3">
      <div className="flex flex-col items-center mb-4">
        <motion.span
          ref={ref}
          className="text-gradient font-bold text-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Game Schedule
        </motion.span>

        <motion.span
          className="text-gradient font-semibold"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          試合日程
        </motion.span>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        onSlideChange={(swiper) => setCurrentPage(swiper.realIndex + 1)}
        initialSlide={currentPage - 1}
        key={swiperKey}
        breakpoints={{
          350: {
            slidesPerView: 1,
          },
          700: {
            slidesPerView: 2,
          },
          1050: {
            slidesPerView: 3,
          },
        }}
      >
        {displaySchedules.map((schedule) => (
          <SwiperSlide key={schedule._id}>
            <MatchCard schedule={schedule} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex gap-1 justify-center py-3">
        <DPagination data={displaySchedules} currentPage={currentPage - 1} />
      </div>
      <div className="w-full px-4 mt-4">
        <DMoreButton path="/schedule" />
      </div>
    </div>
  );
};

export default memo(GameSchedule);
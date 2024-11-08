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

  const displaySchedules: ScheduleData[] = useMemo(() => {
    return schedules.slice(-5);
  }, [schedules]);

  useEffect(() => {
    // 今日の日付を取得
    const today = new Date();

    const closestIndex = displaySchedules.findIndex((schedule) => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate >= today;
    });

    if (closestIndex !== -1) {
      setCurrentPage(closestIndex + 1);
      setSwiperKey((prevKey) => prevKey + 1);
    } else {
      setCurrentPage(1); // デフォルトのスライドを1に設定
    }
  }, [displaySchedules]);

  return (
    <div
      id="game-schedule"
      className="py-10 px-4 bg-noise-green-1 border-b-[1px] border-line-1"
    >
      <div className="flex flex-col items-center mb-4">
        {/* アニメーションを適用する要素 */}
        <motion.span
          ref={ref}
          className="text-white-1 font-bold text-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          GAME SCHEDULE
        </motion.span>
        <motion.span
          className="text-white-1 font-semibold"
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

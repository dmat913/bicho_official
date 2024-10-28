"use client";

import { scheduleState } from "@/recoil/atom/schedule";
import { useRecoilValue } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import MatchCard from "./MatchCard";
import DPagination from "@/components/elements/DPagination";
import { useState, useEffect, memo } from "react";
import DMoreButton from "@/components/elements/DMoreButton";

const GameSchedule = () => {
  // 日程一覧
  const schedules = useRecoilValue(scheduleState);
  // 表示中slideIndex
  const [currentPage, setCurrentPage] = useState<number>(1);
  // Swiperの再レンダリング用のキー
  const [swiperKey, setSwiperKey] = useState(0);

  useEffect(() => {
    // 今日の日付を取得
    const today = new Date();

    const closestIndex = schedules.findIndex((schedule) => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate >= today;
    });

    if (closestIndex !== -1) {
      setCurrentPage(closestIndex + 1);
      setSwiperKey((prevKey) => prevKey + 1);
    }
  }, [schedules]);

  return (
    <div className="py-10 px-4 bg-noise-green-4">
      <div className="flex flex-col items-center mb-4">
        <span className="text-white-1 font-bold text-2xl">GAME SCHEDULE</span>
        <span className="text-white-1 font-semibold">試合日程</span>
      </div>
      <Swiper
        key={swiperKey}
        spaceBetween={20}
        slidesPerView={1}
        onSlideChange={(swiper) => setCurrentPage(swiper.realIndex + 1)}
        initialSlide={currentPage - 1}
      >
        {schedules.slice(-5).map((schedule) => (
          <SwiperSlide key={schedule._id}>
            <MatchCard schedule={schedule} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex gap-1 justify-center py-3">
        <DPagination data={schedules.slice(-5)} currentPage={currentPage - 1} />
      </div>
      <div className="w-full px-4 mt-4">
        <DMoreButton path="/schedule" />
      </div>
    </div>
  );
};

export default memo(GameSchedule);

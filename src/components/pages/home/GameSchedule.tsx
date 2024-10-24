"use client";

import { scheduleState } from "@/recoil/atom/schedule";
import { useRecoilValue } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import MatchCard from "./MatchCard";
import DPagination from "@/components/elements/DPagination";
import { useState } from "react";
import { Autoplay } from "swiper/modules";

const GameSchedule = () => {
  // 日程一覧
  const schedules = useRecoilValue(scheduleState);
  // 表示中slideIndex
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div className="py-10 px-4 bg-green-4">
      <div className="flex flex-col items-center mb-4">
        <span className="text-white-1 font-bold text-2xl">GAME SCHEDULE</span>
        <span className="text-white-1 font-semibold">試合日程</span>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        onSlideChange={(swiper) => setCurrentPage(swiper.realIndex + 1)}
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
      >
        {schedules.map((schedule) => (
          <SwiperSlide key={schedule._id}>
            <MatchCard schedule={schedule} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex gap-1 bg-green-4 justify-center py-3">
        <DPagination data={schedules} currentPage={currentPage - 1} />
      </div>
    </div>
  );
};

export default GameSchedule;

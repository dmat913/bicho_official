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
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const index = displaySchedules.findIndex((schedule) => {
      const scheduleDate = new Date(schedule.date);
      return (
        scheduleDate.toISOString().split("T")[0] === formattedDate ||
        scheduleDate >= today
      );
    });
    if (index !== -1) {
      setCurrentPage(index + 1);
      setSwiperKey((prevKey) => prevKey + 1);
    } else {
      setCurrentPage(1);
    }
  }, [displaySchedules]);

  return (
    <div
      id="game-schedule"
      className="relative w-full py-16 overflow-hidden bg-neutral-50"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-green-300/20 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none"
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

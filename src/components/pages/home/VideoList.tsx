"use client";
import { YouTubeEmbed } from "@next/third-parties/google";
import React, { useState, useRef } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import YoutubeLogo from "@/public/youtube.png";
import Image from "next/image";
import DPagination from "@/components/elements/DPagination";
import { motion, useInView } from "framer-motion";

const VideoList = () => {
  const videoIds: string[] = [
    "I59yVeNBLIw",
    "kBt0J7A0wOY",
    "X-SujX9H3tk",
    "pEyZI-mwutw",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoIds.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videoIds.length - 1 : prevIndex - 1
    );
  };

  // useInViewを使ってアニメーション用の参照と状態を設定
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true });

  return (
    <div className="flex flex-col justify-between w-full px-4 py-10 bg-diagonal-lines">
      {/* アニメーションを適用するロゴとテキスト */}
      <motion.div
        ref={textRef}
        className="flex justify-center gap-2 pb-4"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Image src={YoutubeLogo} alt="Youtube logo" width={32} height={32} />
        <span className="text-white-1 font-bold text-2xl">YOUTUBE</span>
      </motion.div>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {videoIds.map((videoid, index) => (
            <div key={index} className="min-w-full">
              <YouTubeEmbed videoid={videoid} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        <button onClick={goToPrevious}>
          <IoIosArrowDropleftCircle size={40} color="#FFF8E7" />
        </button>
        <button onClick={goToNext}>
          <IoIosArrowDroprightCircle size={40} color="#FFF8E7" />
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        <DPagination data={videoIds} currentPage={currentIndex} />
      </div>
    </div>
  );
};

export default VideoList;

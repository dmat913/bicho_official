"use client";
import { YouTubeEmbed } from "@next/third-parties/google";
import React, { useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import YoutubeLogo from "@/public/youtube.png";
import Image from "next/image";

const VideoList = () => {
  // Youtube video is List
  const videoIds: string[] = [
    "I59yVeNBLIw",
    "kBt0J7A0wOY",
    "X-SujX9H3tk",
    "pEyZI-mwutw",
  ];
  // 表示中のページ
  const [currentIndex, setCurrentIndex] = useState(0);

  // 右矢印押下時
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoIds.length);
  };

  // 左矢印押下時
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videoIds.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className="flex flex-col justify-between w-full px-4 py-10 bg-green-3">
      <div className="flex justify-center gap-2 pb-4">
        <Image src={YoutubeLogo} alt="Youtube logo" width={32} height={32} />
        <span className="text-white-1 font-bold text-2xl">YOUTUBE</span>
      </div>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
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
      {/* ページインジケーター */}
      <div className="flex justify-center mt-4 space-x-2">
        {videoIds.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-8 ${
              currentIndex === index ? "bg-green-2" : "bg-white-1"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoList;

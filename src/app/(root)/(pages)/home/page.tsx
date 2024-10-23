"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import Header from "@/components/header/Header";
import NavBar from "@/components/nav/NavBar";
import { useRecoilValue } from "recoil";
import { imagesState } from "@/recoil/atom/image";
import VideoList from "@/components/pages/home/VideoList";
import MatchCard from "@/components/pages/home/MatchCard";
import { useState } from "react";
import Footer from "@/components/footer/Footer";
import DPagination from "@/components/elements/DPagination";
import { scheduleState } from "@/recoil/atom/schedule";

const ImageUpload: React.FC = () => {
  // 表示中slideIndex
  const [currentPage, setCurrentPage] = useState<number>(1);
  // 画像一覧 data
  const images = useRecoilValue(imagesState);
  // 日程一覧
  const schedules = useRecoilValue(scheduleState);
  return (
    <div>
      <Header />
      <NavBar />
      {/* ページインジケーター */}
      <Swiper
        spaceBetween={1}
        slidesPerView={1}
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop={true}
        onSlideChange={(swiper) => setCurrentPage(swiper.realIndex + 1)}
      >
        {images.map((image) => (
          <SwiperSlide key={image._id} className="md:h-[200px]">
            <img
              src={image.data}
              alt="Top Image"
              className="lg:h-[500px] md:h-[400px] h-[250px] object-cover w-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex gap-1 bg-green-1 justify-center py-3">
        <DPagination data={images} currentPage={currentPage - 1} />
      </div>
      <div className="py-10 px-4 bg-green-4">
        <div className="flex flex-col items-center mb-4">
          <span className="text-white-1 font-bold text-2xl">GAME SCHEDULE</span>
          <span className="text-white-1 font-semibold">試合日程</span>
        </div>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          loop={true}
        >
          {schedules.map((schedule) => (
            <SwiperSlide key={schedule._id}>
              <MatchCard schedule={schedule} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <VideoList />
      <Footer />
    </div>
  );
};

export default ImageUpload;

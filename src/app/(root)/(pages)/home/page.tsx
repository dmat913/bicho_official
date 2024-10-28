"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import Header from "@/components/header/Header";
// import NavBar from "@/components/nav/NavBar";
import { useRecoilValue } from "recoil";
import { imagesState } from "@/recoil/atom/image";
import VideoList from "@/components/pages/home/VideoList";
import { useState } from "react";
import Footer from "@/components/footer/Footer";
import DPagination from "@/components/elements/DPagination";
import GameSchedule from "@/components/pages/home/GameSchedule";

const ImageUpload: React.FC = () => {
  // 表示中slideIndex
  const [currentPage, setCurrentPage] = useState<number>(1);
  // 画像一覧 data
  const images = useRecoilValue(imagesState);

  return (
    <div>
      <Header />
      {/* <NavBar /> */}
      {/* ページインジケーター */}
      <Swiper
        spaceBetween={1}
        slidesPerView={1}
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
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
      <div className="flex gap-1 bg-noise-green-1 justify-center py-3">
        <DPagination data={images} currentPage={currentPage - 1} />
      </div>
      {/** 試合日程 */}
      <GameSchedule />
      {/** Youtube */}
      <VideoList />
      <Footer />
    </div>
  );
};

export default ImageUpload;

"use client";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/header/Header";
// import NavBar from "@/components/nav/NavBar";
import { imagesState } from "@/recoil/atom/image";
import VideoList from "@/components/pages/home/VideoList";
import Footer from "@/components/footer/Footer";
import DPagination from "@/components/elements/DPagination";
import GameSchedule from "@/components/pages/home/GameSchedule";
import HomeLoading from "@/components/pages/home/HomeLoading";

const HomePage: React.FC = () => {
  // 表示中の画像index
  const [currentPage, setCurrentPage] = useState<number>(1);
  // 画像一覧
  const images = useRecoilValue(imagesState);
  // loading表示
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div
      className={`relative overflow-hidden ${
        isLoading ? "w-[100vw] h-[100svh]" : "h-full w-full"
      }`}
    >
      {/* メインコンテンツ */}
      <div className="w-full h-full">
        <Header />
        {/* <NavBar /> */}
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

      {/* ローディング画面 */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 z-10 bg-noise-green-3 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8 }}
          >
            <HomeLoading setIsLoading={setIsLoading} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;

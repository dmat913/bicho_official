"use client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
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
import { fetchImages } from "@/utils/image";
import { scheduleState } from "@/recoil/atom/schedule";

const HomePage: React.FC = () => {
  // 表示中の画像index
  const [currentPage, setCurrentPage] = useState<number>(1);
  // 画像一覧
  const [images, setImages] = useRecoilState(imagesState);
  // 試合日程一覧
  const [schedules, setSchedules] = useRecoilState(scheduleState);
  // loading表示
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // API呼び出し
  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await fetchImages();
        setImages(data);
        setIsLoading(false);
      } catch (error) {
        alert("画像取得中にエラーが発生しました:");
        console.log(error);
        setIsLoading(false);
      }
    };
    if (images.length === 0) {
      loadImages();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [setImages, setIsLoading]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch("/api/schedule", { method: "GET" });

        if (!response.ok) throw new Error("データ取得に失敗しました");

        const data = await response.json();
        setSchedules(data.schedules);
      } catch (err) {
        console.log("日程取得エラー:", err);
      }
    };
    if (schedules.length === 0) {
      fetchSchedules();
    }
    // eslint-disable-next-line
  }, [setSchedules]);

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
              <motion.img
                src={image.data}
                alt="Top Image"
                className="lg:h-[500px] md:h-[400px] h-[250px] object-cover w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
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
            <HomeLoading />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;

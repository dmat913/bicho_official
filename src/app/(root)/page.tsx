"use client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/header/Header";
import { imagesState } from "@/recoil/atom/image";
import Footer from "@/components/layout/footer/Footer";
import { fetchFirstImage, fetchImages } from "@/utils/image";
import { scheduleState } from "@/recoil/atom/schedule";
import LeagueTable from "@/features/home/league-table/LeagueTable";
// import NavBar from "@/features/home/nav/NavBar";
import GameSchedule from "@/features/home/game-schedule/GameSchedule";
import Tournament from "@/features/home/tournament/Tournament";
import HomeLoading from "@/features/home/loading/HomeLoading";
// import VideoList from "@/features/home/youtube-video-list/VideoList";
import AboutBicho from "@/features/home/about-bicho/AboutBicho";
import PhotoSwiper from "@/features/home/photo-swiper/PhotoSwiper";
// import SoccerGround from "@/features/home/starting-lineup/SoccerGround";
import Article from "@/features/home/article/Article";

const HomePage: React.FC = () => {
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
        const firstData = await fetchFirstImage();
        setImages(firstData);
        setIsLoading(false);
        const data = await fetchImages();
        setImages(data);
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
        const listResponse = await fetch("/api/schedule", {
          method: "GET",
        });
        const dates = await listResponse.json();
        setSchedules(dates.schedules);
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
      className={`relative ${
        isLoading ? "w-[100vw] h-[100svh]" : "h-full w-full"
      }`}
    >
      {/* メインコンテンツ */}
      {!isLoading && (
        <div className="w-full h-full relative">
          <Header />
          {/* <NavBar /> */}
          {/* BICHOについて */}
          <AboutBicho />
          {/** 試合日程 */}
          <GameSchedule />
          {/* 写真swiper */}
          <PhotoSwiper />
          {/* トーナメント表 */}
          <Tournament />
          {/* リーグ表 */}
          <LeagueTable />
          {/** 記事 */}
          <Article />
          {/* スタメン */}
          {/* <SoccerGround /> */}
          {/** Youtube */}
          {/* <VideoList /> */}
          <Footer />
        </div>
      )}
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

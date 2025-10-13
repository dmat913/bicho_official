"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
import BichoLogo from "@/public/bicho-icon.png";

const HomePage: React.FC = () => {
  const footerRef = useRef<HTMLElement | null>(null);

  // 画像一覧
  const [images, setImages] = useRecoilState(imagesState);
  // 試合日程一覧
  const [schedules, setSchedules] = useRecoilState(scheduleState);
  // loading表示
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // スクロールトップボタンの表示状態
  const [showScrollTop, setShowScrollTop] = useState(false);

  // API呼び出し
  useEffect(() => {
    const loadImages = async () => {
      try {
        const firstData = await fetchFirstImage();
        setImages(firstData);
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
        setIsLoading(false);
      } catch (err) {
        console.log("日程取得エラー:", err);
      }
    };
    if (schedules?.length === 0) {
      fetchSchedules();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const isScrolled = scrollTop > 1;

      if (!footerRef.current) return;

      const footerRect = footerRef.current.getBoundingClientRect();
      const isFooterVisible = footerRect.top < window.innerHeight;

      setShowScrollTop(isScrolled && !isFooterVisible);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          {/* メインコンテンツエリア - ヘッダーの高さ分のパディングを追加 */}
          <div className="pt-20">
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
          </div>
          <Footer ref={footerRef} />
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
      {showScrollTop && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.div
            className="relative group cursor-pointer"
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {/* グロー効果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

            {/* メインボタン */}
            <div className="relative bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 p-3 rounded-full shadow-xl border border-green-400/30 backdrop-blur-sm group-hover:from-green-400 group-hover:to-emerald-600 transition-all duration-300">
              {/* 内部グラデーション */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 rounded-full"></div>

              {/* ロゴ */}
              <div className="relative z-10">
                <Image
                  src={BichoLogo}
                  alt="トップに戻る"
                  height={32}
                  width={32}
                  className="min-w-8 min-h-8 drop-shadow-lg group-hover:scale-110 transition-transform duration-200"
                />
              </div>

              {/* ホバー時のリップル効果 */}
              <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
            </div>

            {/* ツールチップ */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden lg:block">
              <div className="bg-neutral-900/95 backdrop-blur-sm text-white-1 text-sm font-medium px-3 py-1.5 rounded-lg shadow-xl border border-green-400/20 whitespace-nowrap">
                トップに戻る
                <div className="absolute top-full right-3 w-0 h-0 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent border-t-neutral-900/95"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;

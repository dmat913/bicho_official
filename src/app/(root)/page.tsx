"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { motion, AnimatePresence } from "framer-motion";
import { imagesState } from "@/recoil/atom/image";
import Footer from "@/components/layout/footer/Footer";
import { fetchFirstImage, fetchImages } from "@/utils/image";
import { scheduleState } from "@/recoil/atom/schedule";
import LeagueTable from "@/features/home/league-table/LeagueTable";
// import NavBar from "@/features/home/nav/NavBar";
import HomeLoading from "@/features/home/loading/HomeLoading";
// import VideoList from "@/features/home/youtube-video-list/VideoList";
import AboutBicho from "@/features/home/about-bicho/AboutBicho";
import PhotoSwiper from "@/features/home/photo-swiper/PhotoSwiper";
// import SoccerGround from "@/features/home/starting-lineup/SoccerGround";
import Article from "@/features/home/article/Article";
import BichoLogo from "@/public/bicho-icon.png";
import { DHamburgerMenu } from "@/components/elements/DHamburgerMenu";
import { menuItems } from "@/data/menuItems";
import { BichoLogoLink } from "@/components/elements/BichoLogoLink";
import Link from "next/link";
import GameSchedule from "@/features/home/game-schedule/GameSchedule";

const HomePage: React.FC = () => {
  const footerRef = useRef<HTMLElement | null>(null);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`relative ${isLoading ? "w-svw h-svh" : "h-full w-full"}`}>
      {/* メインコンテンツ */}
      {!isLoading && (
        <div className="w-full h-full relative">
          {/* ロゴ追加位置 - absolute配置 */}
          <div className="fixed top-4 left-4 z-50">
            <Link
              href="/"
              onClick={scrollToTop}
              className="group flex items-center gap-3 transition-all duration-300 hover:scale-105"
              title="FC.BICHO Official Site - ホームページ"
              aria-label="FC.BICHOのホームページに移動"
            >
              <Image
                src={BichoLogo}
                alt="BICHO Logo"
                width={80}
                height={80}
                className="transition-transform duration-300 rotate-6"
              />
            </Link>
          </div>

          {/* ハンバーガーメニュー追加位置 - absolute配置 */}
          <div className="fixed top-4 right-4 z-50">
            <DHamburgerMenu menuItems={menuItems} logo={<BichoLogoLink />} />
          </div>
          <AboutBicho />
          <GameSchedule />
          <LeagueTable />
          <PhotoSwiper />
          <Article />
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
    </div>
  );
};

export default HomePage;

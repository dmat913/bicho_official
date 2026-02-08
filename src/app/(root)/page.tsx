"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/layout/footer/Footer";
import LeagueTable from "@/features/home/league-table/LeagueTable";
import HomeLoading from "@/features/home/loading/HomeLoading";
import AboutBicho from "@/features/home/about-bicho/AboutBicho";
import PhotoSwiper from "@/features/home/photo-swiper/PhotoSwiper";
import Article from "@/features/home/article/Article";
import BichoLogo from "@/public/bicho-icon.png";
import { DHamburgerMenu } from "@/components/elements/DHamburgerMenu";
import { menuItems } from "@/data/menuItems";
import { BichoLogoLink } from "@/components/elements/BichoLogoLink";
import Link from "next/link";
import GameSchedule from "@/features/home/game-schedule/GameSchedule";
import NavLinks from "@/components/layout/header/NavLinks";
import { FC } from "react";
import { useImages } from "@/hooks/useImages";
import { useSchedules } from "@/hooks/useSchedules";

const HomePage: FC = () => {
  const { isLoading: imagesLoading } = useImages();
  const { isLoading: schedulesLoading } = useSchedules();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 全体のローディング状態
  const isLoading = imagesLoading || schedulesLoading;

  return (
    <div className={`relative ${isLoading ? "w-svw h-svh" : "h-full w-full"}`}>
      {/* メインコンテンツ */}
      {!isLoading && (
        <div className="w-full h-full relative">
          {/* ロゴ追加位置 - absolute配置 */}
          <div className="fixed top-4 left-4 z-50 flex items-center justify-between w-full px-4">
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
            <NavLinks />
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

"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { memo, useRef } from "react";
import backgroundImage from "@/public/background.jpeg";
import { Oswald, Noto_Sans_JP } from "next/font/google";

// フォントの読み込み
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-oswald",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans",
});

const AboutBicho = () => {
  // スクロール領域のためのRef
  const containerRef = useRef<HTMLDivElement>(null);

  // スクロールの進行度を取得 (0 -> 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // スムーズなスクロール値
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // アニメーション変数の定義

  // 背景: ズームアウト
  const bgScale = useTransform(smoothProgress, [0, 1], [1.1, 1]);
  // 暗くするオーバーレイ: コンテンツが見えるように最初から少し暗く、後半より暗く
  const bgOverlayOpacity = useTransform(smoothProgress, [0, 0.6], [0.4, 0.7]);

  const titleY = useTransform(smoothProgress, [0, 0.4], ["0%", "-50%"]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0]);

  const textY = useTransform(smoothProgress, [0.4, 0.8], ["100px", "0px"]);
  const textOpacity = useTransform(smoothProgress, [0.4, 0.7], [0, 1]);

  return (
    <div
      ref={containerRef}
      className={`relative h-[200vh] ${oswald.variable} ${notoSansJP.variable}`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage.src})` }}
          />
        </motion.div>

        <motion.div
          style={{ opacity: bgOverlayOpacity }}
          className="absolute inset-0 z-[1] bg-black"
        />

        {/* コンテンツレイヤー */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center">
          {/* Phase 1: タイトル + SINCE 2005 (統合) */}
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="absolute flex flex-col items-center justify-center gap-6"
          >
            <h2 className="text-7xl md:text-9xl font-bold text-white-1 tracking-tighter font-oswald text-center drop-shadow-2xl">
              FC BICHO
            </h2>

            {/* SINCE 2005: はっきりと表示 */}
            <h3 className="text-4xl md:text-5xl font-bold text-white-1 font-oswald tracking-[0.2em]">
              SINCE 2005
            </h3>

            {/* スクロール誘導インジケーター */}
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-[50vh] flex flex-col items-center gap-2"
            >
              <span className="text-[10px] text-white/50 tracking-[0.2em] font-oswald">
                SCROLL
              </span>
              <div className="w-px h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
            </motion.div>
          </motion.div>

          {/* Phase 2: メインテキスト (枠なし・読みやすく) */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="flex flex-col items-center gap-8 text-center px-4">
              <p
                className="text-2xl md:text-3xl lg:text-4xl text-white-1 font-bold font-noto-sans leading-relaxed tracking-wider"
                style={{
                  textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                }}
              >
                埼玉県川口市を拠点に活動する社会人サッカークラブです。2026シーズンより埼玉県2部リーグに所属し、新たな目標に向かって活動しています。
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default memo(AboutBicho);

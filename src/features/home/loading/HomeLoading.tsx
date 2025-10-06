"use client";
import BichoLogo from "@/public/bicho-icon.png";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { memo, useState, useEffect } from "react";

const HomeLoading = () => {
  const [loadingText, setLoadingText] = useState("");
  const [dots, setDots] = useState("");

  const fullText = "BICHO FC";
  const loadingMessages = [
    "Loading...",
    "準備中...",
    "もうすぐです...",
    "Welcome!",
  ];

  // テキストアニメーション効果
  useEffect(() => {
    let index = 0;
    const typeText = () => {
      if (index < fullText.length) {
        setLoadingText(fullText.slice(0, index + 1));
        index++;
        setTimeout(typeText, 150);
      }
    };

    const timer = setTimeout(typeText, 500);
    return () => clearTimeout(timer);
  }, []);

  // ドットアニメーション
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative w-full h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-950 overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 動的な背景パーティクル */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400/30 rounded-full"
            initial={{
              x: Math.random() * 1000,
              y: Math.random() * 800,
            }}
            animate={{
              x: Math.random() * 1000,
              y: Math.random() * 800,
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* メインローディングコンテンツ */}
      <div className="relative z-10 text-center">
        {/* ロゴ部分 - 大胆なアニメーション */}
        <motion.div
          className="relative mb-12"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 1.2,
            type: "spring",
            stiffness: 100,
            delay: 0.2,
          }}
        >
          {/* ロゴ背景のグロー効果 */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full blur-2xl opacity-60"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: 120,
              height: 120,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* 回転するリング */}
          <motion.div
            className="absolute inset-0 border-4 border-green-400 rounded-full"
            style={{
              width: 140,
              height: 140,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* 逆回転リング */}
          <motion.div
            className="absolute inset-0 border-2 border-green-300/50 rounded-full"
            style={{
              width: 160,
              height: 160,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            animate={{ rotate: -360 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* メインロゴ */}
          <motion.div
            className="relative bg-white rounded-3xl p-6 shadow-2xl"
            style={{ width: 100, height: 100 }}
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src={BichoLogo}
              alt="BICHO Logo"
              width={70}
              height={70}
              className="object-contain"
            />
          </motion.div>
        </motion.div>

        {/* タイポグラフィアニメーション */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-8"
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-wider mb-4"
            style={{
              textShadow: "0 0 30px rgba(74, 222, 128, 0.5)",
            }}
          >
            {loadingText}
            <motion.span
              className="text-green-400"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              |
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-green-300 text-lg md:text-xl font-semibold tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            FOOTBALL CLUB
          </motion.p>
        </motion.div>

        {/* ローディングバー */}
        <motion.div
          className="relative w-80 h-2 bg-green-900/50 rounded-full mx-auto mb-6 overflow-hidden"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 320 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full shadow-lg"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />

          {/* プログレスバーのグロー効果 */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-green-300 rounded-full opacity-50 blur-sm"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />
        </motion.div>

        {/* ローディングメッセージ */}
        <motion.div
          className="text-green-200 text-lg font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={
                loadingMessages[
                  Math.floor(Date.now() / 2000) % loadingMessages.length
                ]
              }
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {
                loadingMessages[
                  Math.floor(Date.now() / 2000) % loadingMessages.length
                ]
              }
              <span className="text-green-400">{dots}</span>
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* サブメッセージ */}
        <motion.p
          className="text-green-400/70 text-sm mt-4 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          埼玉県川口市を拠点とするサッカークラブ
        </motion.p>
      </div>

      {/* コーナーの装飾要素 */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 border-l-4 border-t-4 border-green-400/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 border-r-4 border-t-4 border-green-400/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-20 h-20 border-l-4 border-b-4 border-green-400/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-20 h-20 border-r-4 border-b-4 border-green-400/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      />

      {/* 背景の波状効果 */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-600/20 to-transparent"
        animate={{
          scaleY: [1, 1.5, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default memo(HomeLoading);

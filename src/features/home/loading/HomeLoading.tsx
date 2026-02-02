"use client";

import BichoLogo from "@/public/bicho-icon.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { memo } from "react";

const HomeLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-slate-950">
      {/* 背景のエフェクト - 深みのあるグラデーションと微細なグリッド */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-slate-950 to-slate-950" />

      {/* グリッドパターン（CSSで擬似的に作成するか、SVGを使うのが一般的だがここではシンプルなドットで代用） */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-4 lg:gap-8 ">
        {/* ロゴコンテナ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-12"
        >
          {/* 外側のゆっくり回転するリング */}
          <motion.div
            className="absolute -inset-12 rounded-full border border-white/5"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* 内側のアクセントリング */}
          <motion.div
            className="absolute -inset-12 rounded-full border border-transparent border-t-green-500/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* 逆回転する装飾リング */}
          <motion.div
            className="absolute -inset-[3.25rem] rounded-full border border-transparent border-b-white/10"
            animate={{ rotate: -180 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />

          {/* ロゴのバックライト（グロー効果） */}
          <motion.div
            className="absolute inset-0 bg-green-500/30 blur-2xl rounded-full"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* 波紋エフェクト (Ripple) */}
          <motion.div
            className="absolute inset-0 rounded-full border border-green-500/20"
            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-green-400/10"
            animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
            transition={{
              duration: 2,
              delay: 0.4,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          {/* ロゴ本体 */}
          <motion.div
            className="relative h-32 w-32 overflow-hidden rounded-full bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-6 backdrop-blur-md ring-1 ring-white/10 shadow-2xl"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative h-full w-full">
              <Image
                src={BichoLogo}
                alt="BICHO FC Logo"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </motion.div>
        </motion.div>

        {/* テキストエリア */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-3xl font-light tracking-[0.4em] text-white-1 pl-[0.4em]"
            >
              BICHO FC
            </motion.h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-green-500/50" />
            <span className="text-xs font-medium tracking-[0.2em] text-green-500/80 uppercase">
              Official Website
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-green-500/50" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(HomeLoading);

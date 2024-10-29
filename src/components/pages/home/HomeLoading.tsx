"use client";
import BichoLogo from "@/public/bicho-icon.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { memo } from "react";

const HomeLoading = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 1,
        yoyo: Infinity, // 拡大縮小を繰り返す
      }}
      className="w-full h-full bg-noise-green-3 flex items-center justify-center"
    >
      {/* アイコンを真ん中に固定表示 */}
      <Image
        src={BichoLogo}
        alt="Loading Icon"
        height={100}
        width={100}
        className="animate-bounceSlow"
      />
    </motion.div>
  );
};

export default memo(HomeLoading);

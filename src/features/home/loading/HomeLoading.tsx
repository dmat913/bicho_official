"use client";
import BichoLogo from "@/public/bicho-icon.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { memo } from "react";

const HomeLoading = () => {
  return (
    <motion.div className="w-full h-full bg-noise-green-3 flex items-center justify-center">
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

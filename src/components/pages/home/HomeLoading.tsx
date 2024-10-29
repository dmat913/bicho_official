"use client";
import BichoLogo from "@/public/bicho-icon.png";
import Image from "next/image";
import { memo } from "react";

const HomeLoading = () => {
  return (
    <div className="w-full h-full bg-noise-green-3 flex items-center justify-center">
      {/* アイコンを真ん中に固定表示 */}
      <Image
        src={BichoLogo}
        alt="Loading Icon"
        height={80}
        width={80}
        className="animate-bounceSlow"
      />
    </div>
  );
};

export default memo(HomeLoading);

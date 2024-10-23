"use client";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import BichoLogo from "@/public/bicho-icon.png";
import DHorizontalLine from "../elements/DHorizontalLine";
import { useState } from "react";
import YoutubeLogo from "@/public/youtube.png";

const Footer = () => {
  // 一番上までスクロールする関数
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // アイコンの状態を管理
  const [isInstagramActive, setInstagramActive] = useState<boolean>(false);
  const [isYoutubeActive, setYoutubeActive] = useState<boolean>(false);

  return (
    <footer className="bg-green-4 text-white-1">
      {/* BichoLogoを表示 */}
      <div
        className="flex items-center w-full py-3 justify-center cursor-pointer active:bg-green-3"
        onClick={scrollToTop}
      >
        <Image src={BichoLogo} alt="Bicho Logo" width={50} height={50} />
        <span className="ml-2 text-lg font-bold">BICHO</span>
      </div>
      <DHorizontalLine />
      <div className="flex items-center h-10">
        <button
          onClick={() => {
            window.open("https://www.instagram.com/fc_bicho", "_blank");
            scrollToTop();
          }}
          className="transition-colors h-full flex items-center gap-2 justify-center flex-1 active:bg-green-3"
          aria-label="Instagram"
          onMouseDown={() => setInstagramActive(true)}
          onMouseUp={() => setInstagramActive(false)}
          onTouchStart={() => setInstagramActive(true)}
          onTouchEnd={() => setInstagramActive(false)}
        >
          <FaInstagram
            size={24}
            color={isInstagramActive ? "#C13584" : "white"}
          />
          <span>Instagram</span>
        </button>

        {/* ボーダー */}
        <div className="h-10 border-l border-line-1" />

        <button
          onClick={() => {
            window.open("https://www.youtube.com/@MAN-rw5zg", "_blank");
            scrollToTop();
          }}
          className="transition-colors h-full flex items-center gap-2 justify-center flex-1
          
active:bg-green-3"
          onMouseDown={() => setYoutubeActive(true)}
          onMouseUp={() => setYoutubeActive(false)}
          onTouchStart={() => setYoutubeActive(true)}
          onTouchEnd={() => setYoutubeActive(false)}
          aria-label="YouTube"
        >
          {isYoutubeActive ? (
            <Image
              src={YoutubeLogo}
              alt="Youtube Logo"
              width={24}
              height={24}
            />
          ) : (
            <FaYoutube size={24} />
          )}
          <span>Youtube</span>
        </button>
      </div>

      <DHorizontalLine />
      <div className="w-full text-center bg-green-4 py-3">
        <span className="text-xs">© 2024 Bicho. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;

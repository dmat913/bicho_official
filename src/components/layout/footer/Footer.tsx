"use client";

import { FaInstagram, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import BichoLogo from "@/public/bicho-icon.png";
import { useState, forwardRef } from "react";
import YoutubeLogo from "@/public/youtube.png";
import DHorizontalLine from "@/components/elements/DHorizontalLine";

const Footer = forwardRef<HTMLElement>((_, ref) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isInstagramActive, setInstagramActive] = useState(false);
  const [isYoutubeActive, setYoutubeActive] = useState(false);

  return (
    <footer
      ref={ref}
      className="bg-gradient-to-r from-green-1 via-noise-green-3 to-green-3 text-white-1"
    >
      {/* ロゴとタイトル */}
      <div
        className="flex items-center w-full py-3 justify-center cursor-pointer active:bg-green-3"
        onClick={scrollToTop}
      >
        <Image src={BichoLogo} alt="Bicho Logo" width={50} height={50} />
        <span className="ml-2 text-lg font-bold">BICHO</span>
      </div>

      <DHorizontalLine />

      {/* SNSボタン */}
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

        <div className="h-10 border-l border-line-1" />

        <button
          onClick={() => {
            window.open("https://www.youtube.com/@ビッチョ", "_blank");
            scrollToTop();
          }}
          className="transition-colors h-full flex items-center gap-2 justify-center flex-1 active:bg-green-3"
          aria-label="YouTube"
          onMouseDown={() => setYoutubeActive(true)}
          onMouseUp={() => setYoutubeActive(false)}
          onTouchStart={() => setYoutubeActive(true)}
          onTouchEnd={() => setYoutubeActive(false)}
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

      <div className="w-full text-center py-3">
        <span className="text-xs">© 2025 Bicho. All rights reserved.</span>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;

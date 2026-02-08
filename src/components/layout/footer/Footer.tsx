"use client";

import {
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaChevronUp,
} from "react-icons/fa";
import Image from "next/image";
import BichoLogo from "@/public/bicho-icon.png";
import { useState } from "react";
import YoutubeLogo from "@/public/youtube.png";
import Link from "next/link";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isInstagramActive, setInstagramActive] = useState(false);
  const [isYoutubeActive, setYoutubeActive] = useState(false);

  return (
    <footer className="relative z-50 bg-neutral-900 text-white-1 pt-12 pb-6 overflow-hidden border-t-4 border-green-600">
      {/* 装飾背景 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-green-500 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-50%] left-[-10%] w-[400px] h-[400px] bg-green-700 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          {/* ロゴとブランド */}
          <div
            onClick={scrollToTop}
            className="flex flex-col items-center md:items-start cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Image
                  src={BichoLogo}
                  alt="Bicho Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-widest text-white-1">
                  BICHO
                </span>
                <span className="text-xs text-green-400 font-bold tracking-wide">
                  OFFICIAL SITE
                </span>
              </div>
            </div>
          </div>

          {/* ナビゲーション・アクション */}
          <div className="flex flex-wrap justify-center gap-6">
            {/* Instagram */}
            <button
              onClick={() => {
                window.open("https://www.instagram.com/fc_bicho", "_blank");
              }}
              className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 px-5 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(193,53,132,0.5)] border border-neutral-700 group"
              onMouseDown={() => setInstagramActive(true)}
              onMouseUp={() => setInstagramActive(false)}
              onTouchStart={() => setInstagramActive(true)}
              onTouchEnd={() => setInstagramActive(false)}
            >
              <FaInstagram
                size={20}
                className={`transition-colors duration-300 ${
                  isInstagramActive
                    ? "text-[#C13584]"
                    : "text-gray-300 group-hover:text-[#C13584]"
                }`}
              />
              <span className="font-medium text-sm">Instagram</span>
            </button>

            {/* YouTube */}
            <button
              onClick={() => {
                window.open("https://www.youtube.com/@ビッチョ", "_blank");
              }}
              className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 px-5 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.5)] border border-neutral-700 group"
              onMouseDown={() => setYoutubeActive(true)}
              onMouseUp={() => setYoutubeActive(false)}
              onTouchStart={() => setYoutubeActive(true)}
              onTouchEnd={() => setYoutubeActive(false)}
            >
              {isYoutubeActive ? (
                <div className="relative w-5 h-5">
                  <Image
                    src={YoutubeLogo}
                    alt="Youtube Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <FaYoutube
                  size={20}
                  className="text-gray-300 group-hover:text-[#FF0000] transition-colors"
                />
              )}
              <span className="font-medium text-sm">YouTube</span>
            </button>

            {/* Contact */}
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white-1 px-5 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] font-bold group"
            >
              <FaEnvelope size={18} />
              <span className="text-sm">お問い合わせ</span>
            </Link>
          </div>
        </div>

        {/* 区切り線 */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent mb-6" />

        {/* コピーライトとトップに戻る */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-400 text-xs">
          <p>© 2026 FC.BICHO. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-green-400 transition-colors group p-2"
          >
            <span>Back to Top</span>
            <FaChevronUp className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

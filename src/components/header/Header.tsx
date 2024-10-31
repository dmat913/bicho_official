import Image from "next/image";
import React, { useState, useEffect } from "react";
import BichoLogo from "@/public/bicho-icon.png";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // メニューの表示/非表示を切り替える関数
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // モーダルが開いているときにスクロールを無効化
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // クリーンアップ関数で元に戻す
    return () => {
      document.body.style.overflow = "auto";
    };
    // eslint-disable-next-line
  }, [menuOpen]);

  return (
    <header className="flex items-center justify-between bg-noise-green-3 py-2 px-4 border-b border-slate-400 shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* ロゴリンク */}
      <Link href="/" className="flex items-center gap-1">
        <Image src={BichoLogo} alt="Logo" width={40} height={40} />
        <span className="text-white-1 text-lg lg:text-2xl font-bold">
          BICHO
        </span>
      </Link>

      {/* ハンバーガーメニューアイコン */}
      <button
        className="text-white-1 text-2xl lg:hidden p-2 rounded-full active:bg-slate-600 transition duration-200"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <FaBars />
      </button>

      {/* モーダルメニュー */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* 背景のオーバーレイ */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-10"
              onClick={toggleMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* モーダルの内容 */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-64 bg-noise-green-3 opacity-95 text-white-1 shadow-lg z-20"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                className="absolute top-4 right-4 text-white-1 text-2xl w-10 h-10 rounded-full bg-green-2 active:bg-slate-600 transition duration-200"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                ×
              </button>
              <div className="flex flex-col items-center gap-6 p-8 mt-8">
                <Link
                  href="/schedule"
                  className="block w-full text-center p-4 bg-green-2 rounded-lg active:bg-slate-600 transition duration-200"
                >
                  試合日程
                </Link>
                <Link
                  href="/profile"
                  className="block w-full text-center p-4 bg-green-2 rounded-lg active:bg-slate-600 transition duration-200"
                >
                  選手
                </Link>
                <Link
                  href="/admin/photo"
                  className="block w-full text-center p-4 bg-green-2 rounded-lg active:bg-slate-600 transition duration-200"
                >
                  写真管理
                </Link>
                <Link
                  href="/admin/schedule"
                  className="block w-full text-center p-4 bg-green-2 rounded-lg active:bg-slate-600 transition duration-200"
                >
                  試合日程管理
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

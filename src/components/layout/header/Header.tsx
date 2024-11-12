import Image from "next/image";
import React, { useState, useEffect, memo } from "react";
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

  // リスト化されたメニューアイテム
  const menuItems = [
    { href: "/schedule", label: "試合日程" },
    { href: "/profile", label: "選手" },
    { href: "/data", label: "データ" },
    { href: "/admin/photo", label: "写真管理" },
    { href: "/admin/schedule", label: "試合日程管理" },
  ];

  return (
    <>
      <header className="flex items-center justify-between bg-gradient-to-r from-green-1 via-noise-green-3 to-green-3 bg-noise-pattern py-2 px-4 border-b border-line-1 shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
        {/* ロゴリンク */}
        <Link href="/" className="flex items-center gap-1">
          <Image src={BichoLogo} alt="Logo" width={48} height={48} />
          <span className="text-white-1 text-2xl lg:text-2xl font-bold">
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
      </header>

      {/* モーダルメニュー */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* 背景のオーバーレイ（ぼかし効果付き） */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md z-50"
              onClick={toggleMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* モーダルの内容 */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white-1 shadow-xl rounded-l-3xl overflow-hidden transform z-50"
              initial={{ x: "100%", scale: 0.95 }}
              animate={{ x: 0, scale: 1 }}
              exit={{ x: "100%", scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                className="absolute top-6 right-6 text-white-1 text-3xl w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 active:bg-gray-600 transition duration-200"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                ×
              </button>
              <div className="flex flex-col items-center gap-6 p-8 mt-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block w-full text-center p-4 bg-gray-700 text-white-1 border-2 border-transparent hover:border-gray-500 rounded-lg hover:bg-gray-600 active:bg-gray-500 transition duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Header);

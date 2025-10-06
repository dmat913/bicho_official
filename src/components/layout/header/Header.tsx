import Image from "next/image";
import React, { useState, useEffect, memo } from "react";
import BichoLogo from "@/public/bicho-icon.png";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const pathname = usePathname();
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
    { href: "/", label: "HOME", icon: "🏠" },
    { href: "/schedule", label: "SCHEDULE", icon: "📅" },
    { href: "/profile", label: "MEMBER", icon: "👥" },
    { href: "/data", label: "DATA", icon: "📊" },
    { href: "/admin/photo", label: "PROFILE/管理", icon: "🖼️" },
    { href: "/admin/schedule", label: "SCHEDULE/管理", icon: "⚙️" },
  ];

  const BichoLink = () => (
    <Link
      href="/"
      className="group flex items-center gap-3 transition-all duration-300 hover:scale-105"
    >
      <div className="relative">
        {/* ロゴ背景のグロー効果 */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative bg-white-2 rounded-2xl p-2 shadow-xl group-hover:shadow-2xl transition-all duration-300">
          <Image
            src={BichoLogo}
            alt="BICHO Logo"
            width={40}
            height={40}
            className="transition-transform duration-300 group-hover:rotate-6"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-white-2 font-bold text-2xl lg:text-3xl tracking-tight leading-none drop-shadow-lg">
          BICHO
        </span>
        <span className="text-green-200 text-xs font-bold hidden sm:block tracking-widest uppercase">
          FOOTBALL CLUB
        </span>
      </div>
    </Link>
  );

  return (
    <>
      {/* 力強いモダンヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* メインヘッダー背景 - 濃い緑でソリッド */}
        <div className="bg-gradient-to-r from-green-800 to-green-700 shadow-2xl border-b-4 border-green-400">
          {/* 上部のアクセントライン */}
          <div className="h-1 bg-gradient-to-r from-green-400 via-green-300 to-green-400" />

          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              {/* ロゴ部分 */}
              <BichoLink />

              {/* デスクトップナビゲーション */}
              <nav className="hidden lg:flex items-center gap-2">
                {menuItems.map((item) => (
                  <Link
                    href={item.href}
                    key={item.href}
                    className="group relative"
                  >
                    <div
                      className={`
                      relative px-6 py-3 rounded-2xl font-bold text-sm lg:text-base
                      transition-all duration-300 transform hover:scale-105 z-10
                      ${
                        pathname === item.href
                          ? "bg-green-500 text-white-2 shadow-xl shadow-green-500/50"
                          : "text-green-100 hover:bg-green-600 hover:text-white-2 hover:shadow-lg"
                      }
                    `}
                    >
                      <span className="relative z-30 tracking-wide text-inherit">
                        {item.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </nav>

              {/* モバイルメニューボタン - より目立つデザイン */}
              <button
                className="lg:hidden relative p-4 rounded-2xl bg-green-600 hover:bg-green-500 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
                onClick={toggleMenu}
                aria-label="メニューを開く"
              >
                <FaBars className="text-white-2 text-xl" />
                {/* ボタンのグロー効果 */}
                <div className="absolute inset-0 rounded-2xl bg-green-400 opacity-0 hover:opacity-30 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 力強いモバイルメニュー */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* 濃い背景オーバーレイ */}
            <motion.div
              className="absolute inset-0 bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />

            {/* メニューパネル - よりソリッドなデザイン */}
            <motion.div
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-gradient-to-br from-green-800 to-green-900 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              {/* 左側のアクセントライン */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 via-green-300 to-green-400" />

              <div className="flex flex-col h-full p-6 relative">
                {/* ヘッダー部分 */}
                <div className="flex items-center justify-between mb-10">
                  <BichoLink />
                  <button
                    onClick={toggleMenu}
                    className="p-3 rounded-2xl bg-green-700 hover:bg-green-600 shadow-xl transition-all duration-300 transform hover:scale-110"
                    aria-label="メニューを閉じる"
                  >
                    <IoClose className="text-white-2 text-2xl" />
                  </button>
                </div>

                {/* ナビゲーションメニュー */}
                <nav className="flex-1 space-y-3">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.4,
                        type: "spring",
                        stiffness: 300,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={toggleMenu}
                        className="group block"
                      >
                        <div
                          className={`
                          relative flex items-center gap-4 p-5 rounded-2xl transition-all duration-300
                          transform hover:scale-105 hover:translate-x-2 z-10
                          ${
                            pathname === item.href
                              ? "bg-green-500 shadow-xl shadow-green-500/50"
                              : "hover:bg-green-700 hover:shadow-lg"
                          }
                        `}
                        >
                          {/* アクティブ状態の背景 */}
                          {pathname === item.href && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl z-0"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}

                          {/* アイコン */}
                          <div className="relative z-20 flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-100/20 group-hover:bg-neutral-100/30 transition-colors duration-300">
                            <span className="text-2xl">{item.icon}</span>
                          </div>

                          {/* テキスト */}
                          <div className="relative z-20 flex flex-col flex-1">
                            <span className="font-bold text-xl text-white-2 tracking-wide">
                              {item.label}
                            </span>
                            {pathname === item.href && (
                              <motion.div
                                className="w-12 h-1 bg-green-300 rounded-full mt-2"
                                initial={{ width: 0 }}
                                animate={{ width: 48 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                              />
                            )}
                          </div>

                          {/* 右矢印アイコン */}
                          <div className="relative z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white-2 text-xl">→</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* フッター部分 - より目立つデザイン */}
                <div className="mt-8 p-6 rounded-2xl bg-green-900/50 border border-green-600/30">
                  <div className="text-center">
                    <p className="text-white-2 text-lg font-bold mb-1">
                      BICHO FC
                    </p>
                    <p className="text-green-300 text-sm font-medium">
                      © 2025 All rights reserved
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Header);

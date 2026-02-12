"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, SVGMotionProps } from "framer-motion";
import { usePathname } from "next/navigation";

// メニューアイテムの型定義
export type MenuItem = {
  href: string;
  label: string;
  icon: string;
  title: string;
};

interface DHamburgerMenuProps {
  menuItems: MenuItem[];
  logo: React.ReactNode;
}

// SVGパスのアニメーション用コンポーネント
const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

export const DHamburgerMenu = ({ menuItems, logo }: DHamburgerMenuProps) => {
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

  // メニューアイテムのアニメーション設定
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const itemVariants = {
    hidden: { x: 50, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <>
      <motion.div
        className="relative z-[120] flex items-center justify-center lg:hidden md:hidden"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          variants={{
            rest: { rotate: 0 },
            hover: { rotate: 360 },
          }}
          transition={{
            duration: 12,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              />
            </defs>
            <text className="fill-white-1 font-bold text-[10.5px] tracking-[0.25em] font-oswald uppercase">
              <textPath href="#circlePath">
                • MENU • FC BICHO • MENU • FC BICHO
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* コントラストを高めるための背面の暗いグロー */}
        <div className="absolute inset-0 bg-black/30 blur-xl rounded-full scale-75 pointer-events-none" />

        {/* 中心のボタン本体 (Soccer Ball Core) */}
        <motion.button
          onClick={toggleMenu}
          className={`
            relative flex items-center justify-center w-16 h-16 rounded-full 
            border-[2px] transition-all duration-300 shadow-2xl z-10 overflow-hidden
            ${
              menuOpen
                ? "bg-transparent border-white-1"
                : "bg-gradient-to-br from-green-900 via-black to-green-900 border-green-400/50 hover:border-green-400"
            }
          `}
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.1 },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {/* サッカーボールパターン (背景) */}
          {!menuOpen && (
            <motion.div
              className="absolute inset-0 opacity-40"
              variants={{
                rest: { rotate: 0, scale: 1 },
                hover: { rotate: 90, scale: 1.2 },
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full fill-none stroke-white-1 stroke-2"
              >
                {/* 抽象的なサッカーボールの幾何学模様 */}
                <path d="M50 20 L75 35 L75 65 L50 80 L25 65 L25 35 Z" />
                <path d="M50 20 L50 0" />
                <path d="M75 35 L95 25" />
                <path d="M75 65 L95 75" />
                <path d="M50 80 L50 100" />
                <path d="M25 65 L5 75" />
                <path d="M25 35 L5 25" />
                {/* 内部の五角形イメージ */}
                <circle
                  cx="50"
                  cy="50"
                  r="15"
                  className="fill-green-500/20 stroke-green-400"
                />
              </svg>
            </motion.div>
          )}

          {/* ハンバーガーアイコン */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 23 23"
            className={`z-20 transition-colors duration-300 drop-shadow-lg ${
              menuOpen ? "text-white-1" : "text-white-1"
            }`}
          >
            <Path
              variants={{
                closed: { d: "M 4 6 L 19 6" },
                open: { d: "M 3 16.5 L 17 2.5" },
              }}
              animate={menuOpen ? "open" : "closed"}
              strokeWidth="2.5"
            />
            <Path
              d="M 4 11.5 L 19 11.5"
              variants={{
                closed: { opacity: 1, x: 0 },
                open: { opacity: 0, x: -20 },
              }}
              transition={{ duration: 0.2 }}
              animate={menuOpen ? "open" : "closed"}
              strokeWidth="2.5"
            />
            <Path
              variants={{
                closed: { d: "M 4 17 L 19 17" },
                open: { d: "M 3 2.5 L 17 16.346" },
              }}
              animate={menuOpen ? "open" : "closed"}
              strokeWidth="2.5"
            />
          </svg>
        </motion.button>
      </motion.div>

      {/* フルスクリーンメニューオーバーレイ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[110] flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.3 } }}
          >
            {/* 背景の黒幕 (Backdrop) */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />

            {/* スライドインメニューパネル */}
            <motion.div
              className="relative h-full w-full max-w-md bg-gradient-to-b from-neutral-900 to-green-950 shadow-2xl flex flex-col overflow-hidden border-l border-white/10"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 0.8,
              }}
              style={{
                boxShadow:
                  "-10px 0 30px rgba(0,0,0,0.5), inset 1px 0 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* 装飾ライン */}
              <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-green-500 to-transparent opacity-50" />

              {/* 背景の巨大ロゴ（透かし） */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-green-600/20 to-transparent blur-3xl pointer-events-none" />
              <div className="absolute top-[-10%] left-[-10%] w-60 h-60 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

              {/* ヘッダーエリア */}
              <div className="p-8 pb-4 flex items-center justify-between border-b border-white/5 relative z-10">
                <div
                  onClick={toggleMenu}
                  className="scale-90 origin-left opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  {logo}
                </div>
              </div>

              {/* メニューリスト */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative z-10">
                <motion.nav
                  className="flex flex-col gap-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.div key={item.href} variants={itemVariants}>
                        <Link
                          href={item.href}
                          onClick={toggleMenu}
                          className="group relative block"
                          title={item.title}
                        >
                          <div
                            className={`
                            relative flex items-center p-4 rounded-xl transition-all duration-300
                            border 
                            ${
                              isActive
                                ? "bg-white/10 border-green-500/30"
                                : "hover:bg-white/5 border-transparent hover:border-white/10"
                            }
                          `}
                          >
                            {/* アイコン背景 */}
                            <div
                              className={`
                                flex items-center justify-center w-12 h-12 rounded-lg mr-4 text-2xl
                                transition-all duration-300
                                ${isActive ? "bg-green-500 text-white-1 shadow-lg shadow-green-500/20" : "bg-neutral-800 text-neutral-400 group-hover:text-white group-hover:bg-neutral-700"}
                            `}
                            >
                              {item.icon}
                            </div>

                            {/* ラベル */}
                            <div className="flex flex-col flex-1">
                              <span
                                className={`
                                    text-lg font-bold tracking-wider transition-colors duration-300 font-oswald
                                    ${isActive ? "text-green-400" : "text-neutral-300 group-hover:text-white-1"}
                                `}
                              >
                                {item.label}
                              </span>
                            </div>
                            {isActive && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] mr-2"
                              />
                            )}

                            {/* ホバー時の矢印出現 */}
                            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                              <span className="text-white-1 text-xl font-light">
                                →
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.nav>
              </div>

              {/* フッターエリア */}
              <div className="p-8 pt-4 border-t border-white/5 relative z-10">
                <div className="flex flex-col gap-1 opacity-50 hover:opacity-80 transition-opacity">
                  <p className="text-xs text-white-1 tracking-widest font-light">
                    OFFICIAL WEBSITE
                  </p>
                  <h3 className="text-xl font-bold text-white-1 tracking-tighter">
                    FC BICHO
                  </h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

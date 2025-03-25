import Image from "next/image";
import React, { useState, useEffect, memo } from "react";
import BichoLogo from "@/public/bicho-icon.png";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

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
    { href: "/", label: "ホーム" },
    { href: "/schedule", label: "試合日程" },
    { href: "/profile", label: "登録選手" },
    { href: "/data", label: "データ" },
    { href: "/admin/photo", label: "写真管理" },
    { href: "/admin/schedule", label: "試合日程管理" },
  ];

  return (
    <>
      <header
        className={`flex items-center justify-between bg-gradient-to-r from-green-1 via-noise-green-3 to-green-3 bg-noise-pattern py-2 px-4 border-b border-line-1 shadow-lg hover:shadow-xl transition-shadow duration-300 relative ${
          pathname !== "/" && "sticky top-0 z-50"
        }`}
      >
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
              className="fixed top-0 right-0 bottom-0 w-80 bg-gradient-to-r from-green-1 via-noise-green-3 to-green-3 bg-noise-pattern text-white-1 shadow-xl rounded-l-xl overflow-hidden transform z-50"
              initial={{ x: "100%", scale: 0.95 }}
              animate={{ x: 0, scale: 1 }}
              exit={{ x: "100%", scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col items-center justify-between p-8 h-full w-full">
                <div className="flex flex-col gap-6 w-full">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="relative w-full group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-1 to-green-3 opacity-30 rounded-xl blur-sm"></div>
                      <div 
                        className="relative z-10 block w-full text-center p-4 text-white-1 
                          rounded-xl 
                          bg-gray-800/70 
                          backdrop-blur-md 
                          border border-white/20
                          transition duration-300
                          flex items-center justify-center
                          space-x-3
                          active:scale-95  // 押下時に少し縮小
                          will-change-transform  // パフォーマンス最適化"
                      >
                        <span className="flex-grow text-base font-medium tracking-wide">
                          {item.label}
                        </span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
                <button
                  onClick={toggleMenu}
                  className="relative w-full h-12 overflow-hidden rounded-xl 
                    bg-gradient-to-r from-green-3 to-green-1 
                    text-white-1 
                    flex items-center justify-center 
                    group
                    active:scale-95 
                    transition-all duration-300
                    shadow-md hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <span className="font-medium tracking-wider">閉じる</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Header);

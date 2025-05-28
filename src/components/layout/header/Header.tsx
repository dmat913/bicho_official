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
    { href: "/", label: "HOME" },
    { href: "/schedule", label: "SCHEDULE" },
    { href: "/profile", label: "MEMBER" },
    { href: "/data", label: "DATA" },
    { href: "/admin/photo", label: "PROFILE/管理" },
    { href: "/admin/schedule", label: "SCHEDULE/管理" },
  ];

  const BichoLink = () => (
    <Link href="/" className="flex items-center gap-1">
      <Image src={BichoLogo} alt="Logo" width={48} height={48} />
      <span className="text-white-1 text-xl lg:text-2xl font-bold">BICHO</span>
    </Link>
  );

  return (
    <>
      <header
        className={`flex items-center justify-between bg-gradient-to-r from-green-1 via-noise-green-3 to-green-3 bg-noise-pattern py-4 px-4 border-b border-line-1 shadow-lg hover:shadow-xl transition-shadow duration-300 sticky top-0 z-50 bg-transparent`}
      >
        <BichoLink />

        {/* ハンバーガーメニューアイコン */}
        <button
          className="text-white-1 text-2xl lg:hidden md:hidden p-2 rounded-full active:bg-slate-600 transition duration-200"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <FaBars />
        </button>
        <div className="items-center gap-4 hidden md:flex lg:flex">
          {menuItems.map((item) => (
            <Link href={item.href} key={item.href}>
              <span
                className={`font-bold text-white-1 ${
                  pathname === item.href && "text-gold-1"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </header>

      {/* モーダルメニュー */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-screen bg-black-1 text-white-1 shadow-xl rounded-l-xl overflow-hidden transform z-50"
            initial={{ x: "100%", scale: 0.95 }}
            animate={{ x: 0, scale: 1 }}
            exit={{ x: "100%", scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-col items-center gap-8 p-8 h-full w-full relative">
              <BichoLink />
              <IoClose
                onClick={toggleMenu}
                className="absolute right-4 top-8"
                size={40}
              />
              <div className="flex flex-col gap-2 w-full">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative w-full"
                  >
                    <div className="relative z-10 w-full p-2 text-white-1 rounded-xl">
                      <span
                        className={`flex-grow text-2xl lg:text-4xl font-bold ${
                          pathname === item.href && "text-gold-1"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Header);

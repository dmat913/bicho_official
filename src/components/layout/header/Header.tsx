import React, { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DHamburgerMenu } from "@/components/elements/DHamburgerMenu";
import { menuItems } from "@/data/menuItems";
import { BichoLogoLink } from "@/components/elements/BichoLogoLink";

const Header = () => {
  const pathname = usePathname();

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
              <BichoLogoLink />

              {/* デスクトップナビゲーション */}
              <nav className="hidden lg:flex items-center gap-2">
                {menuItems.map((item) => (
                  <Link
                    href={item.href}
                    key={item.href}
                    className="group relative"
                    title={item.title}
                    aria-label={item.title}
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

              <DHamburgerMenu menuItems={menuItems} logo={<BichoLogoLink />} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default memo(Header);

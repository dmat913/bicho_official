import React, { memo } from "react";
import { DHamburgerMenu } from "@/components/elements/DHamburgerMenu";
import { menuItems } from "@/data/menuItems";
import { BichoLogoLink } from "@/components/elements/BichoLogoLink";
import NavLinks from "./NavLinks";

const Header = () => {
  return (
    <>
      {/* 力強いモダンヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-[999]">
        {/* メインヘッダー背景 - 濃い緑でソリッド */}
        <div className="bg-gradient-to-r from-green-800 to-green-700 shadow-2xl border-b-4 border-green-400">
          {/* 上部のアクセントライン */}
          <div className="h-1 bg-gradient-to-r from-green-400 via-green-300 to-green-400" />

          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              {/* ロゴ部分 */}
              <BichoLogoLink />

              <DHamburgerMenu menuItems={menuItems} logo={<BichoLogoLink />} />
              {/* ナビゲーション */}
              <NavLinks />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default memo(Header);

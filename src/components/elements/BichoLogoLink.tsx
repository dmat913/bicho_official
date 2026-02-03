"use client";

import Image from "next/image";
import Link from "next/link";
import BichoLogo from "@/public/bicho-icon.png";
import React from "react";

interface BichoLogoLinkProps {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export const BichoLogoLink = ({
  onClick,
  className = "",
}: BichoLogoLinkProps) => (
  <Link
    href="/"
    onClick={onClick}
    className={`group flex items-center gap-3 transition-all duration-300 hover:scale-105 ${className}`}
    title="FC.BICHO Official Site - ホームページ"
    aria-label="FC.BICHOのホームページに移動"
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

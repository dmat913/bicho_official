"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "@/data/menuItems";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex lg:flex items-center gap-1">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            href={item.href}
            key={item.href}
            className="group relative px-4 py-2"
            title={item.title}
            aria-label={item.title}
          >
            {/* アクティブ/ホバー時の背景効果 */}
            <div
              className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-green-600/20"
                  : "bg-transparent group-hover:bg-white/5"
              }`}
            />

            {/* テキスト */}
            <span
              className={`relative z-10 text-sm font-bold tracking-wider transition-colors duration-300 ${
                isActive
                  ? "text-green-400"
                  : "text-gray-300 group-hover:text-white"
              }`}
            >
              {item.label}
            </span>

            {/* アクティブ時の下線 */}
            {isActive && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            )}

            {/* ホバー時の下線アニメーション（非アクティブ時のみ） */}
            {!isActive && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white/50 rounded-full transition-all duration-300 group-hover:w-1/2" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

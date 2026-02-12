"use client";

import Link from "next/link";
import { FiChevronRight, FiHome } from "react-icons/fi";

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      className="flex items-center gap-2 text-sm text-neutral-600 py-4 px-4 md:px-8 max-w-7xl mx-auto"
      aria-label="パンくずリスト"
    >
      {/* ホームアイコン */}
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-green-600 transition-colors"
        aria-label="ホームに戻る"
      >
        <FiHome className="text-base" />
        <span className="hidden sm:inline">ホーム</span>
      </Link>

      {/* パンくずリストアイテム */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.path} className="flex items-center gap-2">
            <FiChevronRight className="text-neutral-400 text-sm" />
            {isLast ? (
              <span className="font-medium text-green-700" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.path}
                className="hover:text-green-600 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

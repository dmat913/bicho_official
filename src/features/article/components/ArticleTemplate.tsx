"use client";

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaChevronLeft } from "react-icons/fa";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";

type Props = {
  title: string;
  date: string;
  category: string;
  imagePath?: string | StaticImageData;
  children: React.ReactNode;
};

const categoryColors: Record<string, string> = {
  match: "bg-blue-500",
  news: "bg-green-500",
  team: "bg-orange-500",
  event: "bg-purple-500",
  column: "bg-gray-500",
};

const categoryNames: Record<string, string> = {
  match: "試合結果",
  news: "お知らせ",
  team: "チーム情報",
  event: "イベント",
  column: "コラム",
};

export default function ArticleTemplate({
  title,
  date,
  category,
  imagePath,
  children,
}: Props) {
  const lowerCategory = category.toLowerCase();
  const bg = categoryColors[lowerCategory] || "bg-neutral-500";
  const catName = categoryNames[lowerCategory] || category;

  console.log(imagePath, "test");

  return (
    <>
      <Header />
      <article className="min-h-screen bg-neutral-50 pb-20">
        {/* ヒーローヘッダーエリア */}
        <div className="relative w-full h-[50vh] md:h-[60vh] min-h-[400px]">
          {imagePath ? (
            <Image
              src={imagePath}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-800 to-green-600" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent" />

          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white-1">
            <div className="container mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-bold text-white-1 shadow-sm ${bg}`}
                  >
                    {catName}
                  </span>
                  <div className="flex items-center text-neutral-300 text-sm">
                    <FaCalendarAlt className="mr-2" />
                    <time dateTime={date}>{date}</time>
                  </div>
                </div>

                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white-1 drop-shadow-lg">
                  {title}
                </h1>
              </motion.div>
            </div>
          </div>
        </div>

        {/* パンくずリスト & ナビゲーション */}
        <div className="bg-white border-b border-neutral-100 sticky top-[76px] z-20 shadow-sm">
          <div className="container mx-auto max-w-4xl px-4 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center text-neutral-500 hover:text-green-600 transition-colors text-sm font-medium"
            >
              <FaChevronLeft className="mr-1" />
              ホームに戻る
            </Link>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: title,
                      url: window.location.href,
                    });
                  }
                }}
                className="text-neutral-400 hover:text-neutral-600 transition-colors p-2"
                aria-label="Share"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 記事本文 */}
        <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-6 md:p-12 shadow-xl border border-neutral-100"
          >
            {children}
          </motion.div>
        </div>
      </article>
      <Footer />
    </>
  );
}

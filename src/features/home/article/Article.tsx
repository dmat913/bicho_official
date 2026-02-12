"use client";
import { motion, useInView } from "framer-motion";
import React, { memo, useRef } from "react";
import PickUpPhoto from "@/public/article/champion.jpeg";
import PickUp2Photo from "@/public/article/league2025.jpeg";
import PickUp3Photo from "@/public/article/league2024.jpeg";
import PickUp4Photo from "@/public/article/ club2024.jpeg";
import Image from "next/image";
import Link from "next/link";

// 記事データ（全ての記事を横スクロール用に統合）
const articles = [
  {
    id: 4,
    image: PickUp2Photo,
    date: "2025年10月5日",
    title: "2025年度埼玉県3部リーグ優勝",
    description:
      "FC.BICHOが2025年度埼玉県3部リーグで見事優勝を果たしました！悲願の3部リーグ制覇！",
    details: "Details: (S4) 2025年~",
    link: "/news/4",
  },
  {
    id: 3,
    image: PickUpPhoto,
    date: "2024年11月17日",
    title: "2024年度埼玉県南部ブロック決勝大会優勝",
    description:
      "FC.BICHOが2024年度埼玉県南部地区ブロックリーグ決勝大会で優勝！",
    details: "Details: (S3) 2024年11月 - 2025年3月",
    link: "/news/3",
  },
  {
    id: 2,
    image: PickUp3Photo,
    date: "2024年10月8日",
    title: "2024年度川口市リーグ,結果",
    description: "2024年度川口市リーグの結果をお知らせします。",
    details: "Details: (S2) 2024年4月 - 2024年10月",
    link: "/news/2",
  },
  {
    id: 1,
    image: PickUp4Photo,
    date: "2024年6月2日",
    title: "2024年度全国クラブチームサッカー選手権,結果",
    description:
      "2024年度全国クラブチームサッカー選手権の結果をお知らせします。",
    details: "Details: (S1) 2024年6月",
    link: "/news/1",
  },
];

// 横スクロール用カードコンポーネント
const ArticleCard = ({ article }: { article: (typeof articles)[0] }) => (
  <Link href={article.link} className="group block flex-shrink-0">
    <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black-1 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden w-[340px] sm:w-[400px] h-[480px] border-4 border-gray-700">
      {/* レトロTV風ヘッダー */}
      <div className="relative bg-gradient-to-r from-gray-700 to-gray-600 px-4 py-3 border-b-4 border-gray-800">
        <div className="flex items-center justify-between">
          {/* PICK UP バッジ */}
          <div className="relative p-[2px] rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            <div className="bg-black-1 px-4 py-1.5 rounded-sm">
              <span className="text-white-1 font-bold text-xs tracking-wider uppercase">
                PICK UP
              </span>
            </div>
          </div>

          {/* 日付 */}
          <div className="bg-black-1/60 backdrop-blur-sm px-3 py-1 rounded-md">
            <span className="text-gray-300 text-xs font-mono">
              {article.date}
            </span>
          </div>
        </div>
      </div>

      {/* 画像エリア */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-cyan-200 via-purple-200 to-pink-200">
        {article.image ? (
          <>
            <Image
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black-1/80 via-black-1/20 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">📰</div>
              <span className="text-gray-700 font-bold text-lg">NEWS</span>
            </div>
          </div>
        )}
      </div>

      {/* コンテンツエリア */}
      <div className="p-6 h-[calc(100%-12rem)]">
        <h3 className="text-xl font-bold text-white-1 leading-tight mb-4 line-clamp-2 group-hover:text-green-400 transition-colors duration-300">
          {article.title}
        </h3>

        <p className="text-gray-300 text-sm mb-4 line-clamp-4">
          {article.description}
        </p>

        {/* Details セクション */}
        <div className="absolute bottom-6 left-6 right-6">
          {/* View Site ボタン */}
          <div className="mt-3 flex justify-end">
            <div className="bg-gray-700 hover:bg-gray-600 transition-colors duration-300 px-4 py-2 rounded-lg flex items-center gap-2 group">
              <span className="text-white-1 text-xs font-bold uppercase tracking-wider">
                VIEW SITE
              </span>
              <svg
                className="w-4 h-4 text-white-1 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ホバーエフェクト */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-500/0 via-transparent to-green-400/0 group-hover:from-green-500/10 group-hover:to-green-400/10 transition-all duration-300 pointer-events-none rounded-2xl" />
    </div>
  </Link>
);

const Article = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="relative w-full bg-gradient-to-br from-neutral-900 via-gray-900 to-black-1 overflow-hidden">
      {/* ドットパターン背景 */}
      <div className="absolute inset-0 opacity-30 article-dot-pattern" />

      {/* 背景装飾 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl">
        {/* タイトルセクション */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* スクロールするタイトル（左から右へ） */}
          <div className="relative overflow-hidden bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 py-6 mb-6 shadow-lg">
            <div className="flex whitespace-nowrap">
              <div className="flex animate-marquee-reverse">
                {[...Array(15)].map((_, i) => (
                  <span
                    key={i}
                    className="text-green-400 font-display font-black text-4xl lg:text-5xl mx-8 tracking-wider uppercase article-text-shadow"
                  >
                    News
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 横スクロールコンテナ */}
        <motion.div
          className="relative px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* 横スクロール可能なカードリスト */}
          <div className="overflow-x-auto overflow-y-hidden  pb-8 -mx-4 px-4 scrollbar-custom">
            <div className="flex gap-6 w-max">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(Article);

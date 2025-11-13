import { motion, useInView } from "framer-motion";
import React, { memo, useRef } from "react";
import PickUpPhoto from "@/public/article/champion.jpeg";
import PickUp2Photo from "@/public/article/league2025.jpeg";
import Image from "next/image";
import Link from "next/link";

// メイン記事データ
const mainArticles = [
  {
    id: 4,
    image: PickUp2Photo,
    date: "2025年10月5日",
    title: "2025年度埼玉県3部リーグ優勝のお知らせ",
    description: "FC.BICHOが2025年度埼玉県3部リーグで見事優勝を果たしました！",
    link: "/article?no=4",
  },
  {
    id: 3,
    image: PickUpPhoto,
    date: "2024年11月17日",
    title: "2024年度埼玉県南部ブロック決勝大会優勝のお知らせ",
    description:
      "FC.BICHOが2024年度埼玉県南部地区ブロックリーグ決勝大会で見事優勝を果たしました！",
    link: "/article?no=3",
  },
];

// サブ記事データ
const subArticles = [
  {
    id: 2,
    date: "2024年10月8日",
    title: "2024年度川口市リーグ,結果",
    link: "/article?no=2",
  },
  {
    id: 1,
    date: "2024年6月2日",
    title: "2024年度全国クラブチームサッカー選手権,結果",
    link: "/article?no=1",
  },
];

// メイン記事カード
const MainArticleCard = ({
  article,
}: {
  article: (typeof mainArticles)[0];
}) => (
  <Link href={article.link} className="group block">
    <div className="relative bg-white-1 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-[1.02]">
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src={article.image}
          alt="優勝記事"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black-1/60 via-black-1/20 to-transparent" />
        <div className="absolute top-6 left-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-gold to-yellow-400 text-white-2 px-4 py-2 rounded-full font-bold text-sm shadow-lg">
            <span className="text-lg">⭐</span>
            PICK UP
          </div>
        </div>
        <div className="absolute top-6 right-6">
          <div className="bg-white-1/90 backdrop-blur-sm text-neutral-700 px-3 py-1 rounded-full text-sm font-medium">
            {article.date}
          </div>
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1 bg-green-500 text-white-2 px-3 py-1 rounded-full text-xs font-bold">
            <span>📰</span>
            NEWS
          </span>
          <span className="text-green-600 text-sm font-medium">
            🏆 優勝のお知らせ
          </span>
        </div>
        <h3 className="text-xl lg:text-2xl font-bold text-neutral-800 leading-tight group-hover:text-green-600 transition-colors duration-300">
          {article.title}
        </h3>
        <p className="text-neutral-600 mt-3 text-sm lg:text-base line-clamp-2">
          {article.description}
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-green-500/0 via-transparent to-green-400/0 group-hover:from-green-500/5 group-hover:to-green-400/5 transition-all duration-300 pointer-events-none rounded-3xl" />
    </div>
  </Link>
);

// サブ記事カード
const SubArticleCard = ({
  article,
  delay = 0,
}: {
  article: (typeof subArticles)[0];
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: delay === 0 ? -30 : 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: delay === 0 ? 0.8 : 1.0 }}
  >
    <Link href={article.link} className="group block">
      <div className="bg-white-1 rounded-2xl shadow-medium hover:shadow-strong transition-all duration-300 overflow-hidden transform hover:scale-105">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1 bg-green-500 text-white-2 px-3 py-1 rounded-full text-xs font-bold">
              <span>📰</span>
              NEWS
            </span>
            <span className="text-neutral-500 text-xs">{article.date}</span>
          </div>
          <h4 className="text-lg font-bold text-neutral-800 leading-tight group-hover:text-green-600 transition-colors duration-300 mb-2">
            {article.title}
          </h4>
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
            <span className="text-neutral-500 text-sm">詳細を見る</span>
            <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300">
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);
const Article = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="relative w-full px-4 py-16 bg-gradient-to-br from-neutral-50 to-green-50 overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20" />
      <div className="absolute top-20 right-20 w-32 h-32 bg-green-200/30 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent-gold/20 rounded-full blur-xl" />

      <div className="relative section-container max-w-6xl mx-auto">
        {/* モダンなタイトルセクション */}
        <motion.div
          ref={ref}
          className="text-center mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-accent-gold rounded-full" />
            <span className="text-green-700 font-medium text-sm tracking-widest uppercase">
              Latest News
            </span>
            <div className="w-16 h-1 bg-gradient-to-r from-accent-gold to-green-400 rounded-full" />
          </div>
          <motion.p
            className="text-neutral-600 font-semibold text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            ニュース/お知らせ
          </motion.p>
        </motion.div>
        {/* メイン記事 (フィーチャー記事) */}
        {mainArticles.map((article) => (
          <motion.div
            key={article.id}
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MainArticleCard article={article} />
          </motion.div>
        ))}
        {/* サブ記事一覧 */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="mb-8">
            <h3 className="text-neutral-700 font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-green-500 rounded-full"></div>
              その他のニュース
            </h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {subArticles.map((article, idx) => (
              <SubArticleCard key={article.id} article={article} delay={idx} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(Article);

"use client";

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

// セクション（余白用）
export const ArticleSection = ({ children }: { children: React.ReactNode }) => (
  <section className="mb-12 last:mb-0">{children}</section>
);

// 見出し H2
export const ArticleH2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mt-12 mb-6 border-l-8 border-green-500 pl-4 py-1 bg-green-50/50 rounded-r-lg">
    {children}
  </h2>
);

// 見出し H3
export const ArticleH3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl md:text-2xl font-bold text-green-800 mt-8 mb-4 flex items-center gap-2">
    <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
    {children}
  </h3>
);

// 本文 P
export const ArticleP = ({ children }: { children: React.ReactNode }) => (
  <p className="text-neutral-700 leading-relaxed mb-6 text-base md:text-lg tracking-wide">
    {children}
  </p>
);

// 画像
export const ArticleImage = ({
  src,
  alt,
  caption,
}: {
  src: string | StaticImageData;
  alt: string;
  caption?: string;
}) => (
  <figure className="my-8">
    <div className="relative rounded-xl overflow-hidden shadow-lg group">
      <Image
        src={src}
        alt={alt}
        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        width={1200}
        height={800}
      />
    </div>
    {caption && (
      <figcaption className="text-center text-sm text-neutral-500 mt-3 font-medium">
        {caption}
      </figcaption>
    )}
  </figure>
);

// 試合結果テーブル
type MatchData = {
  round: string;
  date: string;
  opponent: string;
  result: string;
  scorers?: string;
  type: "win" | "loss" | "draw";
};

export const MatchResultTable = ({ matches }: { matches: MatchData[] }) => (
  <div className="overflow-x-auto my-8 rounded-xl shadow-md border border-neutral-200">
    <table className="w-full text-sm text-left">
      <thead className="text-xs text-neutral-700 uppercase bg-neutral-100 border-b border-neutral-200">
        <tr>
          <th className="px-4 py-3 whitespace-nowrap">節/回戦</th>
          <th className="px-4 py-3 whitespace-nowrap">日付</th>
          <th className="px-4 py-3 whitespace-nowrap">対戦相手</th>
          <th className="px-4 py-3 whitespace-nowrap">結果</th>
          <th className="px-4 py-3">得点者</th>
        </tr>
      </thead>
      <tbody>
        {matches.map((match, index) => (
          <motion.tr
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="bg-white border-b hover:bg-neutral-50 last:border-0"
          >
            <td className="px-4 py-3 font-medium text-neutral-900">
              {match.round}
            </td>
            <td className="px-4 py-3 text-neutral-600 whitespace-nowrap">
              {match.date}
            </td>
            <td className="px-4 py-3 font-semibold">{match.opponent}</td>
            <td className="px-4 py-3">
              <span
                className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                  match.type === "win"
                    ? "bg-red-100 text-red-800"
                    : match.type === "loss"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {match.result}
              </span>
            </td>
            <td className="px-4 py-3 text-neutral-600 text-xs">
              {match.scorers || "-"}
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </div>
);

// 箇条書きリスト
export const ArticleList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 my-6">
    {items.map((item, i) => (
      <li
        key={i}
        className="flex items-start gap-3 bg-neutral-50 p-3 rounded-lg"
      >
        <span className="text-green-500 font-bold">✓</span>
        <span className="text-neutral-700">{item}</span>
      </li>
    ))}
  </ul>
);

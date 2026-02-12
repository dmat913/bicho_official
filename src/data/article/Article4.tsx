"use client";

import PickUpPhoto from "@/public/article/league2025.jpeg";
import Image from "next/image";
import { motion } from "framer-motion";

const Article4 = () => {
  const matches = [
    {
      round: "1節",
      date: "2025/3/16",
      opponent: "Area大谷場",
      result: "○3-2",
      scorers: "10 横山博一, 4 賀川優斗, 37 武田康希",
      type: "win",
    },
    {
      round: "2節",
      date: "2025/3/23",
      opponent: "TACKY'S",
      result: "○3-0",
      scorers: "11 榎本歩夢, 18 石川諒, 19 岩瀬輝",
      type: "win",
    },
    {
      round: "3節",
      date: "2025/3/30",
      opponent: "繋信FC",
      result: "○1-0",
      scorers: "19 岩瀬輝",
      type: "win",
    },
    {
      round: "4節",
      date: "2025/4/6",
      opponent: "RIVER NORTE FC",
      result: "○3-1",
      scorers: "18 石川諒×2, 11 榎本歩夢",
      type: "win",
    },
    {
      round: "5節",
      date: "2025/4/27",
      opponent: "与野八王子クラブ",
      result: "△1-1",
      scorers: "11 榎本歩夢",
      type: "draw",
    },
    {
      round: "6節",
      date: "2025/5/4",
      opponent: "GRANDE FC",
      result: "×1-3",
      scorers: "17 山口大貴",
      type: "loss",
    },
    {
      round: "7節",
      date: "2025/5/18",
      opponent: "朝日FC GRAZIE",
      result: "○4-0",
      scorers: "2 石川靖人, 10 横山博一, 25 荒井克弥, 18 石川諒",
      type: "win",
    },
    {
      round: "8節",
      date: "2025/6/15",
      opponent: "与野LIVERTY",
      result: "○3-1",
      scorers: "11 榎本歩夢, 10 横山博一, 7 貫井直",
      type: "win",
    },
    {
      round: "9節",
      date: "2025/6/22",
      opponent: "FCフルゴン",
      result: "○2-0",
      scorers: "11 榎本歩夢, 4 賀川優斗",
      type: "win",
    },
    {
      round: "10節",
      date: "2025/9/28",
      opponent: "川口市役所",
      result: "○2-0",
      scorers: "22 浅子太我, 8 中田湧大",
      type: "win",
    },
    {
      round: "11節",
      date: "2025/10/5",
      opponent: "ほのぼのクラブ",
      result: "×0-2",
      type: "loss",
    },
  ];

  return (
    <div className="relative w-full px-4 pt-8 pb-16 min-h-screen">
      {/* 背景装飾 */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20" />
      <div className="absolute top-20 right-20 w-32 h-32 bg-green-200/30 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent-gold/20 rounded-full blur-xl" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          className="bg-gradient-to-r from-accent-gold to-yellow-400 rounded-3xl shadow-2xl overflow-hidden mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 text-center">
            {/* 優勝アイコン */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white-1/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-4xl">🏆</span>
              </div>
            </div>

            {/* メタ情報 */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1 bg-white-1/20 backdrop-blur-sm text-white-2 px-4 py-2 rounded-full text-sm font-bold">
                <span>📰</span>
                NEWS
              </span>
              <span className="text-white-1/80 text-sm">2025年10月5日</span>
            </div>

            {/* タイトル */}
            <h1 className="text-2xl lg:text-4xl font-black text-white-2 leading-tight mb-4">
              🎉 優勝のお知らせ 🎉
            </h1>
            <p className="text-xl text-white-1/90 font-semibold">
              2025年度埼玉県3部リーグで見事優勝を果たしました！
            </p>
          </div>
        </motion.div>
        {/* 記事ヘッダー */}
        <motion.div
          className="bg-white-1 rounded-3xl shadow-xl overflow-hidden mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8">
            {/* タイトル */}
            <h1 className="text-2xl lg:text-3xl font-black text-neutral-800 leading-tight mb-6">
              2025年度埼玉県3部リーグ 最終成績
            </h1>

            {/* 成績サマリー */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600">1位</div>
                <div className="text-xs text-green-500">最終順位</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">8勝</div>
                <div className="text-xs text-blue-500">勝利数</div>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">1分</div>
                <div className="text-xs text-yellow-500">引分数</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-red-600">2敗</div>
                <div className="text-xs text-red-500">敗戦数</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* メイン画像 */}
        <motion.div
          className="bg-white-1 rounded-3xl shadow-2xl overflow-hidden mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image
            src={PickUpPhoto}
            alt="川口市リーグ2025"
            className="w-full h-full object-contain bg-neutral-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black-1/20 via-transparent to-transparent" />
        </motion.div>

        {/* 記事本文 */}
        <motion.div
          className="bg-white-1 rounded-3xl shadow-xl p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-neutral-700 leading-relaxed">
              <p className="text-lg">
                2025年度埼玉県3部リーグは、
                <strong className="text-green-600">1位</strong>
                という素晴らしい結果で終わりました。
              </p>
              <p>
                4連勝で始まり、その後も安定した成績を維持することが出来ました。
                途中2試合勝てない試合が続きましたがなんとか持ち直し、4連勝で優勝を決めることが出来ました。
                チーム全員で戦った結果だと思います。
              </p>

              <p>
                これにより、埼玉県2部リーグへの昇格が決定しました。来年度はより厳しい戦いになるかと思いますが、引き続き応援よろしくお願いいたします。
              </p>
            </div>
          </div>
        </motion.div>

        {/* 全試合結果 */}
        <motion.div
          className="bg-white-1 rounded-3xl shadow-xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-green-500 rounded-full"></div>
            全試合結果
          </h2>

          <div className="space-y-4">
            {matches.map((match, index) => (
              <motion.div
                key={index}
                className={`rounded-2xl p-6 border transition-all duration-300 hover:shadow-medium ${
                  match.type === "win"
                    ? "bg-green-50/50 border-green-200/50"
                    : match.type === "loss"
                      ? "bg-red-50/50 border-red-200/50"
                      : "bg-yellow-50/50 border-yellow-200/50"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white-2 ${
                        match.type === "win"
                          ? "bg-green-500"
                          : match.type === "loss"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                      }`}
                    >
                      {match.type === "win"
                        ? "🎉"
                        : match.type === "loss"
                          ? "💔"
                          : "⚽"}
                    </div>
                    <div>
                      <h3
                        className={`font-bold mb-1 ${
                          match.type === "win"
                            ? "text-green-700"
                            : match.type === "loss"
                              ? "text-red-700"
                              : "text-yellow-700"
                        }`}
                      >
                        {match.round}
                      </h3>
                      <p className="text-sm text-neutral-600">{match.date}</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-lg font-black text-neutral-800 mb-1">
                      FC.BICHO <br />
                      vs
                      <br /> {match.opponent}
                    </div>
                    <div
                      className={`text-xl font-bold ${
                        match.type === "win"
                          ? "text-green-600"
                          : match.type === "loss"
                            ? "text-red-600"
                            : "text-yellow-600"
                      }`}
                    >
                      {match.result}
                    </div>
                  </div>
                </div>

                {match.scorers && (
                  <div className="mt-4 pt-4 border-t border-neutral-200/50">
                    <span className="text-sm font-medium text-green-700">
                      得点者
                    </span>
                    <br />
                    <span className="text-sm text-neutral-600">
                      {match.scorers}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Article4;

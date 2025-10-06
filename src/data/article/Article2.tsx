import PickUpPhoto from "@/public/article/league2024.jpeg";
import Image from "next/image";
import { motion } from "framer-motion";

const Article2 = () => {
  const matches = [
    {
      round: "1節",
      date: "2024/3/17",
      opponent: "川口SC",
      result: "×0-1",
      type: "loss",
    },
    {
      round: "2節",
      date: "2024/4/7",
      opponent: "S・F・C",
      result: "○3-0",
      scorers: "11 榎本歩夢,18 石川諒×2",
      type: "win",
    },
    {
      round: "3節",
      date: "2024/4/21",
      opponent: "HGC",
      result: "○2-1",
      scorers: "15 谷侑樹,4 賀川優斗",
      type: "win",
    },
    {
      round: "4節",
      date: "2024/9/8",
      opponent: "川口朝日クラブ",
      result: "○1-0",
      scorers: "8 中田湧大",
      type: "win",
    },
    {
      round: "5節",
      date: "2024/9/15",
      opponent: "埼玉パスポットFC",
      result: "○1-0",
      scorers: "18 石川諒",
      type: "win",
    },
    {
      round: "6節",
      date: "2024/10/6",
      opponent: "川口FCセカンド",
      result: "△0-0(雨天中止)",
      type: "draw",
    },
  ];

  return (
    <div className="relative w-full px-4 pt-8 pb-16 bg-gradient-to-br from-neutral-50 to-green-50 min-h-screen">
      {/* 背景装飾 */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20" />
      <div className="absolute top-20 right-20 w-32 h-32 bg-green-200/30 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent-gold/20 rounded-full blur-xl" />

      <div className="relative max-w-4xl mx-auto">
        {/* 記事ヘッダー */}
        <motion.div
          className="bg-white-1 rounded-3xl shadow-xl overflow-hidden mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8">
            {/* メタ情報 */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1 bg-green-500 text-white-2 px-4 py-2 rounded-full text-sm font-bold">
                <span>📰</span>
                NEWS
              </span>
              <span className="text-neutral-500 text-sm">2024年10月6日</span>
            </div>

            {/* タイトル */}
            <h1 className="text-2xl lg:text-3xl font-black text-neutral-800 leading-tight mb-6">
              2024年度川口市リーグ結果のお知らせ
            </h1>

            {/* 成績サマリー */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600">2位</div>
                <div className="text-xs text-green-500">最終順位</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">4勝</div>
                <div className="text-xs text-blue-500">勝利数</div>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">1分</div>
                <div className="text-xs text-yellow-500">引分数</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-red-600">1敗</div>
                <div className="text-xs text-red-500">敗戦数</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* メイン画像 */}
        <motion.div
          className="bg-white-1 rounded-3xl shadow-xl overflow-hidden mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative h-64 md:h-80">
            <Image
              src={PickUpPhoto}
              alt="川口市リーグ2024"
              className="w-full h-full object-contain bg-neutral-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black-1/20 via-transparent to-transparent" />
          </div>
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
                2024年度川口市リーグは、
                <strong className="text-green-600">2位</strong>
                という結果に終わりました。
                最終節勝利すれば優勝という状況でしたが、雨により中止となりました。ただこの結果により、2024年度埼玉県南部ブロックリーグ決勝大会への進出を決定しました。
              </p>

              <p>
                初戦は10/27。相手は同リーグチャンピオン川口SCです。難しい試合になることが予想されます。本番まで残り3週間、目標に向けて全力で準備します。
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
                      FC.BICHO vs {match.opponent}
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
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-700">
                        得点者:
                      </span>
                      <span className="text-sm text-neutral-600">
                        {match.scorers}
                      </span>
                    </div>
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

export default Article2;

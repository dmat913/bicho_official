import PickUpPhoto from "@/public/article/ club2024.jpeg";
import Image from "next/image";
import { motion } from "framer-motion";

const Article1 = () => {
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
              <span className="text-neutral-500 text-sm">2024年6月2日</span>
            </div>

            {/* タイトル */}
            <h1 className="text-2xl lg:text-3xl font-black text-neutral-800 leading-tight mb-6">
              2024年度全国クラブチームサッカー選手権,結果のお知らせ
            </h1>
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
              alt="全国クラブチームサッカー選手権"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black-1/30 via-transparent to-transparent" />
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
                2024年度全国クラブチームサッカー選手権が,
                6/2(日)に開催されました。
                大雨によりコイントスでの決着でしたが、残念ながら敗戦となりました。
              </p>

              <p>
                ただ、一回戦では格上のチームを相手に、粘り強い戦いができ勝利を収めることが出来ました。
              </p>

              <p>
                この経験を無駄にはせず、今年度必ず県3部リーグへの昇格という目標を果たしたいと思います。
              </p>
            </div>
          </div>
        </motion.div>

        {/* 試合結果 */}
        <motion.div
          className="bg-white-1 rounded-3xl shadow-xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-green-500 rounded-full"></div>
            試合結果
          </h2>

          <div className="space-y-4">
            {/* 1回戦 */}
            <div className="bg-green-50/50 rounded-2xl p-6 border border-green-200/30">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="font-bold text-green-700 mb-2">1回戦</h3>
                  <p className="text-sm text-neutral-600">2024/5/17</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-green-600 mb-1">
                    FC.BICHO vs 深谷クラブ
                  </div>
                  <div className="text-lg font-bold text-green-500">
                    1-1 (PK4-2) ⚽
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-green-200/50">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-green-700">
                    得点者:
                  </span>
                  <span className="text-sm text-neutral-600">18 石川諒</span>
                </div>
              </div>
            </div>

            {/* 2回戦 */}
            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="font-bold text-neutral-700 mb-2">2回戦</h3>
                  <p className="text-sm text-neutral-600">2024/6/2</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-neutral-600 mb-1">
                    FC.BICHO vs 川口朝日FC
                  </div>
                  <div className="text-lg font-bold text-neutral-500">
                    コイントス負け 💔
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Article1;

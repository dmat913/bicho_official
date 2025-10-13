import BichoLogo from "@/public/bicho-icon.png";
import { ScheduleData } from "@/types/schedule";
import { getLogo } from "@/utils/date";
import Image from "next/image";
import { motion } from "framer-motion";

const MatchCard = ({ schedule }: { schedule: ScheduleData }) => {
  const matchDate = new Date(schedule.date);
  const isMatchPlayed = matchDate < new Date();
  const formattedDate = matchDate.toLocaleDateString("ja-JP", {
    month: "2-digit",
    day: "2-digit",
  });
  const dayOfWeek = matchDate.toLocaleDateString("ja-JP", { weekday: "short" });

  return (
    <motion.div
      className="group w-full max-w-sm mx-auto"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full min-h-[320px] bg-white-1 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
        {/* 背景グラデーション */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/10" />

        {/* ヘッダー部分 */}
        <div className="relative h-20 bg-gradient-to-r from-green-500 to-green-600 p-4 flex items-center justify-between">
          {/* 日付部分 */}
          <div className="flex items-center gap-4">
            <div className="bg-white-1/20 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white-1/20">
              <div className="text-white-1 font-bold text-xl leading-none">
                {formattedDate}
              </div>
              <div className="text-white-1/80 text-xs font-medium mt-1">
                {dayOfWeek}
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-white-1 font-bold text-sm line-clamp-1">
                {schedule.title}
              </h3>
              <p className="text-white-1/80 text-xs line-clamp-1">
                {schedule.description}
              </p>
            </div>
          </div>

          {/* ステータスバッジ */}
          <div
            className={`
            absolute bottom-1 right-1 px-3 py-1 rounded-full text-xs font-bold shrink-0
            ${
              isMatchPlayed
                ? "bg-green-400/20 text-green-100 border border-green-300/30"
                : "bg-accent-gold/20 text-yellow-100 border border-yellow-300/30"
            }
          `}
          >
            {isMatchPlayed ? "試合終了" : "予定"}
          </div>
        </div>

        {/* メイン対戦カード */}
        <div className="relative flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            {/* BICHO チーム */}
            <motion.div
              className="flex flex-col items-center gap-3 flex-1"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-2 shadow-lg">
                  <Image
                    src={BichoLogo}
                    alt="BICHO"
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white-1 text-xs font-bold">🏠</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-green-700 font-bold text-sm">FC.BICHO</div>
                <div className="text-neutral-500 text-xs">ホーム</div>
              </div>
            </motion.div>

            {/* VS / スコア部分 */}
            <div className="flex flex-col items-center gap-2 px-4">
              {schedule.result ? (
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-black text-green-600 tracking-wider">
                    {schedule.result}
                  </div>
                  {schedule.pk && (
                    <div className="text-xs text-green-500 font-semibold">
                      PK {schedule.pk}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-black text-gradient-hero">
                    VS
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">対戦予定</div>
                </div>
              )}

              <div className="text-center">
                <div className="text-neutral-600 text-xs font-medium">
                  {schedule.kickoffTime}
                </div>
                <div className="text-neutral-500 text-xs">
                  {schedule.location}
                </div>
              </div>
            </div>

            {/* 相手チーム */}
            <motion.div
              className="flex flex-col items-center gap-3 flex-1"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl p-2 shadow-lg flex items-center justify-center">
                  {getLogo(schedule.teamName) !== "" ? (
                    <Image
                      src={getLogo(schedule.teamName)}
                      alt={schedule.teamName}
                      width={48}
                      height={48}
                      className="object-contain filter drop-shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-neutral-300 to-neutral-400 rounded-xl flex items-center justify-center">
                      <span className="text-neutral-600 text-lg font-bold">
                        {schedule.teamName.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-neutral-400 rounded-full flex items-center justify-center">
                  <span className="text-white-1 text-xs">✈️</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-neutral-700 font-bold text-sm line-clamp-1">
                  {schedule.teamName}
                </div>
                <div className="text-neutral-500 text-xs">アウェイ</div>
              </div>
            </motion.div>
          </div>

          {/* 得点者情報 */}
          {isMatchPlayed && schedule.scorer.length > 0 && (
            <motion.div
              className="mt-4 bg-green-50/50 backdrop-blur-sm rounded-2xl p-4 border border-green-200/30"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white-1 text-xs">⚽</span>
                </div>
                <span className="text-green-700 font-bold text-sm">得点者</span>
                {schedule.scorer.length > 3 && (
                  <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded-full">
                    {schedule.scorer.length}名
                  </span>
                )}
              </div>
              <div
                className={`space-y-1 ${
                  schedule.scorer.length > 3
                    ? "max-h-20 overflow-y-auto scroll-smooth scorer-scroll"
                    : ""
                }`}
              >
                {schedule.scorer.map((scorer, index) => (
                  <div
                    key={index}
                    className="text-neutral-600 text-sm font-medium py-1"
                  >
                    {scorer}
                  </div>
                ))}
              </div>
              {schedule.scorer.length > 3 && (
                <div className="text-xs text-green-500 mt-2 text-center">
                  スクロールして全て表示
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* ホバー時のグラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-500/0 via-transparent to-green-400/0 group-hover:from-green-500/5 group-hover:to-green-400/5 transition-all duration-300 pointer-events-none rounded-3xl" />
      </div>
    </motion.div>
  );
};

export default MatchCard;

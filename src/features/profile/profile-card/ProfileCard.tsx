"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Profile } from "@/types/profile";

const ProfileCard = ({ profile }: { profile: Profile }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isFlipped, setIsFlipped] = useState(false);

  // カードクリック時の処理（表面のみ）
  const handleCardClick = () => {
    if (profile.detail && !isFlipped) {
      setIsFlipped(true);
    }
  };

  // 戻るボタンクリック時の処理
  const handleBackClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // イベントバブリングを停止
    setIsFlipped(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-profile-width-default lg:w-lg-profile-width h-80 perspective-1000"
      onClick={handleCardClick}
    >
      <motion.div
        className={`relative w-full h-full preserve-3d ${
          !isFlipped ? "cursor-pointer" : ""
        }`}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* カード表面 */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div
            className="relative w-full h-full overflow-hidden group transition-all duration-500
            rounded-lg shadow-strong hover:shadow-green-glow border border-green-400/30"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(34, 197, 94, 0.95) 0%, 
                  rgba(22, 163, 74, 0.97) 25%, 
                  rgba(21, 128, 61, 0.98) 50%, 
                  rgba(22, 101, 52, 0.99) 75%, 
                  rgba(20, 83, 45, 1) 100%
                ),
                radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
                linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.03) 50%, transparent 70%)
              `,
              backgroundSize: "100% 100%, 200% 200%, 300% 300%, 100% 100%",
            }}
          >
            {/* 複層グラデーション背景エフェクト */}
            <div className="absolute inset-0">
              {/* メインオーバーレイ */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-black/25"></div>

              {/* ノイズテクスチャ風エフェクト */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 10% 30%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    radial-gradient(circle at 30% 60%, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                    radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
                    radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
                  `,
                  backgroundSize: "50px 50px, 80px 80px, 60px 60px, 90px 90px",
                }}
              ></div>

              {/* シマー効果 */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `linear-gradient(
                    45deg,
                    transparent 30%,
                    rgba(255, 255, 255, 0.1) 48%,
                    rgba(255, 255, 255, 0.2) 50%,
                    rgba(255, 255, 255, 0.1) 52%,
                    transparent 70%
                  )`,
                  animation: "shimmer 3s ease-in-out infinite",
                }}
              ></div>
            </div>

            {/* 背番号 */}
            <div className="absolute top-2 left-2 z-10">
              <span className="text-3xl font-bold text-white-1 drop-shadow-lg opacity-90">
                {profile.number}
              </span>
            </div>

            {/* NEW バッジ */}
            {profile.isNew && (
              <div className="absolute right-2 top-2 z-10">
                <span
                  className="bg-accent-red text-white-1 text-xs font-bold px-3 py-1 rounded-full 
                  shadow-md uppercase tracking-wide"
                >
                  New
                </span>
              </div>
            )}

            {/* 選手画像 */}
            <div className="absolute inset-4 top-12 flex items-center justify-center">
              {profile.img ? (
                <Image
                  src={profile.img}
                  alt={profile.name}
                  className="h-full w-auto object-cover drop-shadow-2xl 
                    group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white-1 text-lg font-medium">
                  Now Printing
                </div>
              )}
            </div>

            {/* 選手情報 */}
            <div className="absolute bottom-2 left-2 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-white">
                <h3 className="text-md font-bold text-white-1 drop-shadow-lg">
                  {profile.name}
                </h3>
                <p className="text-xs opacity-90 text-white-1 drop-shadow-md">
                  {profile.englishName}
                </p>
              </div>
            </div>

            {/* 詳細データがある場合のインジケーター */}
            {profile.detail && (
              <div className="absolute bottom-2 right-2 z-10">
                <div className="relative group/indicator">
                  {/* メイングロー効果 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                  {/* メインボタン */}
                  <div
                    className="relative w-6 h-6 bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 
                    backdrop-blur-xl rounded-xl flex items-center justify-center shadow-lg 
                    border border-green-400/20 group-hover:from-green-400 group-hover:to-emerald-500
                    group-hover:scale-105 group-hover:shadow-green-500/30 group-hover:shadow-xl
                    transition-all duration-300 ease-out cursor-pointer"
                  >
                    {/* 内部グラデーション */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 rounded-xl"></div>

                    {/* アイコン */}
                    <svg
                      className="w-4 h-4 text-white-1 drop-shadow-lg relative z-10 group-hover/indicator:scale-110 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>

                    {/* ホバー時のリップル効果 */}
                    <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                  </div>

                  {/* ツールチップ */}
                  <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover/indicator:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-neutral-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-xl border border-green-400/20 whitespace-nowrap">
                      詳細データを見る
                      <div className="absolute top-full right-3 w-0 h-0 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent border-t-neutral-900/95"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ホバーエフェクト用オーバーレイ */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/5 
              opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
          </div>
        </div>

        {/* カード裏面 */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div
            className="relative w-full h-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-black 
            rounded-3xl shadow-strong overflow-hidden border border-neutral-700/50 flex flex-col"
            onClick={(e) => e.stopPropagation()} // 裏面では親のクリックイベントを停止
          >
            {/* 背景パターン */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="w-full h-full bg-green-500"
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, transparent 20%, rgba(34, 197, 94, 0.1) 21%),
                                   radial-gradient(circle at 75% 75%, transparent 20%, rgba(34, 197, 94, 0.1) 21%)`,
                }}
              ></div>
            </div>

            {/* ヘッダー */}
            <div className="relative p-4 border-b border-neutral-700/50 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="shrink-0">
                  <h3 className="text-white-1 text-sm font-bold">
                    {profile.name}
                  </h3>
                  <p className="text-neutral-100 text-xs">
                    {profile.englishName}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-green-400 text-2xl font-bold">
                    #{profile.number}
                  </span>
                  <p className="text-neutral-100 text-xs truncate w-full uppercase tracking-wide">
                    {profile.position}
                  </p>
                </div>
              </div>
            </div>

            {/* データ表示エリア */}
            <div className="flex-1 overflow-hidden z-50 flex flex-col">
              <div
                className="p-2 overflow-y-auto flex-1 custom-scrollbar"
                style={{ maxHeight: "calc(320px - 140px)" }}
              >
                {profile.detail?.competitionData &&
                profile.detail.competitionData.length > 0 ? (
                  <div className="space-y-4">
                    {profile.detail.competitionData.map(
                      (competition, index) => (
                        <div
                          key={index}
                          className="bg-neutral-800/50 rounded-xl p-2 border border-neutral-700/30"
                        >
                          <h4 className="text-green-500 font-semibold text-xs mb-3 uppercase tracking-wide">
                            {competition.competition}
                          </h4>
                          <div className="space-y-2">
                            {competition.contents.map((data, dataIndex) => (
                              <div
                                key={dataIndex}
                                className="flex items-center gap-2 justify-between text-xs"
                              >
                                <span className="text-neutral-100 font-medium">
                                  {data.year}
                                </span>
                                <div className="flex items-center gap-1 text-neutral-100">
                                  <span>M: {data.gameCount}</span>
                                  <span className="text-green-400">
                                    G: {data.goal}
                                  </span>
                                  <span className="text-blue-400">
                                    A: {data.assist}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-neutral-100">
                    <div className="text-center">
                      <svg
                        className="w-12 h-12 mx-auto mb-3 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="text-sm">データ準備中</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 戻るボタン */}
            <div className="absolute z-[99] bottom-4 right-4">
              <button
                className="w-10 h-10 bg-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center
                hover:bg-green-500/30 transition-colors duration-300 text-green-400 hover:text-green-300"
                onClick={handleBackClick}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileCard;

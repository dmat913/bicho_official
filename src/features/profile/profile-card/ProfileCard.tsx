"use client";
import Image from "next/image";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useRef, useState, MouseEvent } from "react";
import { Profile } from "@/types/profile";

const ProfileCard = ({ profile }: { profile: Profile }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // マウスの動きに追従するチルトエフェクト設定
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // 裏面表示中はチルトエフェクトを無効化してデータを見やすくする
    if (!ref.current || isFlipped) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleCardClick = () => {
    if (profile.detail && !isFlipped) {
      setIsFlipped(true);
      // 裏返ったときはチルトリセット
      x.set(0);
      y.set(0);
    }
  };

  const handleBackClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-96 group/card touch-pan-y"
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={`relative w-full h-full transition-all duration-300 ${
          !isFlipped ? "cursor-pointer" : ""
        }`}
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
        onClick={handleCardClick}
      >
        {/* ==================== 表面 (Front) ==================== */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 border border-white/10 ${
            isFlipped ? "pointer-events-none" : "pointer-events-auto"
          }`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* 背景デザイン */}
          <div className="absolute inset-0 z-0">
            {/* ダークグラデーションベース */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black"></div>

            {/* チームカラーのアクセント（斜めライン） */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-600/20 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-green-900/40 to-transparent"></div>

            {/* パターンオーバーレイ */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                backgroundSize: "24px 24px",
              }}
            ></div>
          </div>

          {/* 背番号（背景装飾として） */}
          <div className="absolute top-0 right-4 z-0 pointer-events-none">
            <span
              className="text-[6rem] lg:text-[8rem] font-black italic leading-none text-white-1 select-none"
              style={{ fontFamily: "sans-serif" }}
            >
              {profile.number}
            </span>
          </div>

          {/* 選手画像 */}
          <div className="absolute inset-0 top-10 z-10 flex items-end justify-center overflow-hidden pb-8 pointer-events-none">
            {profile.img ? (
              <motion.div
                className="relative w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={profile.img}
                  alt={profile.name}
                  fill
                  className="object-cover object-top"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, black 70%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 70%, transparent 100%)",
                  }}
                />
                {/* 画像の下部を少し暗くしてテキストの視認性を上げる */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full text-neutral-500">
                <span className="text-6xl mb-2 opacity-20">⚽️</span>
                <span className="text-xs uppercase tracking-widest opacity-50">
                  Now Printing
                </span>
              </div>
            )}
          </div>

          {/* NEW バッジ - 新加入選手表示 */}
          {profile.isNew && (
            <div className="absolute top-3 right-3 z-20">
              <div className="relative">
                {/* グロー効果 */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded blur opacity-40 animate-pulse"></div>
                {/* バッジ本体 */}
                <div className="relative bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold text-[10px] px-2.5 py-1 rounded shadow-sm border border-yellow-200/50 uppercase tracking-widest flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 bg-black rounded-full animate-ping"
                    style={{ animationDuration: "2s" }}
                  ></span>
                  NEW
                </div>
              </div>
            </div>
          )}

          {/* 選手情報 (下部) */}
          <div className="absolute bottom-0 left-0 w-full p-5 z-20">
            <div className="flex justify-between items-end border-b border-white/10 pb-3 mb-2">
              <div className="w-full">
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-green-400 truncate font-bold text-xs tracking-[0.2em] uppercase mb-1"
                >
                  {profile.position}
                </motion.p>
                <h3
                  className="text-lg md:text-base sm:text-sm font-black text-white-1 italic tracking-tighter leading-none drop-shadow-lg"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {profile.name}
                </h3>
                <p className="text-neutral-400 text-xs font-medium tracking-wider truncate w-full">
                  {profile.englishName}
                </p>
              </div>
              <div className="text-right">
                <span
                  className="text-lg md:text-base sm:text-sm font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 italic"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {profile.number}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              {/* 詳細ボタンインジケータ */}
              {profile.detail && (
                <div className="flex items-center gap-1.5 text-[10px] text-green-400 font-bold uppercase tracking-widest group-hover/card:translate-x-1 transition-transform">
                  Data
                  <div className="w-4 h-4 rounded-full border border-green-400/50 flex items-center justify-center">
                    <svg
                      className="w-2 h-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ホログラム/光沢エフェクト */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 z-30 mix-blend-overlay"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)",
              filter: "brightness(1.2) contrast(1.2)",
            }}
          ></div>
        </div>

        {/* ==================== 裏面 (Back/Details) ==================== */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-lg bg-neutral-900 border border-green-500/30 ${
            isFlipped ? "pointer-events-auto" : "pointer-events-none"
          }`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* 裏面背景 */}
          <div className="absolute inset-0 overflow-hidden">
            {/* グリッドパターン */}
            <div
              style={{
                backgroundImage:
                  "radial-gradient(#ffffff 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                opacity: 0.05,
              }}
              className="absolute inset-0"
            ></div>
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-green-900/20"></div>
          </div>

          <div
            className="relative h-full flex flex-col p-4 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ヘッダーエリア */}
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="w-10 h-10 shrink-0 rounded-full bg-neutral-800 border-2 border-green-500/30 flex items-center justify-center overflow-hidden shadow-lg">
                  {profile.img ? (
                    <Image
                      src={profile.img}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-neutral-500">ID</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[9px] text-green-500 font-bold uppercase tracking-wider mb-0.5">
                    DATA ANALYSIS
                  </div>
                  <div className="text-white-1 font-bold text-base leading-none truncate">
                    {profile.name}
                  </div>
                </div>
              </div>
            </div>

            {/* データエリア */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar overscroll-contain">
              {profile.detail?.competitionData &&
              profile.detail.competitionData.length > 0 ? (
                <div className="space-y-4">
                  {profile.detail.competitionData.map((competition, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="bg-white/5 rounded-xl p-3 border border-white/5 backdrop-blur-sm shadow-inner"
                    >
                      <h4 className="text-[10px] text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        {competition.competition}
                      </h4>

                      <div className="space-y-3">
                        {competition.contents.map((data, dIdx) => (
                          <div
                            key={dIdx}
                            className="bg-black/20 rounded-lg p-2"
                          >
                            <div className="flex justify-between text-xs text-white-2 mb-2 font-medium border-b border-white/5 pb-1">
                              <span className="text-green-400 font-mono">
                                {data.year}
                              </span>
                              <span className="opacity-70">
                                {data.gameCount} 試合
                              </span>
                            </div>

                            {/* スタッツバー */}
                            <div className="flex gap-2">
                              {/* Goals */}
                              <div className="flex-1 bg-neutral-900/80 rounded px-1.5 py-2 flex flex-col items-center justify-center gap-1">
                                <span className="text-[8px] text-neutral-500 uppercase font-bold tracking-wider">
                                  G
                                </span>
                                <span className="text-green-400 font-bold font-mono text-base leading-none">
                                  {data.goal}
                                </span>
                              </div>
                              {/* Assists */}
                              <div className="flex-1 bg-neutral-900/80 rounded px-1.5 py-2 flex flex-col items-center justify-center gap-1">
                                <span className="text-[8px] text-neutral-500 uppercase font-bold tracking-wider">
                                  A
                                </span>
                                <span className="text-blue-400 font-bold font-mono text-base leading-none">
                                  {data.assist}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-neutral-500 opacity-50">
                  <svg
                    className="w-12 h-12 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <p className="text-xs tracking-widest">NO DATA</p>
                </div>
              )}
            </div>

            {/* 戻るボタン */}
            <div className="mt-4 pt-3 flex justify-center relative z-50">
              <button
                type="button"
                onClick={handleBackClick}
                className="group w-full py-2.5 rounded-lg bg-green-600/10 hover:bg-green-600/20 border border-green-500/20 text-xs text-green-400 font-bold tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg
                  className="w-3 h-3 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                CLOSE DATA
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileCard;

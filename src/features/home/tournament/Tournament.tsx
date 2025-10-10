"use client";

import { motion } from "framer-motion";
import React, { memo, useRef } from "react";
import BICHOLOGO from "@/public/bicho-icon.png";
import Image from "next/image";

// 型定義
interface Team {
  name: string;
  score: string;
  isPK?: boolean;
  pkScore?: string;
  isHighlight?: boolean;
}

interface Match {
  id: number;
  team1: Team;
  team2: Team;
  winner: string;
  date?: string;
  time?: string;
  venue?: string;
  scorers?: string[];
}

interface BichoMatch {
  match: Match;
  roundName: string;
  roundIndex: number;
}

// トーナメントデータ構造
const tournamentData = {
  title: "2024年度 埼玉県南部地区ブロックリーグ決勝大会",
  rounds: [
    {
      name: "1回戦",
      matches: [
        {
          id: 1,
          team1: { name: "下落合FC", score: "1", isPK: true, pkScore: "4" },
          team2: { name: "浦和UFC", score: "1", isPK: true, pkScore: "2" },
          winner: "team1",
        },
        {
          id: 2,
          team1: {
            name: "FC.BICHO",
            score: "1",
            isPK: true,
            pkScore: "4",
            isHighlight: true,
          },
          team2: { name: "川口SC", score: "1", isPK: true, pkScore: "1" },
          winner: "team1",
          scorers: ["17 山口大貴"],
        },
        {
          id: 3,
          team1: { name: "FC.ARAO", score: "0" },
          team2: { name: "浦和西クラブ", score: "3" },
          winner: "team2",
        },
        {
          id: 4,
          team1: { name: "ほのぼのクラブ", score: "3" },
          team2: { name: "FC.FAMITECH", score: "0" },
          winner: "team1",
        },
      ],
    },
    {
      name: "準決勝",
      matches: [
        {
          id: 5,
          team1: { name: "下落合FC", score: "0" },
          team2: {
            name: "FC.BICHO",
            score: "1",
            isHighlight: true,
          },
          winner: "team2",
          scorers: ["18 石川諒"],
        },
        {
          id: 6,
          team1: { name: "浦和西クラブ", score: "0", isPK: true, pkScore: "4" },
          team2: {
            name: "ほのぼのクラブ",
            score: "0",
            isPK: true,
            pkScore: "5",
          },
          winner: "team2",
        },
      ],
    },
    {
      name: "決勝",
      matches: [
        {
          id: 7,
          team1: {
            name: "FC.BICHO",
            score: "0",
            isPK: true,
            pkScore: "5",
            isHighlight: true,
          },
          team2: {
            name: "ほのぼのクラブ",
            score: "0",
            isPK: true,
            pkScore: "3",
          },
          winner: "team1",
        },
      ],
    },
  ],
};

const Tournament = () => {
  const titleRef = useRef(null);
  const tournamentRef = useRef(null);
  const mobileRef = useRef(null);

  // BICHOチームの試合のみを抽出する関数
  const getBichoMatches = (): BichoMatch[] => {
    const bichoMatches: BichoMatch[] = [];

    tournamentData.rounds.forEach((round, roundIndex) => {
      round.matches.forEach((match) => {
        const team1HasHighlight = (match.team1 as Team).isHighlight || false;
        const team2HasHighlight = (match.team2 as Team).isHighlight || false;

        if (team1HasHighlight || team2HasHighlight) {
          bichoMatches.push({
            match,
            roundName: round.name,
            roundIndex,
          });
        }
      });
    });

    return bichoMatches;
  };

  const bichoMatches = getBichoMatches();

  // 試合カードコンポーネント
  // MatchCardコンポーネント
  const MatchCard: React.FC<{
    match: {
      id: number;
      team1: {
        name: string;
        score: string;
        isPK?: boolean;
        pkScore?: string;
        isHighlight?: boolean;
      };
      team2: {
        name: string;
        score: string;
        isPK?: boolean;
        pkScore?: string;
        isHighlight?: boolean;
      };
      winner: string;
      scorers?: string[];
    };
    roundIndex: number;
    matchIndex: number;
  }> = ({ match, matchIndex }) => {
    const getTeamColor = (team: Team, isWinner: boolean) => {
      if (team.isHighlight) {
        return isWinner
          ? "text-green-700 font-bold"
          : "text-green-600 font-semibold";
      }
      return isWinner ? "text-neutral-800 font-bold" : "text-neutral-600";
    };

    const isTeam1Winner = match.winner === "team1";
    const isTeam2Winner = match.winner === "team2";

    return (
      <motion.div
        className="bg-white-2 rounded-2xl shadow-medium border border-neutral-200 overflow-hidden hover:shadow-strong transition-all duration-300"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: matchIndex * 0.1 }}
      >
        <div className="p-4 space-y-3">
          {/* Team 1 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              {match.team1.isHighlight && (
                <div className="w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Image src={BICHOLOGO} alt="BICHO" width={16} height={16} />
                </div>
              )}
              <span
                className={`text-sm lg:text-base truncate ${getTeamColor(
                  match.team1,
                  isTeam1Winner
                )}`}
              >
                {match.team1.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-lg font-bold ${
                  isTeam1Winner ? "text-green-600" : "text-neutral-500"
                }`}
              >
                {match.team1.score}
              </span>
              {match.team1.isPK && (
                <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                  PK{match.team1.pkScore}
                </span>
              )}
            </div>
          </div>

          {/* VS Divider */}
          <div className="flex items-center justify-center">
            <div className="h-px bg-neutral-200 flex-1"></div>
            <span className="px-3 text-xs text-neutral-400 font-semibold">
              VS
            </span>
            <div className="h-px bg-neutral-200 flex-1"></div>
          </div>

          {/* Team 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              {match.team2.isHighlight && (
                <div className="w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Image src={BICHOLOGO} alt="BICHO" width={16} height={16} />
                </div>
              )}
              <span
                className={`text-sm lg:text-base truncate ${getTeamColor(
                  match.team2,
                  isTeam2Winner
                )}`}
              >
                {match.team2.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-lg font-bold ${
                  isTeam2Winner ? "text-green-600" : "text-neutral-500"
                }`}
              >
                {match.team2.score}
              </span>
              {match.team2.isPK && (
                <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                  PK{match.team2.pkScore}
                </span>
              )}
            </div>
          </div>

          {/* Scorers */}
          {match.scorers && match.scorers.length > 0 && (
            <motion.div
              className="mt-3 p-3 bg-green-50 rounded-xl border-l-4 border-green-500"
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="text-xs text-green-700 font-semibold mb-1">
                得点者
              </div>
              <div className="space-y-1 max-h-20 overflow-y-auto custom-scrollbar">
                {match.scorers.map((scorer, index) => (
                  <div key={index} className="text-sm text-green-600">
                    ⚽ {scorer}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div
      id="tournament"
      className="relative w-full px-4 py-16 bg-gradient-to-br from-neutral-50 to-green-50 overflow-hidden"
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20" />
      <div className="absolute top-20 right-20 w-32 h-32 bg-green-200/30 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent-gold/20 rounded-full blur-xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* タイトル */}
        <motion.div
          ref={titleRef}
          className="text-center mb-6"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-green-50/50 backdrop-blur-sm border border-green-200/30 rounded-2xl px-6 py-3 mb-6">
            <span className="text-2xl">🏆</span>
            <span className="text-green-700 font-bold text-sm uppercase tracking-wider">
              {tournamentData.title}
            </span>
          </div>
        </motion.div>

        {/* トーナメント表 - デスクトップ表示（全チーム） */}
        <motion.div
          ref={tournamentRef}
          className="hidden lg:block"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid lg:grid-cols-3 lg:gap-8 xl:gap-12">
            {tournamentData.rounds.map((round, roundIndex) => (
              <div key={roundIndex} className="relative">
                {/* ラウンド名 */}
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: roundIndex * 0.3 }}
                >
                  <div
                    className={`
                  inline-flex items-center justify-center px-6 py-3 rounded-2xl font-bold text-sm
                  ${
                    round.name === "決勝"
                      ? "bg-gradient-to-r from-accent-gold to-yellow-400 text-white-2 shadow-lg"
                      : "bg-gradient-to-r from-green-500 to-green-600 text-white-2 shadow-md"
                  }
                `}
                  >
                    {round.name}
                    {round.name === "決勝" && <span className="ml-2">👑</span>}
                  </div>
                </motion.div>

                {/* 試合カード */}
                <div className="space-y-6">
                  {round.matches.map((match, matchIndex) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      roundIndex={roundIndex}
                      matchIndex={matchIndex}
                    />
                  ))}
                </div>

                {/* 接続線 */}
                {roundIndex < tournamentData.rounds.length - 1 && (
                  <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 w-12 h-1">
                    <motion.div
                      className="w-full h-0.5 bg-gradient-to-r from-green-400 to-green-600"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: roundIndex * 0.4 + 0.5,
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* モバイル表示 - BICHOの試合のみ */}
        <motion.div
          ref={mobileRef}
          className="block lg:hidden space-y-6 relative z-10"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-50/50 backdrop-blur-sm border border-green-200/30 rounded-2xl px-4 py-2 mb-6">
              <div className="w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center">
                <Image src={BICHOLOGO} alt="BICHO" width={16} height={16} />
              </div>
              <span className="text-green-700 font-semibold text-sm">
                FC.BICHO の戦績
              </span>
            </div>
          </div>

          {bichoMatches.length > 0 ? (
            bichoMatches.map((item, index) => (
              <motion.div
                key={item.match.id}
                className="relative"
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {/* ラウンド表示 */}
                <div className="text-center mb-4">
                  <div
                    className={`
                    inline-flex items-center justify-center px-4 py-2 rounded-xl font-bold text-xs
                    ${
                      item.roundName === "決勝"
                        ? "bg-gradient-to-r from-accent-gold to-yellow-400 text-white-2"
                        : "bg-gradient-to-r from-green-500 to-green-600 text-white-2"
                    }
                  `}
                  >
                    {item.roundName}
                    {item.roundName === "決勝" && (
                      <span className="ml-1">👑</span>
                    )}
                  </div>
                </div>

                <MatchCard
                  match={item.match}
                  roundIndex={item.roundIndex}
                  matchIndex={index}
                />
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-neutral-600">試合データがありません</p>
            </div>
          )}
        </motion.div>

        {/* 優勝セレブレーション */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="bg-white-1 rounded-2xl shadow-lg border border-accent-gold/20 p-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-3xl">🏆</span>
              <h3 className="text-xl font-bold text-accent-gold">優勝</h3>
            </div>
            <p className="text-neutral-700 font-medium">
              2024年度 埼玉県南部ブロック決勝大会
            </p>
            <p className="text-sm text-green-600 mt-1">県3部リーグ昇格決定</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(Tournament);

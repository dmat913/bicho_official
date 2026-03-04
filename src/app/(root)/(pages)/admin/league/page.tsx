"use client";
import React, { useState, useEffect } from "react";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { useRouter } from "next/navigation";
import {
  MdDeleteOutline,
  MdEdit,
  MdAdd,
  MdSportsScore,
  MdGroups,
  MdEmojiEvents,
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { LeagueInfo, LeagueTeam, MatchResult } from "@/types/league";

const LeaguePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"league" | "team" | "match">(
    "league",
  );
  const [leagues, setLeagues] = useState<LeagueInfo[]>([]);
  const [teams, setTeams] = useState<LeagueTeam[]>([]);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // データ取得
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/check-db");
      const result = await response.json();
      if (result.success) {
        setLeagues(result.data.leagues.data);
        setTeams(result.data.teams.data);
        setMatches(result.data.matches.data);
      }
    } catch (error) {
      console.error("データ取得エラー:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 削除処理
  const handleDelete = async () => {
    if (!selectedId) return;

    let endpoint = "";
    if (activeTab === "match") {
      endpoint = `/api/match-results/${selectedId}`;
    }

    if (!endpoint) {
      alert("削除機能は未実装です");
      handleCloseModal();
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("削除しました");
        fetchData();
      } else {
        const errorData = await response.json();
        alert(`削除失敗: ${errorData.error}`);
      }
    } catch (error) {
      console.error("削除エラー:", error);
      alert("削除中にエラーが発生しました");
    } finally {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900">
        <div className="text-white-1 text-2xl">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full bg-neutral-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white-1 mb-2">
            リーグ・試合管理
          </h1>
          <p className="text-neutral-400">
            リーグ情報、チーム、試合結果を管理します
          </p>
        </div>

        {/* タブ */}
        <div className="flex gap-4 mb-6 border-b border-neutral-700">
          <button
            onClick={() => setActiveTab("league")}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
              activeTab === "league"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-neutral-400 hover:text-white-1"
            }`}
          >
            <MdEmojiEvents size={24} />
            リーグ情報
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
              activeTab === "team"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-neutral-400 hover:text-white-1"
            }`}
          >
            <MdGroups size={24} />
            チーム
          </button>
          <button
            onClick={() => setActiveTab("match")}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
              activeTab === "match"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <MdSportsScore size={24} />
            試合結果
          </button>
        </div>

        {/* リーグ情報タブ */}
        {activeTab === "league" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white-1">
                リーグ情報 ({leagues.length}件)
              </h2>
              <button
                onClick={() => router.push("/admin/league/create-league")}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white-1 rounded-lg hover:bg-green-700 transition-colors"
              >
                <MdAdd size={24} />
                新規登録
              </button>
            </div>

            {leagues.length === 0 ? (
              <div className="bg-neutral-800 rounded-lg p-8 text-center text-neutral-400">
                リーグ情報がありません。新規登録してください。
              </div>
            ) : (
              <div className="grid gap-4">
                {leagues.map((league) => (
                  <motion.div
                    key={league._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-800 rounded-lg p-6 hover:bg-neutral-750 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white-1">
                            {league.title}
                          </h3>
                          {league.isActive && (
                            <span className="px-3 py-1 bg-green-600 text-white-1 text-xs rounded-full">
                              アクティブ
                            </span>
                          )}
                        </div>
                        <div className="flex gap-4 text-sm text-neutral-400">
                          <span>年度: {league.year}</span>
                          <span>シーズン: {league.season}</span>
                          <span>ディビジョン: {league.division}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            router.push(
                              `/admin/league/edit-league?id=${league._id}`,
                            )
                          }
                          className="p-2 bg-blue-600 text-white-1 rounded hover:bg-blue-700 transition-colors"
                          title="編集"
                        >
                          <MdEdit size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* チームタブ */}
        {activeTab === "team" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                チーム ({teams.length}件)
              </h2>
              <button
                onClick={() => router.push("/admin/league/create-team")}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white-1 rounded-lg hover:bg-green-700 transition-colors"
              >
                <MdAdd size={24} />
                新規登録
              </button>
            </div>

            {teams.length === 0 ? (
              <div className="bg-neutral-800 rounded-lg p-8 text-center text-neutral-400">
                チーム情報がありません。新規登録してください。
              </div>
            ) : (
              <div className="grid gap-4">
                {teams.map((team) => (
                  <motion.div
                    key={team._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-800 rounded-lg p-6 hover:bg-neutral-750 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-bold text-white-1">
                          {team.teamName}
                        </h3>
                        <p className="text-sm text-neutral-400">
                          リーグID: {team.leagueId}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 試合結果タブ */}
        {activeTab === "match" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white-1">
                試合結果 ({matches.length}件)
              </h2>
              <button
                onClick={() => router.push("/admin/league/create-match")}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white-1 rounded-lg hover:bg-green-700 transition-colors"
              >
                <MdAdd size={24} />
                新規登録
              </button>
            </div>

            {matches.length === 0 ? (
              <div className="bg-neutral-800 rounded-lg p-8 text-center text-neutral-400">
                試合結果がありません。新規登録してください。
              </div>
            ) : (
              <div className="grid gap-4">
                {matches.map((match) => (
                  <motion.div
                    key={match._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-800 rounded-lg p-6 hover:bg-neutral-750 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-lg font-bold text-white">
                            {match.homeTeam}
                          </span>
                          <span className="text-2xl font-black text-green-400">
                            {match.homeScore}
                          </span>
                          <span className="text-neutral-500">-</span>
                          <span className="text-2xl font-black text-green-400">
                            {match.awayScore}
                          </span>
                          <span className="text-lg font-bold text-white-1">
                            {match.awayTeam}
                          </span>
                        </div>
                        <div className="flex gap-4 text-sm text-neutral-400">
                          <span>
                            {new Date(match.matchDate).toLocaleDateString(
                              "ja-JP",
                            )}
                          </span>
                          {match.venue && <span>会場: {match.venue}</span>}
                        </div>
                        {match.notes && (
                          <p className="mt-2 text-sm text-neutral-300">
                            {match.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            router.push(
                              `/admin/league/edit-match?id=${match._id}`,
                            )
                          }
                          className="p-2 bg-blue-600 text-white-1 rounded hover:bg-blue-700 transition-colors"
                          title="編集"
                        >
                          <MdEdit size={20} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedId(match._id!);
                            setIsModalOpen(true);
                          }}
                          className="p-2 bg-red-600 text-white-1 rounded hover:bg-red-700 transition-colors"
                          title="削除"
                        >
                          <MdDeleteOutline size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* 削除確認モーダル */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-800 rounded-lg p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white-1 mb-4">削除確認</h3>
              <p className="text-neutral-300 mb-6">
                本当に削除してもよろしいですか？
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 bg-neutral-700 text-white-1 rounded-lg hover:bg-neutral-600 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-6 py-3 bg-red-600 text-white-1 rounded-lg hover:bg-red-700 transition-colors"
                >
                  削除
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default LeaguePage;

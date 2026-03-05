"use client";
import React, { useState, useEffect } from "react";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { MdSportsScore, MdGroups, MdEmojiEvents } from "react-icons/md";
import { LeagueInfo, LeagueTeam, MatchResult } from "@/types/league";
import HomeLoading from "@/features/home/loading/HomeLoading";
import { LeagueTab } from "@/features/admin/league/components/LeagueTab";
import { TeamTab } from "@/features/admin/league/components/TeamTab";
import { MatchTab } from "@/features/admin/league/components/MatchTab";
import { DeleteConfirmModal } from "@/features/admin/league/components/DeleteConfirmModal";

const LeaguePage = () => {
  const [activeTab, setActiveTab] = useState<"league" | "team" | "match">(
    "league",
  );
  const [leagues, setLeagues] = useState<LeagueInfo[]>([]);
  const [teams, setTeams] = useState<LeagueTeam[]>([]);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<"team" | "match" | null>(null);

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
    if (!selectedId || !deleteType) return;

    let endpoint = "";
    if (deleteType === "team") {
      endpoint = `/api/teams/${selectedId}`;
    } else if (deleteType === "match") {
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

  // アクティブ状態を切り替え
  const handleToggleActive = async (
    leagueId: string,
    currentStatus: boolean,
  ) => {
    try {
      const response = await fetch(`/api/leagues/${leagueId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: !currentStatus,
        }),
      });

      if (response.ok) {
        alert(
          !currentStatus
            ? "アクティブに設定しました。他のリーグは非アクティブになりました。"
            : "非アクティブに設定しました",
        );
        fetchData();
      } else {
        const errorData = await response.json();
        alert(`更新失敗: ${errorData.error}`);
      }
    } catch (error) {
      console.error("アクティブ状態更新エラー:", error);
      alert("更新中にエラーが発生しました");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
    setDeleteType(null);
  };

  if (isLoading) {
    return <HomeLoading />;
  }

  return (
    <div className="min-h-screen flex flex-col w-full bg-neutral-900">
      <Header />
      <main className="flex-grow w-full container mx-auto py-6 sm:pb-8 mt-[104px] md:mt-[94px] pt-0 px-4">
        {/* タブ */}
        <div className="sticky top-[104px] md:top-[94px] z-10 flex gap-2 sm:gap-4 mb-6 border-b border-neutral-700 bg-neutral-900 pb-0 -mx-3 sm:-mx-4 px-3 sm:px-4">
          <button
            onClick={() => setActiveTab("league")}
            className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3 font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
              activeTab === "league"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-neutral-400 hover:text-white-1"
            }`}
          >
            <MdEmojiEvents size={20} className="sm:w-6 sm:h-6" />
            <span className="text-xs sm:text-base">リーグ情報</span>
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3 font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
              activeTab === "team"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-neutral-400 hover:text-white-1"
            }`}
          >
            <MdGroups size={20} className="sm:w-6 sm:h-6" />
            <span className="text-xs sm:text-base">チーム</span>
          </button>
          <button
            onClick={() => setActiveTab("match")}
            className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3 font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
              activeTab === "match"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-neutral-400 hover:text-white-1"
            }`}
          >
            <MdSportsScore size={20} className="sm:w-6 sm:h-6" />
            <span className="text-xs sm:text-base">試合結果</span>
          </button>
        </div>

        {/* リーグ情報タブ */}
        {activeTab === "league" && (
          <LeagueTab leagues={leagues} onToggleActive={handleToggleActive} />
        )}

        {/* チームタブ */}
        {activeTab === "team" && (
          <TeamTab
            teams={teams}
            leagues={leagues}
            onDelete={(team) => {
              setSelectedId(team._id!);
              setDeleteType("team");
              setIsModalOpen(true);
            }}
          />
        )}

        {/* 試合結果タブ */}
        {activeTab === "match" && (
          <MatchTab
            matches={matches}
            leagues={leagues}
            teams={teams}
            onDelete={(match) => {
              setSelectedId(match._id!);
              setDeleteType("match");
              setIsModalOpen(true);
            }}
          />
        )}
      </main>

      {/* 削除確認モーダル */}
      <DeleteConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />

      <Footer />
    </div>
  );
};

export default LeaguePage;

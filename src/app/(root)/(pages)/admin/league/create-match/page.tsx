"use client";
import React, { useState, useEffect } from "react";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { useRouter } from "next/navigation";
import { MdArrowBack, MdSave } from "react-icons/md";
import { LeagueInfo, LeagueTeam } from "@/types/league";

const CreateMatchPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leagues, setLeagues] = useState<LeagueInfo[]>([]);
  const [teams, setTeams] = useState<LeagueTeam[]>([]);
  const [formData, setFormData] = useState({
    leagueId: "",
    matchDate: new Date().toISOString().slice(0, 16),
    homeTeam: "",
    awayTeam: "",
    homeScore: 0,
    awayScore: 0,
    venue: "",
    notes: "",
  });

  // リーグ一覧を取得
  useEffect(() => {
    fetchLeagues();
  }, []);

  // リーグが選択されたらチーム一覧を取得
  useEffect(() => {
    if (formData.leagueId) {
      fetchTeams(formData.leagueId);
    }
  }, [formData.leagueId]);

  const fetchLeagues = async () => {
    try {
      const response = await fetch("/api/leagues");
      const result = await response.json();
      if (result.success && result.data.length > 0) {
        setLeagues(result.data);
        setFormData((prev) => ({ ...prev, leagueId: result.data[0]._id }));
      }
    } catch (error) {
      console.error("リーグ取得エラー:", error);
    }
  };

  const fetchTeams = async (leagueId: string) => {
    try {
      const response = await fetch(`/api/teams?leagueId=${leagueId}`);
      const result = await response.json();
      if (result.success) {
        setTeams(result.data);
        if (result.data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            homeTeam: result.data[0].teamName,
            awayTeam: result.data[0].teamName,
          }));
        }
      }
    } catch (error) {
      console.error("チーム取得エラー:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.homeTeam === formData.awayTeam) {
      alert("ホームチームとアウェイチームは異なるチームを選択してください");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/match-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("試合結果を登録しました");
        router.push("/admin/league");
      } else {
        alert(`登録失敗: ${result.error}`);
      }
    } catch (error) {
      console.error("登録エラー:", error);
      alert("登録中にエラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (leagues.length === 0) {
    return (
      <div className="min-h-screen flex flex-col w-full bg-neutral-900">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 mt-20 max-w-3xl">
          <div className="bg-neutral-800 rounded-lg p-8 text-center">
            <p className="text-white-1 text-xl mb-4">
              リーグ情報が登録されていません
            </p>
            <p className="text-neutral-400 mb-6">
              試合結果を登録する前に、リーグ情報とチームを登録してください
            </p>
            <button
              onClick={() => router.push("/admin/league/create-league")}
              className="px-6 py-3 bg-green-600 text-white-1 rounded-lg hover:bg-green-700 transition-colors"
            >
              リーグ情報を登録
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="min-h-screen flex flex-col w-full bg-neutral-900">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 mt-20 max-w-3xl">
          <div className="bg-neutral-800 rounded-lg p-8 text-center">
            <p className="text-white-1 text-xl mb-4">
              チーム情報が登録されていません
            </p>
            <p className="text-neutral-400 mb-6">
              試合結果を登録する前に、チームを登録してください
            </p>
            <button
              onClick={() => router.push("/admin/league/create-team")}
              className="px-6 py-3 bg-green-600 text-white-1 rounded-lg hover:bg-green-700 transition-colors"
            >
              チームを登録
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full bg-neutral-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 mt-20 max-w-3xl">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-neutral-400 hover:text-white-1 mb-4 transition-colors"
          >
            <MdArrowBack size={24} />
            戻る
          </button>
          <h1 className="text-4xl font-bold text-white-1 mb-2">試合結果登録</h1>
          <p className="text-neutral-400">新しい試合結果を登録します</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* リーグ選択 */}
          <div>
            <label className="block text-white-1 font-semibold mb-2">
              リーグ <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.leagueId}
              onChange={(e) =>
                setFormData({ ...formData, leagueId: e.target.value })
              }
              required
              className="w-full px-4 py-3 bg-neutral-800 text-white-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {leagues.map((league) => (
                <option key={league._id} value={league._id}>
                  {league.title} ({league.year}年度)
                </option>
              ))}
            </select>
          </div>

          {/* 試合日時 */}
          <div>
            <label className="block text-white-1 font-semibold mb-2">
              試合日時 <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              value={formData.matchDate}
              onChange={(e) =>
                setFormData({ ...formData, matchDate: e.target.value })
              }
              required
              className="w-full px-4 py-3 bg-neutral-800 text-white-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* ホームチーム */}
          <div>
            <label className="block text-white-1 font-semibold mb-2">
              ホームチーム <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.homeTeam}
              onChange={(e) =>
                setFormData({ ...formData, homeTeam: e.target.value })
              }
              required
              className="w-full px-4 py-3 bg-neutral-800 text-white-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {teams.map((team) => (
                <option key={team._id} value={team.teamName}>
                  {team.teamName}
                </option>
              ))}
            </select>
          </div>

          {/* ホームスコア */}
          <div>
            <label className="block text-white-1 font-semibold mb-2">
              ホームスコア <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.homeScore}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  homeScore: parseInt(e.target.value),
                })
              }
              required
              min="0"
              className="w-full px-4 py-3 bg-neutral-800 text-white-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* アウェイチーム */}
          <div>
            <label className="block text-white-1 font-semibold mb-2">
              アウェイチーム <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.awayTeam}
              onChange={(e) =>
                setFormData({ ...formData, awayTeam: e.target.value })
              }
              required
              className="w-full px-4 py-3 bg-neutral-800 text-white-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {teams.map((team) => (
                <option key={team._id} value={team.teamName}>
                  {team.teamName}
                </option>
              ))}
            </select>
          </div>

          {/* アウェイスコア */}
          <div>
            <label className="block text-white-1 font-semibold mb-2">
              アウェイスコア <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.awayScore}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  awayScore: parseInt(e.target.value),
                })
              }
              required
              min="0"
              className="w-full px-4 py-3 bg-neutral-800 text-white-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* 会場 */}
          <div>
            <label className="block text-white-1 font-semibold mb-2">
              会場
            </label>
            <input
              type="text"
              value={formData.venue}
              onChange={(e) =>
                setFormData({ ...formData, venue: e.target.value })
              }
              placeholder="○○グラウンド"
              className="w-full px-4 py-3 bg-neutral-800 text-white-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* 備考 */}
          <div>
            <label className="block text-white-1 font-semibold mb-2">
              備考
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={3}
              placeholder="試合の詳細情報"
              className="w-full px-4 py-3 bg-neutral-800 text-white-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          {/* ボタン */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 bg-neutral-700 text-white-1 rounded-lg hover:bg-neutral-600 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white-1 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MdSave size={24} />
              {isSubmitting ? "登録中..." : "登録"}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CreateMatchPage;

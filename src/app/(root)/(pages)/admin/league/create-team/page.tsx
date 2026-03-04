"use client";
import React, { useState, useEffect } from "react";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { useRouter } from "next/navigation";
import { MdArrowBack, MdSave } from "react-icons/md";
import { LeagueInfo } from "@/types/league";

const CreateTeamPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leagues, setLeagues] = useState<LeagueInfo[]>([]);
  const [formData, setFormData] = useState({
    leagueId: "",
    teamName: "",
  });

  // リーグ一覧を取得
  useEffect(() => {
    fetchLeagues();
  }, []);

  const fetchLeagues = async () => {
    try {
      const response = await fetch("/api/leagues");
      const result = await response.json();
      if (result.success) {
        setLeagues(result.data);
        if (result.data.length > 0) {
          setFormData((prev) => ({ ...prev, leagueId: result.data[0]._id }));
        }
      }
    } catch (error) {
      console.error("リーグ取得エラー:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("チーム情報を登録しました");
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
              チームを登録する前に、リーグ情報を登録してください
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
          <h1 className="text-4xl font-bold text-white-1 mb-2">チーム登録</h1>
          <p className="text-neutral-400">新しいチームを登録します</p>
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

          {/* チーム名 */}
          <div>
            <label className="block text-white-1 font-semibold mb-2">
              チーム名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.teamName}
              onChange={(e) =>
                setFormData({ ...formData, teamName: e.target.value })
              }
              required
              placeholder="FC.BICHO"
              className="w-full px-4 py-3 bg-neutral-800 text-white-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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

export default CreateTeamPage;

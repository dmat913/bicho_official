"use client";
import React, { useState } from "react";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { useRouter } from "next/navigation";
import { MdArrowBack, MdSave } from "react-icons/md";

const CreateLeaguePage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    title: "",
    season: "spring",
    division: "3部",
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leagues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("リーグ情報を登録しました");
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
          <h1 className="text-4xl font-bold text-white-1 mb-2">
            リーグ情報登録
          </h1>
          <p className="text-neutral-400">新しいリーグ情報を登録します</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 年度 */}
          <div>
            <label className="block text-white-1 font-semibold mb-2">
              年度 <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: parseInt(e.target.value) })
              }
              required
              min="2000"
              max="2100"
              className="w-full px-4 py-3 bg-neutral-800 text-white-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* タイトル */}
          <div>
            <label className="block text-white-1 font-semibold mb-2">
              タイトル <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              placeholder="2026年度社会人サッカー 埼玉県南部地区3部リーグ"
              className="w-full px-4 py-3 bg-neutral-800 text-white-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* シーズン */}
          <div>
            <label className="block text-white-1 font-semibold mb-2">
              シーズン <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.season}
              onChange={(e) =>
                setFormData({ ...formData, season: e.target.value })
              }
              required
              className="w-full px-4 py-3 bg-neutral-800 text-white-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="spring">春</option>
              <option value="autumn">秋</option>
              <option value="full">通年</option>
            </select>
          </div>

          {/* ディビジョン */}
          <div>
            <label className="block text-white-1 font-semibold mb-2">
              ディビジョン <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.division}
              onChange={(e) =>
                setFormData({ ...formData, division: e.target.value })
              }
              required
              className="w-full px-4 py-3 bg-neutral-800 text-white-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="1部">1部</option>
              <option value="2部">2部</option>
              <option value="3部">3部</option>
              <option value="4部">4部</option>
            </select>
          </div>

          {/* アクティブ */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              id="isActive"
              className="w-5 h-5 text-green-600 bg-neutral-800 rounded focus:ring-green-500"
            />
            <label htmlFor="isActive" className="text-white-1">
              アクティブなリーグとして設定
            </label>
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

export default CreateLeaguePage;

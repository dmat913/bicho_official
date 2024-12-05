"use client";
import { useState } from "react";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { fetchSchedules } from "@/utils/image";
import { useSetRecoilState } from "recoil";
import { scheduleState } from "@/recoil/atom/schedule";
import { useRouter } from "next/navigation";

const CreateSchedulePage = () => {
  const router = useRouter();

  // 試合日程setState
  const setSchedules = useSetRecoilState(scheduleState);

  const [formData, setFormData] = useState({
    date: "",
    title: "",
    description: "",
    teamName: "",
    thumbnail: "",
    location: "",
    scorer: [""],
    result: "",
    pk: "",
    kickoffTime: "",
  });

  // フォームの入力値を更新する関数
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (name === "scorer") {
      if (index !== undefined) {
        const updatedArray = [...formData.scorer];
        updatedArray[index] = value;
        setFormData({ ...formData, scorer: updatedArray });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // scorerの項目を追加する関数
  const addScorer = () => {
    setFormData({ ...formData, scorer: [...formData.scorer, ""] });
  };

  // フォームを送信する関数
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("試合日程が追加されました。");
      }
      await loadSchedules();
    } catch (error) {
      console.log(error);
      alert("試合日程の作成に失敗しました");
    }
  };

  // 画像一覧を再取得する処理
  const loadSchedules = async () => {
    try {
      const data = await fetchSchedules();
      setSchedules(data);
      setFormData({
        date: "",
        title: "",
        description: "",
        teamName: "",
        thumbnail: "",
        location: "",
        scorer: [""],
        result: "",
        pk: "",
        kickoffTime: "",
      });
    } catch (error) {
      alert("画像の取得に失敗しました:");
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <Header />
      <div className="pl-4 mt-4 flex items-center gap-2">
        <span className="text-2xl font-bold">試合日程追加</span>
        <span className="text-xs">
          <span className="text-red-600">*</span>必須項目
        </span>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <label className="block font-medium">
            <span className="text-red-600">*</span>日付
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">
            <span className="text-red-600">*</span>キックオフ時間
          </label>
          <input
            type="time"
            name="kickoffTime"
            value={formData.kickoffTime}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">
            <span className="text-red-600">*</span>大会名
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">
            <span className="text-red-600">*</span>ラウンド・節
          </label>
          <input
            name="description"
            placeholder="一回戦/第1節"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">
            <span className="text-red-600">*</span>対戦相手名
          </label>
          <input
            type="text"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">
            <span className="text-red-600">*</span>場所
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">結果</label>
          <input
            type="text"
            name="result"
            value={formData.result}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="2-1"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">PK</label>
          <input
            type="text"
            name="pk"
            value={formData.pk}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="2-1"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">スコアラー</label>
          {formData.scorer.map((score, index) => (
            <input
              key={index}
              type="text"
              name="scorer"
              value={score}
              onChange={(e) => handleChange(e, index)}
              className="border p-2 w-full mt-2"
              placeholder="4,賀川優斗"
            />
          ))}
          <button
            type="button"
            onClick={addScorer}
            className="text-green-1 mt-2"
          >
            + 追加
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/schedule")}
            className="bg-green-1 text-white-1 py-2 px-4 rounded"
          >
            戻る
          </button>
          <button
            type="submit"
            className="bg-green-1 text-white-1 py-2 px-4 rounded"
          >
            作成
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default CreateSchedulePage;

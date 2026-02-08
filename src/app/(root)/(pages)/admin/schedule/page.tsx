"use client";
import React, { useState } from "react";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { useSchedules } from "@/hooks/useSchedules";
import { updateTargetScheduleState } from "@/recoil/atom/schedule";
import { useSetRecoilState } from "recoil";
import BichoLogo from "@/public/bicho-icon.png";
import { formatDate, getLogo } from "@/utils/date";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ScheduleData } from "@/types/schedule";
import {
  MdDeleteOutline,
  MdEdit,
  MdAdd,
  MdDateRange,
  MdPlace,
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import HomeLoading from "@/features/home/loading/HomeLoading";

const SchedulePage = () => {
  const router = useRouter();

  // 試合日程取得
  const { schedules, setSchedules, isLoading } = useSchedules();

  // モーダルの状態
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(
    null,
  );

  // 日程更新対象
  const setUpdateTargetSchedule = useSetRecoilState(updateTargetScheduleState);

  const today = new Date();

  // 編集アイコン押下時
  const handleClickEditButton = (schedule: ScheduleData) => {
    setUpdateTargetSchedule(schedule);
    router.push("/admin/schedule/edit");
  };

  // 削除アイコン押下時
  const handleClickDeleteButton = (e: React.MouseEvent, scheduleId: string) => {
    e.stopPropagation();
    setSelectedScheduleId(scheduleId);
    setIsModalOpen(true);
  };

  // 削除処理
  const handleDelete = async () => {
    if (!selectedScheduleId) return;

    try {
      const response = await fetch(`/api/schedule?_id=${selectedScheduleId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("削除しました");
        setSchedules((schedules) =>
          schedules.filter((row) => row._id !== selectedScheduleId),
        );
      } else {
        const errorData = await response.json();
        alert(`削除失敗: ${errorData.message}`);
      }
    } catch (error) {
      console.error("削除エラー:", error);
      alert("削除中にエラーが発生しました");
    } finally {
      handleCloseModal();
    }
  };

  // modal閉じる処理
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedScheduleId(null);
  };

  if (isLoading) {
    return <HomeLoading />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">試合日程管理</h1>
            <p className="text-gray-500 text-sm mt-1">
              スケジュールの登録・編集・削除が行えます
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/schedule/create")}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-500 text-white-1 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold"
          >
            <MdAdd size={24} />
            <span>新規スケジュール作成</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
            {schedules.map((schedule, index) => {
              const isFinished = new Date(schedule.date) < today;
              const hasResult = schedule.result !== "";

              return (
                <motion.div
                  key={schedule._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white-1 rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 group"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      {/* メイン情報 */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                              {schedule.title}
                              {isFinished && (
                                <span
                                  className={`text-[10px] px-2 py-0.5 rounded-full border ${hasResult ? "bg-gray-100 text-gray-600 border-gray-200" : "bg-red-50 text-red-600 border-red-100"}`}
                                >
                                  {hasResult ? "終了" : "結果未入力"}
                                </span>
                              )}
                            </h2>
                            <p className="text-sm text-gray-500">
                              {schedule.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 lg:hidden">
                            <button
                              onClick={() => handleClickEditButton(schedule)}
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                            >
                              <MdEdit size={22} />
                            </button>
                            <button
                              onClick={(e) =>
                                handleClickDeleteButton(e, schedule._id)
                              }
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            >
                              <MdDeleteOutline size={22} />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                            <MdDateRange className="text-green-500" />
                            <span className="font-medium">
                              {formatDate(schedule.date, schedule.kickoffTime)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                            <MdPlace className="text-green-500" />
                            <span>{schedule.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* 対戦カード表示 */}
                      <div className="flex items-center justify-center lg:justify-end gap-2 sm:gap-6 py-4 lg:py-0 border-t lg:border-t-0 border-gray-100 lg:border-l lg:pl-8 min-w-[300px]">
                        {/* Bicho */}
                        <div className="flex flex-col items-center gap-2 w-20">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500/10 rounded-full flex items-center justify-center p-2">
                            <Image
                              src={BichoLogo}
                              alt="FC.Bicho"
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                          <span className="text-xs font-bold text-gray-700">
                            FC.BICHO
                          </span>
                        </div>

                        {/* VS / Score */}
                        <div className="flex flex-col items-center justify-center w-24">
                          {hasResult ? (
                            <>
                              <div className="text-3xl font-black text-gray-800 tracking-tight">
                                {schedule.result}
                              </div>
                              {schedule.pk && schedule.pk !== "" && (
                                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded mt-1">
                                  PK: {schedule.pk}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-2xl font-black text-gray-300 italic">
                              VS
                            </span>
                          )}
                        </div>

                        {/* Opponent */}
                        <div className="flex flex-col items-center gap-2 w-20">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 rounded-full flex items-center justify-center p-2 overflow-hidden">
                            {getLogo(schedule.teamName) !== "" ? (
                              <Image
                                src={getLogo(schedule.teamName)}
                                alt={schedule.teamName}
                                width={40}
                                height={40}
                                className="object-contain w-full h-full"
                              />
                            ) : (
                              <div className="w-full h-full rounded-full bg-gray-200" />
                            )}
                          </div>
                          <span className="text-xs font-bold text-gray-700 text-center line-clamp-1">
                            {schedule.teamName}
                          </span>
                        </div>
                      </div>

                      {/* PC用アクションボタン */}
                      <div className="hidden lg:flex flex-col gap-2 border-l border-gray-100 pl-6">
                        <button
                          onClick={() => handleClickEditButton(schedule)}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                        >
                          <MdEdit size={18} />
                          編集
                        </button>
                        <button
                          onClick={(e) =>
                            handleClickDeleteButton(e, schedule._id)
                          }
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <MdDeleteOutline size={18} />
                          削除
                        </button>
                      </div>
                    </div>

                    {/* 得点者 (ある場合) */}
                    {hasResult && schedule.scorer.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-start gap-3">
                        <span className="text-xs font-bold text-white-1 bg-green-600 px-2 py-1 rounded">
                          GOAL
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {schedule.scorer.map((scorer, i) => (
                            <span
                              key={i}
                              className="text-sm text-gray-600 flex items-center"
                            >
                              {scorer}
                              {i < schedule.scorer.length - 1 && (
                                <span className="mx-2 text-gray-300">/</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </main>

      <Footer />

      {/* 削除確認モーダル */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white-1 rounded-2xl shadow-2xl w-full max-w-md p-6 relative z-10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-red-500" />
              <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <div className="p-2 bg-red-100 text-red-600 rounded-full">
                  <MdDeleteOutline size={24} />
                </div>
                削除の確認
              </h2>
              <p className="text-gray-600 mt-4 mb-8 leading-relaxed">
                この試合スケジュールを削除してもよろしいですか？
                <br />
                <span className="text-xs text-gray-400">
                  ※この操作は取り消せません。
                </span>
              </p>

              <div className="flex justify-end gap-3">
                <button
                  className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors"
                  onClick={handleCloseModal}
                >
                  キャンセル
                </button>
                <button
                  className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white-1 rounded-xl font-bold shadow-md hover:shadow-lg transition-all transform active:scale-95"
                  onClick={handleDelete}
                >
                  削除する
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SchedulePage;

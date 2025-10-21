"use client";
import React, { useState } from "react";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import {
  scheduleState,
  updateTargetScheduleState,
} from "@/recoil/atom/schedule";
import { useRecoilState, useSetRecoilState } from "recoil";
import BichoLogo from "@/public/bicho-icon.png";
import { formatDate, getLogo } from "@/utils/date";
import DHorizontalLine from "@/components/elements/DHorizontalLine";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ScheduleData } from "@/types/schedule";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const SchedulePage = () => {
  const router = useRouter();

  // モーダルの状態
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(
    null
  );

  // 日程更新対象
  const setUpdateTargetSchedule = useSetRecoilState(updateTargetScheduleState);

  // 試合日程取得
  const [schedules, setSchedules] = useRecoilState(scheduleState);
  const today = new Date();

  // 編集アイコン押下時
  const handleClickEditButton = (schedule: ScheduleData) => {
    setUpdateTargetSchedule(schedule);
    router.push("/admin/schedule/edit");
  };

  // 削除アイコン押下時
  const handleClickDeleteButton = (scheduleId: string) => {
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
          schedules.filter((row) => row._id !== selectedScheduleId)
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

  return (
    <>
      <div className="relative z-40 pt-24">
        <Header />
        <div className="p-4 relative">
          <div className="flex justify-start mb-4">
            <button
              className="bg-green-1 text-white-1 py-2 px-4 rounded"
              onClick={() => router.push("/admin/schedule/create")}
            >
              新規作成
            </button>
          </div>
          {schedules.map((schedule) => (
            <div
              key={schedule._id}
              className={`w-full py-4 border-t-2 relative`}
            >
              <CiEdit
                size={32}
                onClick={() => handleClickEditButton(schedule)}
                className="absolute top-2 left-0"
              />
              <MdDeleteOutline
                size={32}
                onClick={() => handleClickDeleteButton(schedule._id)}
                className="absolute top-2 right-0"
              />
              <div className="flex flex-col items-center">
                <span className="text-md">{schedule.title}</span>
                <span className="text-sm">{schedule.description}</span>
              </div>
              <div className="text-text-1 text-sm mt-2">
                <div className="flex items-center justify-between px-4">
                  <span>{formatDate(schedule.date, schedule.kickoffTime)}</span>
                  <a>
                    <span>{schedule.location}</span>
                  </a>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1 w-[100px] justify-end">
                    <span>Bicho</span>
                    <Image
                      src={BichoLogo}
                      alt="FC.Bichoロゴ"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="flex flex-col text-green-1">
                    <span className="text-3xl font-bold">
                      {schedule.result !== "" ? schedule.result : "VS"}
                    </span>
                    {schedule.pk && schedule.pk !== "" && (
                      <span className="text-xs">Pk: {schedule.pk}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-2 w-[100px]">
                    {getLogo(schedule.teamName) !== "" ? (
                      <Image
                        src={getLogo(schedule.teamName)}
                        alt={`${schedule.teamName}のロゴ`}
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div className="w-[40px] h-[40px] min-w-[40px] min-h-[40px] rounded-full bg-gray-300" />
                    )}
                    <div>
                      <span className="text-sm">{schedule.teamName}</span>
                    </div>
                  </div>
                </div>
                {new Date(schedule.date) < today &&
                  schedule.scorer.length > 0 && (
                    <div className="mt-4 w-full">
                      <DHorizontalLine />
                      <div className="flex">
                        <div className="bg-gray-400 text-xs flex items-center justify-center text-white-1 w-[60px]">
                          <span>得点者</span>
                        </div>
                        <div className="pl-4">
                          {schedule.scorer.map((row, index) => (
                            <span key={index} className="text-sm text-gray-500">
                              {row}
                              {schedule.scorer.length - 1 !== index && ","}
                            </span>
                          ))}
                        </div>
                      </div>
                      <DHorizontalLine />
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
        <Footer />
        {/** 削除modal */}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-1 bg-opacity-50">
          <div className="bg-white-1 rounded-md shadow-lg w-[300px] p-6">
            <h2 className="text-lg font-bold text-gray-800">削除確認</h2>
            <p className="text-sm text-gray-600 mt-2">
              この日程を削除してもよろしいですか？
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="py-2 px-4 bg-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-400"
                onClick={handleCloseModal}
              >
                キャンセル
              </button>
              <button
                className="bg-green-1 text-white-1 py-2 px-4 rounded"
                onClick={handleDelete}
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SchedulePage;

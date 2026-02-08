"use client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { scheduleState } from "@/recoil/atom/schedule";
import { ScheduleData } from "@/types/schedule";

export const useSchedules = (initialData?: ScheduleData[]) => {
  const [schedules, setSchedules] = useRecoilState(scheduleState);
  const [isLoading, setIsLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      // 初期データがある場合は設定
      if (initialData && initialData.length > 0) {
        setSchedules(initialData);
        setIsLoading(false);
        return;
      }

      // すでにスケジュールが読み込まれている場合はスキップ
      if (schedules && schedules.length > 0) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/schedule", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`スケジュール取得に失敗しました: ${response.status}`);
        }

        const data = await response.json();
        setSchedules(data.schedules);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "スケジュールの取得中にエラーが発生しました";
        setError(errorMessage);
        console.error("スケジュール取得エラー:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedules();
    // eslint-disable-next-line
  }, [initialData]);

  return { schedules, setSchedules, isLoading, error };
};

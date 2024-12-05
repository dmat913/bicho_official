import { atom } from "recoil";
import { ScheduleData } from "@/types/schedule";

export const scheduleState = atom<ScheduleData[]>({
  key: "scheduleState",
  default: [],
});

// 更新対象スケジュール
export const updateTargetScheduleState = atom<ScheduleData | null>({
  key: "updateTargetScheduleState",
  default: null,
});

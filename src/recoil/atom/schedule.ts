import { atom } from "recoil";
import { ScheduleData } from "@/types/schedule";

export const scheduleState = atom<ScheduleData[]>({
  key: "scheduleState",
  default: [],
});

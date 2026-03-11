"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ImageData } from "@/types/image";
import { ScheduleData } from "@/types/schedule";

interface AppContextType {
  images: ImageData[];
  setImages: (images: ImageData[]) => void;
  schedules: ScheduleData[];
  setSchedules: (schedules: ScheduleData[]) => void;
  updateTargetSchedule: ScheduleData | null;
  setUpdateTargetSchedule: (schedule: ScheduleData | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [schedules, setSchedules] = useState<ScheduleData[]>([]);
  const [updateTargetSchedule, setUpdateTargetSchedule] =
    useState<ScheduleData | null>(null);

  return (
    <AppContext.Provider
      value={{
        images,
        setImages,
        schedules,
        setSchedules,
        updateTargetSchedule,
        setUpdateTargetSchedule,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

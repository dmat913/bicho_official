import { ImageData } from "@/types/image";
import { ScheduleData } from "@/types/schedule";

export const fetchImages = async (): Promise<ImageData[]> => {
  try {
    const response = await fetch("/api/image");
    if (!response.ok) {
      throw new Error("画像の取得に失敗しました");
    }

    const data: ImageData[] = await response.json();
    return data;
  } catch (error) {
    console.error("画像の取得エラー:", error);
    throw error;
  }
};

export const fetchAllImages = async (): Promise<ImageData[]> => {
  try {
    const response = await fetch("/api/image/all");
    if (!response.ok) {
      throw new Error("画像の取得に失敗しました");
    }

    const data: ImageData[] = await response.json();
    return data;
  } catch (error) {
    console.error("画像の取得エラー:", error);
    throw error;
  }
};

export const fetchSchedules = async (): Promise<ScheduleData[]> => {
  try {
    const response = await fetch("/api/schedule");
    if (!response.ok) {
      throw new Error("試合日程の取得に失敗しました");
    }

    const data: { message: string; schedules: ScheduleData[] } =
      await response.json();
    return data.schedules;
  } catch (error) {
    console.error("画像の取得エラー:", error);
    throw error;
  }
};

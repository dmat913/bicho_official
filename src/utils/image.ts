import { ImageData } from "@/types/image";

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

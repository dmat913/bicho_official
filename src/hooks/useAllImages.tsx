"use client";
import { useEffect, useState } from "react";
import { fetchAllImages } from "@/utils/image";
import { ImageData } from "@/types/image";

export const useAllImages = () => {
  const [allImages, setAllImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadImages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchAllImages();
      setAllImages(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "画像の取得中にエラーが発生しました";
      setError(errorMessage);
      console.error("画像取得エラー:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return { allImages, setAllImages, isLoading, error, refetch: loadImages };
};

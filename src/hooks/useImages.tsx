"use client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { imagesState } from "@/recoil/atom/image";
import { fetchFirstImage, fetchImages } from "@/utils/image";
import { ImageData } from "@/types/image";

export const useImages = (initialData?: ImageData[]) => {
  const [images, setImages] = useRecoilState(imagesState);
  const [isLoading, setIsLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      // 初期データがある場合は設定
      if (initialData && initialData.length > 0) {
        setImages(initialData);
        setIsLoading(false);
        return;
      }

      // すでに画像が読み込まれている場合はスキップ
      if (images.length > 0) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // 最初の画像を取得して即座に表示
        const firstData = await fetchFirstImage();
        setImages(firstData);

        // 残りの画像を取得
        const data = await fetchImages();
        setImages(data);
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

    loadImages();
    // eslint-disable-next-line
  }, [initialData]);

  return { images, setImages, isLoading, error };
};

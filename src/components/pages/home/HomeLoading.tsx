"use client";
import BichoLogo from "@/public/bicho-icon.png";
import Image from "next/image";
import { useEffect } from "react";
import { fetchImages } from "@/utils/image";
import { useSetRecoilState } from "recoil";
import { imagesState } from "@/recoil/atom/image";
import { scheduleState } from "@/recoil/atom/schedule";

const HomeLoading = ({
  setIsLoading,
}: {
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const setImages = useSetRecoilState(imagesState);
  const setSchedules = useSetRecoilState(scheduleState);

  // API呼び出し
  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await fetchImages();
        setImages(data);
        setIsLoading(false);
      } catch (error) {
        alert("画像取得中にエラーが発生しました:");
        console.log(error);
        setIsLoading(false);
      }
    };
    loadImages();
  }, [setImages, setIsLoading]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch("/api/schedule", { method: "GET" });

        if (!response.ok) throw new Error("データ取得に失敗しました");

        const data = await response.json();
        setSchedules(data.schedules);
      } catch (err) {
        console.log("日程取得エラー:", err);
      }
    };
    fetchSchedules();
  }, [setSchedules]);

  return (
    <div className="w-full h-full bg-noise-green-3 flex items-center justify-center">
      {/* アイコンを真ん中に固定表示 */}
      <Image
        src={BichoLogo}
        alt="Loading Icon"
        height={80}
        width={80}
        className="animate-bounceSlow"
      />
    </div>
  );
};

export default HomeLoading;

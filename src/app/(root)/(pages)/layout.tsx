"use client";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { imagesState } from "@/recoil/atom/image";
import { useRouter } from "next/navigation";
import { scheduleState } from "@/recoil/atom/schedule";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // Recoil の atom の状態を取得
  const images = useRecoilValue(imagesState);
  const setSchedules = useSetRecoilState(scheduleState);
  const router = useRouter();

  useEffect(() => {
    // データを取得する関数
    const fetchSchedules = async () => {
      try {
        const response = await fetch("/api/schedule", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("データ取得に失敗しました");
        }
        const data = await response.json();
        setSchedules(data.schedules);
      } catch (err) {
        console.log("日程取得エラー:", err);
      }
    };
    // データ取得を実行
    fetchSchedules();
  }, []);

  useEffect(() => {
    // images が空の場合、/ に遷移
    if (images.length === 0) {
      router.push("/");
    }
  }, [images, router]);

  return <>{images.length > 0 && children}</>;
};

export default Layout;

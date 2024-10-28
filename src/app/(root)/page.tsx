"use client";
import { useEffect, useState } from "react";
import { fetchImages } from "@/utils/image";
import { useSetRecoilState } from "recoil";
import { imagesState } from "@/recoil/atom/image";
import { useRouter } from "next/navigation";
import BichoLogo from "@/public/bicho-icon.png";
import Image from "next/image";

const ImageUpload: React.FC = () => {
  // 画像一覧 data
  const setImages = useSetRecoilState(imagesState);
  // ローディング状態
  const [isLoading, setIsLoading] = useState(true);
  // ルーター
  const router = useRouter();

  // 画像取得API呼び出し
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
    // eslint-disable-next-line
  }, []);

  // 画像取得が完了したら /home に遷移
  useEffect(() => {
    if (!isLoading) {
      router.push("/home");
    }
  }, [isLoading, router]);

  return (
    <div className="w-[100vw] h-[100svh] bg-noise-green-3 flex items-center justify-center">
      <Image
        src={BichoLogo}
        alt=""
        height={80}
        width={80}
        className="animate-bounceSlow"
      />
    </div>
  );
};

export default ImageUpload;

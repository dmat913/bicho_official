"use client";
import DLoading from "@/components/elements/DLoading";
import { imagesState } from "@/recoil/atom/image";
import { fetchImages } from "@/utils/image";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";

const UploadImage = () => {
  // アップロード対象の画像（base64）
  const [uploadImage, setUploadImage] = useState<string>("");
  // モーダルの表示フラグ
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // ローディング状態
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 画像一覧の状態を更新するためのRecoil
  const setImages = useSetRecoilState(imagesState);

  // アップロードボタンのクリック処理
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // ファイル選択時の処理（base64変換）
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadImage(reader.result as string);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // 画像一覧を再取得する処理
  const loadImages = async () => {
    try {
      const data = await fetchImages();
      setImages(data);
    } catch (error) {
      alert("画像の取得に失敗しました:");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 画像アップロード処理
  const handleUpload = async () => {
    if (!uploadImage) {
      alert("画像が選択されていません");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uploadImage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "アップロードに失敗しました");
      }

      alert("画像がアップロードされました");
      handleReset();
      await loadImages();
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  // リセット処理
  const handleReset = () => {
    setIsModalOpen(false);
    setUploadImage("");
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleButtonClick}
        className="w-full flex items-center justify-center p-4 bg-white-2 shadow-lg transition-all duration-300 active:opacity-70"
      >
        <span className="text-lg font-semibold text-green-1 mr-2">Upload</span>
        <IoCloudUploadOutline className="text-green-1 text-2xl" />
      </button>
      {/* ローディング表示 */}
      {isLoading && <DLoading />}
      {/* モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-[90vw] bg-white-1 p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-2">選択された画像</h2>
            <Image
              src={uploadImage}
              alt="Uploaded Preview"
              className="mb-4 w-full sm:max-h-[50svh] object-cover"
            />
            <button
              onClick={handleUpload}
              className="w-full p-2 bg-green-1 text-white-1 rounded transition duration-300 active:bg-green-2 disabled:opacity-30"
              disabled={isLoading}
            >
              画像をアップロード
            </button>
            <button
              onClick={handleReset}
              className="w-full p-2 mt-2 border border-gray-300 rounded transition duration-300 hover:bg-gray-100"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;

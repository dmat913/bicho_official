"use client";
import { imagesState } from "@/recoil/atom/image";
import { fetchImages } from "@/utils/image";
import { ChangeEvent, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";

const UploadImage = () => {
  // upload 対象 base64画像
  const [uploadImage, setUploadImage] = useState<string>("");
  // modal open flag
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // loading判定
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 画像一覧
  const setImages = useSetRecoilState(imagesState);

  // Upload Button押下時
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // file選択時,base64に変換
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

  // 画像一覧取得
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

  // アップロードボタン押下時
  const handleUpload = async () => {
    if (!uploadImage) {
      alert("画像が選択されていません");
      return;
    }
    setIsLoading(true);
    try {
      // API呼び出し
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uploadImage }),
      });

      if (!response.ok) {
        // レスポンスがエラーの場合
        const errorData = await response.json();
        throw new Error(errorData.message || "アップロードに失敗しました");
      }
      alert("画像がアップロードされました");
      loadImages();
      handleReset();
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  // state reset
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
        className="w-full flex items-center justify-center p-4 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
      >
        <span className="text-lg font-semibold text-green-1 mr-2">Upload</span>
        <IoCloudUploadOutline className="text-green-1 text-2xl" />
      </button>
      {/* モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-[90vw] bg-white-1 p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-2">選択された画像</h2>
            <img
              src={uploadImage}
              alt="Uploaded Preview"
              className="mb-4 w-full sm:max-h-[50svh] object-cover"
            />
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-[#006036] rounded-full"></div>
              </div>
            ) : (
              <button
                onClick={handleUpload}
                className="w-full p-2 bg-green-1 text-white-1 rounded transition duration-300 active:bg-green-2"
              >
                画像をアップロード
              </button>
            )}
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

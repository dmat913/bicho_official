"use client";
import Image from "next/image";
import DLoading from "@/components/elements/DLoading";
import { imagesState } from "@/recoil/atom/image";
import { fetchImages } from "@/utils/image";
import { ChangeEvent, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";

const UploadImage = () => {
  // アップロード対象のメディア（base64）
  const [uploadImage, setUploadImage] = useState<string>("");
  // ファイルタイプ（image or video）
  const [fileType, setFileType] = useState<"image" | "video">("image");
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
      // ファイルサイズチェック（30MB = 30 * 1024 * 1024 bytes）
      // Base64エンコード後は約1.37倍（約41MB）になります
      // MongoDBのドキュメントサイズ制限(16MB)も考慮が必要です
      const maxSize = 30 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(
          `ファイルサイズが大きすぎます。${Math.round(maxSize / 1024 / 1024)}MB以下のファイルを選択してください。\n現在のファイルサイズ: ${Math.round(file.size / 1024 / 1024)}MB`,
        );
        return;
      }

      // ファイルタイプを判定
      if (file.type.startsWith("image/")) {
        setFileType("image");
      } else if (file.type.startsWith("video/")) {
        setFileType("video");
      } else {
        alert("画像または動画ファイルを選択してください");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setUploadImage(reader.result as string);
        setIsModalOpen(true);
      };
      reader.onerror = () => {
        alert("ファイルの読み込みに失敗しました");
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
      alert("ファイルが選択されていません");
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
        const errorData = await response.json().catch(() => ({
          message: `サーバーエラー (${response.status})`,
        }));
        throw new Error(errorData.message || "アップロードに失敗しました");
      }

      alert(
        `${fileType === "image" ? "画像" : "動画"}がアップロードされました`,
      );
      handleReset();
      await loadImages();
    } catch (error) {
      console.error("アップロードエラー:", error);
      alert(
        error instanceof Error ? error.message : "アップロードに失敗しました",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // リセット処理
  const handleReset = () => {
    setIsModalOpen(false);
    setUploadImage("");
    setFileType("image");
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*,video/*"
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
            <h2 className="text-lg font-bold mb-2">
              選択された{fileType === "image" ? "画像" : "動画"}
            </h2>
            {fileType === "image" ? (
              <Image
                src={uploadImage}
                alt="アップロード予定の画像プレビュー"
                className="mb-4 w-full sm:max-h-[50svh] object-cover"
                width={800}
                height={600}
                priority
              />
            ) : (
              <video
                src={uploadImage}
                controls
                className="mb-4 w-full sm:max-h-[50svh] object-cover"
              />
            )}
            <button
              onClick={handleUpload}
              className="w-full p-2 bg-green-1 text-white-1 rounded transition duration-300 active:bg-green-2 disabled:opacity-30"
              disabled={isLoading}
            >
              {fileType === "image" ? "画像" : "動画"}をアップロード
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

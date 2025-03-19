"use client";
import Header from "@/components/layout/header/Header";
import React, { useState } from "react";
import { ImageData } from "@/types/image";
import { fetchImages } from "@/utils/image";
import { useRecoilState } from "recoil";
import { imagesState } from "@/recoil/atom/image";
import DLoading from "@/components/elements/DLoading";
import Footer from "@/components/layout/footer/Footer";
import UploadImage from "@/features/photo/upload-image/UploadImage";
import Image from "next/image";

const PhotoList = () => {
  // 画像一覧
  const [images, setImages] = useRecoilState(imagesState);
  // モーダル表示のための状態
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // ローディング状態
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 画像削除処理
  const handleDelete = async () => {
    if (!selectedImage) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/image?id=${selectedImage._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "画像の削除に失敗しました");
      }
      alert("画像が削除されました");
      handleCloseModal();
      // 画像を再取得して更新
      const updatedImages = await fetchImages();
      setImages(updatedImages);
      // モーダルを閉じる
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  // モーダルを閉じる
  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  // 画像クリックでモーダルを開く
  const handleImageClick = (image: ImageData) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Header />
      <UploadImage />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-3 bg-white-1">
        {images.map((image) => (
          <Image
            src={image.data}
            alt={`Uploaded image ${image._id}`}
            key={image._id}
            className="object-cover !w-full !h-40 rounded-lg shadow-md"
            onClick={() => handleImageClick(image)}
            width={0}
            height={0}
          />
        ))}
      </div>
      {/* ローディング表示 */}
      {isLoading && <DLoading />}

      {/* モーダル */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white-1 p-4 rounded shadow-lg w-[90vw] sm:w-[400px]">
            <h2 className="text-lg font-bold mb-2">画像を削除しますか？</h2>
            <Image
              src={selectedImage.data}
              alt={`Selected image ${selectedImage._id}`}
              className="mb-4 !w-full !h-40 object-cover rounded"
              width={0}
              height={0}
            />
            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                className="p-2 bg-green-1 text-white-1 rounded w-[45%] transition duration-300 active:bg-green-2 disabled:opacity-30"
                disabled={isLoading}
              >
                削除
              </button>
              <button
                onClick={handleCloseModal}
                className="p-2 bg-white-1 border border-gray-300 text-green-1 rounded w-[45%] transition duration-300 active:bg-gray-400"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PhotoList;

"use client";
import Header from "@/components/header/Header";
import React, { useEffect, useState } from "react";
import { ImageData } from "@/types/image";
import UploadImage from "@/components/pages/photoList/UploadImage";
import { fetchImages } from "@/utils/image";

const PhotoList = () => {
  // 画像一覧
  const [images, setImages] = useState<ImageData[]>([]);
  // モーダル表示のための状態
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 画像取得API呼び出し
  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await fetchImages();
        setImages(data);
      } catch (_error) {
        alert("画像取得中にエラーが発生しました:");
      }
    };
    loadImages();
  }, []);

  // 画像削除処理
  const handleDelete = async () => {
    if (!selectedImage) return;
    try {
      const response = await fetch(`/api/image?id=${selectedImage._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "画像の削除に失敗しました");
      }
      alert("画像が削除されました");
      // 画像を再取得して更新
      const updatedImages = await fetchImages();
      setImages(updatedImages);
      // モーダルを閉じる
      handleCloseModal();
    } catch (error) {
      alert(error);
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-3">
        {images.map((image) => (
          <img
            src={image.data}
            alt={`Uploaded image ${image._id}`}
            key={image._id}
            className="object-cover w-full h-40 rounded-lg shadow-md"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>

      {/* モーダル */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white-1 p-4 rounded shadow-lg w-[90vw] sm:w-[400px]">
            <h2 className="text-lg font-bold mb-2">画像を削除しますか？</h2>
            <img
              src={selectedImage.data}
              alt={`Selected image ${selectedImage._id}`}
              className="mb-4 w-full h-40 object-cover rounded"
            />
            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                className="p-2 bg-green-1 text-white-1 rounded w-[45%] transition duration-300 active:bg-green-2"
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
    </div>
  );
};

export default PhotoList;

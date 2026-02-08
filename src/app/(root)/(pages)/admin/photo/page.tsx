"use client";
import Header from "@/components/layout/header/Header";
import React, { useState } from "react";
import { ImageData } from "@/types/image";
import { fetchAllImages } from "@/utils/image";
import { useAllImages } from "@/hooks/useAllImages";
import DLoading from "@/components/elements/DLoading";
import Footer from "@/components/layout/footer/Footer";
import UploadImage from "@/features/photo/upload-image/UploadImage";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MdDeleteOutline, MdZoomIn } from "react-icons/md";
import HomeLoading from "@/features/home/loading/HomeLoading";

const PhotoList = () => {
  // 画像一覧
  const { allImages, setAllImages, isLoading } = useAllImages();
  // モーダル表示のための状態
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // ローディング状態
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // 画像削除処理
  const handleDelete = async () => {
    if (!selectedImage) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/image?id=${selectedImage._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "画像の削除に失敗しました");
      }

      handleCloseModal();
      // 画像を再取得して更新
      const updatedImages = await fetchAllImages();
      setAllImages(updatedImages);
      // モーダルを閉じる
    } catch (error) {
      alert(error);
    } finally {
      setIsDeleting(false);
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

  if (isLoading) {
    return <HomeLoading />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">ギャラリー管理</h1>
            <p className="text-gray-500 text-sm mt-1">
              写真のアップロード・削除が行えます
            </p>
          </div>
        </div>

        <div className="mb-12">
          <UploadImage />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {allImages.map((image, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                key={image._id}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-100"
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={image.data}
                  alt={`Uploaded image ${image._id}`}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  width={400}
                  height={400}
                />

                {/* オーバーレイ */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                  <span className="p-3 bg-white-1/10 backdrop-blur-sm rounded-full text-white-1 hover:bg-white-1/20 transition-colors">
                    <MdZoomIn size={24} />
                  </span>
                  <span className="p-3 bg-red-500/80 backdrop-blur-sm rounded-full text-white-1 hover:bg-red-500 transition-colors">
                    <MdDeleteOutline size={24} />
                  </span>
                  <span className="text-white-1 text-xs font-medium px-2 py-1 rounded bg-black/20 backdrop-blur-sm mt-2">
                    クリックして削除
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* ローディング表示 */}
      {isDeleting && <DLoading />}

      {/* 削除モーダル */}
      <AnimatePresence>
        {isModalOpen && selectedImage && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white-1 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden relative z-10"
            >
              <div className="relative aspect-video w-full bg-gray-100">
                <Image
                  src={selectedImage.data}
                  alt={`Selected image ${selectedImage._id}`}
                  className="object-contain w-full h-full"
                  fill
                />
                <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/50 to-transparent" />
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-white-1 hover:text-gray-200 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <MdDeleteOutline className="text-red-500" />
                  画像を削除しますか？
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  この操作は取り消せません。本当に削除してもよろしいですか？
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleCloseModal}
                    className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors text-sm"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white-1 rounded-xl font-bold shadow-md hover:shadow-lg transition-all transform active:scale-95 text-sm"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "削除中..." : "削除する"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default PhotoList;

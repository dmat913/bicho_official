"use client";
import Header from "@/components/header/Header";
import React, { useEffect, useState } from "react";
import { ImageData } from "@/types/image";
import UploadImage from "@/components/pages/photoList/UploadImage";

const PhotoList = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/image");
      if (!response.ok) {
        throw new Error("画像の取得に失敗しました");
      }

      const data: ImageData[] = await response.json();
      setImages(data);
    } catch (error) {
      console.error("画像の取得エラー:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <Header />
      <UploadImage fetchImages={fetchImages} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
        {images.map((image) => (
          <img
            src={image.data}
            alt={`Uploaded image ${image._id}`}
            key={image._id}
            className="object-cover w-full h-40 rounded-lg shadow-md"
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoList;

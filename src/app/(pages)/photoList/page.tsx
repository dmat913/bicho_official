"use client";
import DHorizontalLine from "@/components/elements/DHorizontalLine";
import Header from "@/components/header/Header";
import NavBar from "@/components/nav/NavBar";
import React, { useEffect, useState } from "react";
import { ImageData } from "@/types/image";

const PhotoList = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
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

    fetchImages();
  }, []);
  return (
    <div>
      <Header />
      <DHorizontalLine />
      <NavBar />
      <div>
        {images.map((image) => (
          <img src={image.data} key={image._id} />
        ))}
      </div>
    </div>
  );
};

export default PhotoList;

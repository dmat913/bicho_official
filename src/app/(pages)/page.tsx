"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import Header from "@/components/header/Header";
import "swiper/swiper-bundle.css";
import NavBar from "@/components/nav/NavBar";
import DHorizontalLine from "@/components/elements/DHorizontalLine";
import { ImageData } from "@/types/image";

const ImageUpload: React.FC = () => {
  // 画像一覧 data
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
      <Swiper
        spaceBetween={1}
        slidesPerView={1}
        modules={[Autoplay, Pagination]} // 追記
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {images.map((image) => (
          <SwiperSlide key={image._id} className="md:h-[200px]">
            <img
              src={image.data}
              alt="Top Image"
              className="lg:h-[500px] md:h-[400px] h-[300px] object-cover w-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageUpload;

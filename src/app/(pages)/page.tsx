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
  // upload image data
  // const [uploadImage, setUploadImage] = useState<string>("");
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

  // アップロードボタン押下時
  // const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!uploadImage) {
  //     alert("画像が選択されていません");
  //     return;
  //   }
  //   // Api 呼び出し
  //   const response = await fetch("/api/image", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ uploadImage }),
  //   });
  //   if (response.ok) {
  //     alert("画像がアップロードされました");
  //     setUploadImage("");
  //     fetchImages();
  //   } else {
  //     alert("アップロードに失敗しました");
  //   }
  // };

  // // file選択時,base64に変換
  // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setUploadImage(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

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
              className="max-h-[600px] object-cover w-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageUpload;

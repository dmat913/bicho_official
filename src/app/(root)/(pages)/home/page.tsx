"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import Header from "@/components/header/Header";
import "swiper/swiper-bundle.css";
import NavBar from "@/components/nav/NavBar";
import DHorizontalLine from "@/components/elements/DHorizontalLine";
import { useRecoilValue } from "recoil";
import { imagesState } from "@/recoil/atom/image";

const ImageUpload: React.FC = () => {
  // 画像一覧 data
  const images = useRecoilValue(imagesState);

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

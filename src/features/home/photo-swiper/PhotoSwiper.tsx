"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import DPagination from "@/components/elements/DPagination";
import { useRecoilValue } from "recoil";
import { imagesState } from "@/recoil/atom/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const PhotoSwiper = () => {
  // 画像一覧
  const images = useRecoilValue(imagesState);
  // 表示中の画像index
  const [currentPage, setCurrentPage] = useState<number>(1);
  // 画面に入ったかどうかを監視するための参照
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div id="photo" className="py-10 px-4 bg-noise-green-1">
      <div className="flex flex-col items-center mb-4">
        {/* アニメーションを適用する要素 */}
        <motion.span
          ref={ref}
          className="text-gradient-2 font-bold text-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          THROUGH THE LENS
        </motion.span>
        <motion.span
          className="text-gradient-2 font-semibold"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          写真
        </motion.span>
      </div>
      <Swiper
        spaceBetween={1}
        slidesPerView={1}
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop={true}
        onSlideChange={(swiper) => setCurrentPage(swiper.realIndex + 1)}
      >
        {images.map((image) => (
          <SwiperSlide key={image._id} className="md:h-[200px]">
            <motion.img
              src={image.data}
              alt="Top Image"
              className="lg:h-[500px] md:h-[400px] h-[250px] object-cover w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex gap-1 bg-noise-green-1 justify-center py-3">
        <DPagination data={images} currentPage={currentPage - 1} />
      </div>
    </div>
  );
};

export default PhotoSwiper;

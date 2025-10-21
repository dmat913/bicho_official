"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
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
    <div
      id="photo"
      className="relative w-full px-4 py-16 bg-gradient-to-br from-neutral-50 to-green-50 overflow-hidden"
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20" />
      <div className="absolute top-20 left-20 w-32 h-32 bg-green-200/30 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent-gold/20 rounded-full blur-xl" />

      <div className="relative section-container max-w-6xl mx-auto">
        {/* モダンなタイトルセクション */}
        <motion.div
          ref={ref}
          className="text-center mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-accent-gold rounded-full" />
            <span className="text-green-700 font-medium text-sm tracking-widest uppercase">
              Through The Lens
            </span>
            <div className="w-16 h-1 bg-gradient-to-r from-accent-gold to-green-400 rounded-full" />
          </div>

          <motion.p
            className="text-neutral-600 font-semibold text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            写真
          </motion.p>
        </motion.div>
        {/* モダンなフォトギャラリー */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative max-w-4xl mx-auto">
            {/* メインフォトコンテナ */}
            <div className="relative bg-white-1 rounded-3xl shadow-2xl overflow-hidden p-2">
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                modules={[Autoplay, Pagination, EffectFade]}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                pagination={{
                  clickable: true,
                  bulletClass: "swiper-pagination-bullet !bg-green-500",
                  bulletActiveClass:
                    "swiper-pagination-bullet-active !bg-green-600 !scale-125",
                }}
                loop={true}
                effect="fade"
                onSlideChange={(swiper) => setCurrentPage(swiper.realIndex + 1)}
                className="rounded-2xl overflow-hidden"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={image._id}>
                    <div className="relative group">
                      <motion.img
                        src={image.data}
                        alt={`FC.BICHOチーム写真 ${
                          index + 1
                        } - サッカーチームの活動の様子`}
                        className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8 }}
                        loading={index < 2 ? "eager" : "lazy"}
                        decoding={index < 2 ? "sync" : "async"}
                      />

                      {/* グラデーションオーバーレイ */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black-1/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* 画像インデックス表示 */}
                      <div className="absolute top-4 right-4 bg-black-1/50 backdrop-blur-sm text-white-1 px-3 py-1 rounded-full text-sm font-medium">
                        {index + 1} / {images.length}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* カスタムページネーション */}
            <motion.div
              className="flex justify-center mt-8 gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <DPagination data={images} currentPage={currentPage - 1} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PhotoSwiper;

"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import { useRecoilValue } from "recoil";
import { imagesState } from "@/recoil/atom/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PhotoSwiper = () => {
  // 画像一覧
  const images = useRecoilValue(imagesState);
  // 画面に入ったかどうかを監視するための参照
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      id="photo"
      className="relative w-full px-4 py-16 bg-gradient-to-br from-neutral-50 to-green-50 overflow-hidden"
    >
      {/* 背景装飾 */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-green-300/20 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-accent-gold/20 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="relative section-container max-w-7xl mx-auto">
        {/* モダンなタイトルセクション */}
        <motion.div
          ref={ref}
          className="text-center mb-12"
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
        </motion.div>

        {/* レスポンシブフォトギャラリー */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative">
            <Swiper
              modules={[Autoplay, Pagination, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 150,
                modifier: 1.5,
                slideShadows: false,
              }}
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
              className="w-full py-10 !overflow-visible"
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                640: {
                  slidesPerView: 1.8,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 2.5,
                  spaceBetween: 40,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={image._id} className="max-w-2xl">
                  {({ isActive }) => (
                    <motion.div
                      className={`relative group transition-all duration-500 ${
                        isActive ? "scale-100 z-10" : "scale-90 opacity-60"
                      }`}
                      whileHover={{ scale: isActive ? 1.02 : 0.92 }}
                    >
                      {/* カードコンテナ */}
                      <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={image.data}
                            alt={`FC.BICHOチーム写真 ${
                              index + 1
                            } - サッカーチームの活動の様子`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading={index < 3 ? "eager" : "lazy"}
                            decoding={index < 3 ? "sync" : "async"}
                          />

                          {/* グラデーションオーバーレイ */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* ボトムバー */}
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </div>
                    </motion.div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PhotoSwiper;

import { motion, useInView } from "framer-motion";
import { memo, useRef } from "react";
// import BICHOLOGO from "@/public/bicho-icon.png";
// import Image from "next/image";
import backgroundImage from "@/public/background.jpeg";

const AboutBicho = () => {
  // 画面に入ったかどうかを監視するための参照
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="relative py-6 px-4 h-[50vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.85,
      }}
    >
      {/* 半透明のオーバーレイ */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="flex flex-col items-center">
        {/* アニメーションを適用する要素 */}
        {/* <motion.span
          ref={ref}
          className="text-gradient-3 font-bold text-3xl text-shadow"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          ABOUT BICHO
        </motion.span> */}
      </div>
      <motion.span
        className="text-white-1 font-bold z-10 text-shadow text-4xl lg:text-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        FC BICHO
        <br />
        SINCE 2005
      </motion.span>
    </div>
  );
};

export default memo(AboutBicho);

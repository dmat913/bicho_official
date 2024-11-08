import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BICHOLOGO from "@/public/bicho-icon.png";
import Image from "next/image";
import backgroundImage from "@/public/background.jpeg"; // 背景画像をインポート

const AboutBicho = () => {
  // 画面に入ったかどうかを監視するための参照
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="relative py-10 px-4 flex flex-col items-center  bg-noise-green-1"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.8, // 背景を少し透過
      }}
    >
      {/* 半透明のオーバーレイ */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <motion.span
        className="text-green-1 font-bold text-2xl z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        ABOUT BICHO
      </motion.span>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="z-10"
      >
        <Image src={BICHOLOGO} alt="Bicho Logo" width={80} height={80} />
      </motion.div>

      <motion.span
        className="text-white-1 text-centerd mt-4 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        FC.BICHOは、2005年に創設され、川口市を拠点に活動している社会人サッカーチームです。
        <br />
        埼玉県川口市の社会人1部リーグに所属しており、県3部リーグへの昇格を目標に活動しています。
      </motion.span>
    </div>
  );
};

export default AboutBicho;

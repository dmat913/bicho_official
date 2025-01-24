import { motion, useInView } from "framer-motion";
import { memo, useRef } from "react";
import BICHOLOGO from "@/public/bicho-icon.png";
import Image from "next/image";
import backgroundImage from "@/public/background.jpeg";

const AboutBicho = () => {
  // 画面に入ったかどうかを監視するための参照
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="relative py-6 px-4 flex flex-col gap-16 items-center"
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
        <motion.span
          ref={ref}
          className="text-gradient-3 font-bold text-2xl text-shadow"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          About BICHO
        </motion.span>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="z-10"
        >
          <Image src={BICHOLOGO} alt="Bicho Logo" width={100} height={100} />
        </motion.div>
      </div>
      <motion.span
        className="text-white-1 text-centerd z-10 text-shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        FC.BICHOは、2005年に創設され、川口市を拠点に活動している社会人サッカーチームです。
        <br />
        埼玉県川口市社会人1部リーグでの戦いを経て、県3部リーグへの昇格を決定しました。
        <br />
        2025年度からは県3部リーグで新たな挑戦に挑みます。
      </motion.span>
    </div>
  );
};

export default memo(AboutBicho);

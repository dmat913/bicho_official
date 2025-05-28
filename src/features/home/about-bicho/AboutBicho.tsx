import { motion, useInView } from "framer-motion";
import { memo, useRef, useEffect, useState } from "react";
import backgroundImage from "@/public/background.jpeg";

const rotatingTexts = [
  <>
    FC BICHO
    <br />
    SINCE 2005
  </>,
  <>
    <span className="text-sm">
      埼玉県川口市を拠点に活動しており、
      <br />
      埼玉県県南部地区3部リーグに所属しています。
    </span>
  </>,
  <>
    <span className="text-sm">
      県2部リーグへの昇格を目標に、
      <br />
      毎週日曜日活動を行っています。
    </span>
  </>,
];

const AboutBicho = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

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
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <motion.span
        key={textIndex} // これでアニメーションが切り替わるたびに再適用される
        className="text-white-1 font-bold z-10 text-shadow text-4xl lg:text-6xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {rotatingTexts[textIndex]}
      </motion.span>
    </div>
  );
};

export default memo(AboutBicho);

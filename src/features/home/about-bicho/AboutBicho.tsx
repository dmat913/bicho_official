import { motion, useInView } from "framer-motion";
import { memo, useRef, useEffect, useState } from "react";
import backgroundImage from "@/public/background.jpeg";

const rotatingTexts = [
  {
    title: "FC BICHO",
    subtitle: "SINCE 2005",
    description: "川口市を拠点とするサッカークラブ",
  },
];

const AboutBicho = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentText = rotatingTexts[textIndex];

  return (
    <div
      ref={ref}
      className="relative py-20 px-4 min-h-[60vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* グラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-green-900/60"></div>

      {/* 装飾的な要素 */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-green-500/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-16 right-16 w-32 h-32 bg-accent-gold/20 rounded-full blur-2xl"></div>

      {/* メインコンテンツ */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-white-1/10 backdrop-blur-sm border border-white-1/20 rounded-2xl px-6 py-3 mb-6">
            <span className="text-2xl">⚽</span>
            <span className="text-white-1 font-semibold text-sm uppercase tracking-wider">
              About Us
            </span>
          </div>
        </motion.div>

        {/* 回転するテキストコンテンツ */}
        <motion.div
          key={textIndex}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* メインタイトル */}
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white-1 mb-4 leading-tight"
          >
            {currentText.title}
          </motion.h2>

          {/* サブタイトル */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-accent-gold text-xl md:text-2xl font-semibold mb-6 tracking-wide"
          >
            {currentText.subtitle}
          </motion.div>

          {/* 説明文 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white-1/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            {currentText.description}
          </motion.p>
        </motion.div>

        {/* プログレスインジケーター */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-center gap-3 mt-12"
        >
          {rotatingTexts.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === textIndex
                  ? "w-8 bg-accent-gold"
                  : "w-2 bg-white-1/30 hover:bg-white-1/50"
              }`}
            />
          ))}
        </motion.div>

        {/* スクロールインジケーター */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white-1/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white-1/70 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(AboutBicho);

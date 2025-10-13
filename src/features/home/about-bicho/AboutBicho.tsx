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
      className="relative py-20 px-4 min-h-[60vh] flex items-end justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 可読性向上のためのオーバーレイ - グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

      {/* 装飾的な要素 */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-green-500/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-16 right-16 w-32 h-32 bg-accent-gold/20 rounded-full blur-2xl"></div>

      {/* メインコンテンツ */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* テキストコンテナの背景 */}
        <div className="relative bg-black/20 backdrop-blur-xs rounded-md p-6 py-4 md:p-8 shadow-2xl">
          {/* 回転するテキストコンテンツ */}
          <motion.div
            key={textIndex}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="space-y-1"
          >
            {/* メインタイトル */}
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white-1 leading-tight
              drop-shadow-2xl"
              style={{
                textShadow: `
                  3px 3px 6px rgba(0, 0, 0, 0.9),
                  0 0 15px rgba(0, 0, 0, 0.7),
                  0 0 30px rgba(0, 0, 0, 0.5)
                `,
              }}
            >
              {currentText.title}
            </motion.h2>

            {/* サブタイトル */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white-1 text-lg md:text-xl font-semibold tracking-wide
              drop-shadow-xl"
              style={{
                textShadow: `
                  2px 2px 4px rgba(0, 0, 0, 0.9),
                  0 0 10px rgba(0, 0, 0, 0.6)
                `,
              }}
            >
              {currentText.subtitle}
            </motion.div>

            {/* 説明文 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-white-1 text-base md:text-lg leading-relaxed
              drop-shadow-lg"
              style={{
                textShadow: `
                  2px 2px 4px rgba(0, 0, 0, 0.8),
                  0 0 8px rgba(0, 0, 0, 0.5)
                `,
              }}
            >
              {currentText.description}
            </motion.p>
          </motion.div>

          {/* プログレスインジケーター */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center gap-3 mt-6"
          >
            {rotatingTexts.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === textIndex
                    ? "w-8 bg-accent-gold shadow-lg shadow-accent-gold/50"
                    : "w-2 bg-white/60 hover:bg-white/80"
                }`}
              />
            ))}
          </motion.div>
        </div>

        {/* スクロールインジケーター */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center
            bg-black/20 backdrop-blur-sm shadow-lg"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(AboutBicho);

import { motion } from "framer-motion";
import { memo } from "react";

/**
 * トーナメント
 * 下部ボーダーアニメーション
 * @param {boolean} isView
 * @param {boolean} isWin (optional)
 * @param {number} delay (optional)
 * @returns JSX.Element
 */

const BottomBorder = ({
  inView,
  isWin = false,
  delay = 0,
}: {
  inView: boolean;
  isWin?: boolean;
  delay?: number;
}) => {
  // 勝ち ? 赤 : グレー
  const borderColor: string = isWin ? "#dc2626" : "#6b7280";
  // 勝ち ? 3 : 1
  const borderBottomWidth: number = isWin ? 3 : 1;
  return (
    <motion.div
      initial={{ width: "0%" }}
      animate={inView ? { width: "100%" } : { width: "0%" }}
      transition={{ duration: 0.5, delay }}
      className="absolute top-0 left-0 h-full border-b"
      style={{ borderBottomWidth, borderColor }}
    />
  );
};

export default memo(BottomBorder);

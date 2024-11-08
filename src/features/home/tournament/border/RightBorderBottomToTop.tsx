import { motion } from "framer-motion";
import { memo } from "react";

/**
 * トーナメント
 * 右側ボーダーアニメーション 下から上
 * @param {boolean} isView
 * @param {boolean} isWin (optional)
 * @param {number} delay (optional)
 * @returns JSX.Element
 */

const RightBorderBottomToTop = ({
  inView,
  isWin = false,
  delay = 0.5,
}: {
  inView: boolean;
  isWin?: boolean;
  delay?: number;
}) => {
  // 勝ち ? 赤 : グレー
  const borderColor: string = isWin ? "#dc2626" : "#6b7280";
  // 勝ち ? 3 : 1
  const borderRightWidth: number = isWin ? 3 : 1;
  return (
    <motion.div
      initial={{ height: "0%", bottom: "0" }}
      animate={
        inView ? { height: "100%", bottom: "0" } : { height: "0%", bottom: "0" }
      }
      transition={{ duration: 0.5, delay }}
      className="absolute right-0 w-[3px] border-r"
      style={{ borderRightWidth, borderColor }}
    />
  );
};

export default memo(RightBorderBottomToTop);

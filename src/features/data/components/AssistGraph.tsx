import { memo, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { motion, useInView } from "framer-motion";
import { assistData, assitOptions } from "../data/barData";

const AssistGraph = () => {
  const graphRef = useRef(null);
  const isInView = useInView(graphRef, { once: true });
  return (
    <motion.div
      ref={graphRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative border-2 border-green-1 rounded-xl p-4 bg-white-2"
    >
      <span className="text-green-1 under pb-[2px] border-b border-green-1">
        04 Assist King in 2024
      </span>
      <div className="relative p-4 flex flex-col gap-2">
        <Bar data={assistData} options={assitOptions} />
        <div className="text-xs flex flex-wrap gap-1">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#FF6384]"></div>
            <span>リーグ戦</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#36A2EB]"></div>
            <span>南部ブロック決勝大会</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#FFCE56]"></div>
            <span>クラブ選手権</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#4BC001]"></div>
            <span>彩の国</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#FF9F40]"></div>
            <span>川口市民選手権</span>
          </div>
        </div>
      </div>
      <span className="text-sm text-green-1">
        4番CB賀川のセットプレーから得点を取ることが出来るのが、BICHOの強みとなっています。
        <br />
        <span className="text-xs">※公式戦の結果(15試合)</span>
      </span>
    </motion.div>
  );
};

export default memo(AssistGraph);

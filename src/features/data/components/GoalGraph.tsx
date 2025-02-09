import { memo, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { motion, useInView } from "framer-motion";
import { goalData, goalOptions } from "../data/barData";

const GoalGraph = () => {
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
        03 Top Scorer in 2024
      </span>
      <div className="relative p-4">
        <Bar data={goalData} options={goalOptions} />
      </div>
      <span className="text-sm text-green-1">
        18番石川を中心に得点を重ねています。2025年度はさらに全体の得点数を増やしていきたいです。またいろんな選手が得点できるチームを目指して行きます。
        <br />
        <span className="text-xs">※公式戦の結果</span>
      </span>
    </motion.div>
  );
};

export default memo(GoalGraph);

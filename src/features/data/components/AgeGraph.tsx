import { memo, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { AgeData, AgeOptions } from "../data/doughnutData";
import { motion, useInView } from "framer-motion";

const AgeGraph = () => {
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
      <span className="text-green-1 pb-[2px] border-b border-green-1">
        01 年齢割合
      </span>
      <div className="relative px-16 py-4">
        <Doughnut data={AgeData} options={AgeOptions} />
        <div className="flex flex-col items-center absolute top-2/4 right-4">
          <span className="text-sm">20代</span>
          <span
            className="font-bold text-lg"
            style={{ color: "rgba(255, 99, 132)" }}
          >
            83%
          </span>
        </div>
        <div className="flex flex-col items-center absolute top-1/4 left-4">
          <span className="text-sm">30代</span>
          <span
            className="font-bold text-lg"
            style={{ color: "rgba(54, 162, 235)" }}
          >
            10%
          </span>
        </div>
        <div className="flex flex-col items-center absolute top-[-30px] left-2/4 -translate-x-full">
          <span className="text-sm">40代</span>
          <span
            className="font-bold text-lg"
            style={{ color: "rgba(255, 206, 86)" }}
          >
            7%
          </span>
        </div>
      </div>
      <span className="text-sm text-green-1">
        20代を中心に構成されていますが、全員の中が良く上下関係はほぼありません。
        和気あいあいとした雰囲気で活動しています。
        飲み会なども定期的に開催し交流を深めています。
      </span>
    </motion.div>
  );
};

export default memo(AgeGraph);

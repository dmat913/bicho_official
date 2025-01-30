import { memo, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { activeRatioData, activeRatioOptions } from "../data/doughnutData";
import { motion, useInView } from "framer-motion";
import { Chart as ChartJS } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ChartDataLabels);

const ActiveRatio = () => {
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
        02 活動比率
      </span>
      <div className="relative px-16 py-4">
        <Pie data={activeRatioData} options={activeRatioOptions} />
      </div>
      <span className="text-sm text-green-1">
        2024年度の実績です。公式戦はリーグ戦+トーナメントの状況次第です。練習試合は幸手市リーグを中心に様々なチームと対戦しています。練習はさいたま市の大崎公園で行っております。
        この他にも夏にはBBQ、大事な試合に勝利した日には飲み会などを定期的に行っております。
      </span>
    </motion.div>
  );
};

export default memo(ActiveRatio);

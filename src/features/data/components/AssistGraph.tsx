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
      <div className="relative p-4">
        <Bar data={assistData} options={assitOptions} />
      </div>
      <span className="text-sm text-green-1">
        4番CB賀川のセットプレーから得点を取ることが出来るのが、BICHOの強みとなっています。
      </span>
    </motion.div>
  );
};

export default memo(AssistGraph);

"use client";

import React from "react";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ActiveRatio from "@/features/data/components/ActiveRatio";
import AgeGraph from "@/features/data/components/AgeGraph";
import AssistGraph from "@/features/data/components/AssistGraph";
import GoalGraph from "@/features/data/components/GoalGraph";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  RadialLinearScale,
} from "chart.js";

// Chart.jsの要素を登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
);

const DataPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-neutral-800">
      <Header />

      {/* ヒーローセクション */}
      <section className="relative pt-32 pb-12 px-4 bg-white shadow-sm mb-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              TEAM DATA
            </h1>
            <p className="text-neutral-500 font-medium tracking-wide">
              チームデータの分析と統計
            </p>
          </motion.div>
        </div>
      </section>

      {/* グラフグリッド */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard title="年齢分布" delay={0.1}>
            <AgeGraph />
          </ChartCard>
          <ChartCard title="活動内容" delay={0.2}>
            <ActiveRatio />
          </ChartCard>
          <ChartCard title="得点ランキング" delay={0.3}>
            <GoalGraph />
          </ChartCard>
          <ChartCard title="アシストランキング" delay={0.4}>
            <AssistGraph />
          </ChartCard>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// チャート用カードコンポーネント
const ChartCard = ({
  children,
  title,
  delay,
}: {
  children: React.ReactNode;
  title: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 md:p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col"
  >
    <h2 className="text-xl font-bold text-neutral-800 mb-6 border-l-4 border-blue-500 pl-4">
      {title}
    </h2>
    <div className="w-full flex-grow flex items-center justify-center min-h-[300px]">
      {children}
    </div>
  </motion.div>
);

export default DataPage;

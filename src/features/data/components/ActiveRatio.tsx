"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { activeRatioData, activeRatioOptions } from "../data/doughnutData";
import { Chart as ChartJS } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ChartDataLabels);

const ActiveRatio = () => {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="relative w-[200px] h-[200px] md:w-[250px] md:h-[250px]">
        <Pie
          data={activeRatioData}
          options={{
            ...activeRatioOptions,
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className="mt-6 text-sm text-neutral-600 leading-relaxed bg-slate-50 p-4 rounded-xl">
        毎週日曜日に埼玉県川口市を中心に活動しています。公式戦はリーグ戦+トーナメントの状況次第です。練習試合は幸手市リーグを中心に様々なチームと対戦しています。練習はさいたま市の大崎公園で行っております。
        <br />
        <span className="block mt-2 text-xs text-neutral-400 text-right">
          ※2024年度の実績
        </span>
      </div>
    </div>
  );
};

export default ActiveRatio;

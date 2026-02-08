"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import { goalData, goalOptions } from "../data/barData";

const GoalGraph = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="relative w-full h-[300px]">
        <Bar
          data={goalData}
          options={{
            ...goalOptions,
            maintainAspectRatio: false,
          }}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        {goalData.datasets.map((dataset, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: dataset.backgroundColor as string }}
            ></div>
            <span className="text-xs text-neutral-600">{dataset.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-neutral-600 leading-relaxed bg-slate-50 p-4 rounded-xl">
        18番石川を中心に得点を重ねています。2025年度はさらに全体の得点数を増やしていきたいです。またいろんな選手が得点できるチームを目指して行きます。
        <br />
        <span className="block mt-2 text-xs text-neutral-400 text-right">
          ※2024年度の実績
        </span>
      </div>
    </div>
  );
};

export default GoalGraph;

"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import { assistData, assitOptions } from "../data/barData";

const AssistGraph = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="relative w-full h-[300px]">
        <Bar
          data={assistData}
          options={{
            ...assitOptions,
            maintainAspectRatio: false,
          }}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        {assistData.datasets.map((dataset, idx) => (
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
        4番CB賀川のセットプレーから得点を取ることが出来るのが、BICHOの強みとなっています。
        <br />
        <span className="block mt-2 text-xs text-neutral-400 text-right">
          ※公式戦の結果(15試合)
        </span>
      </div>
    </div>
  );
};

export default AssistGraph;

"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { AgeData, AgeOptions } from "../data/doughnutData";

const AgeGraph = () => {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="relative w-[200px] h-[200px] md:w-[250px] md:h-[250px]">
        <Doughnut
          data={AgeData}
          options={{ ...AgeOptions, maintainAspectRatio: false }}
        />
      </div>

      <div className="flex justify-center gap-6 mt-6 w-full">
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-neutral-500">20代</span>
          <span
            className="font-bold text-2xl"
            style={{ color: "rgba(255, 99, 132)" }}
          >
            83%
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-neutral-500">30代</span>
          <span
            className="font-bold text-2xl"
            style={{ color: "rgba(54, 162, 235)" }}
          >
            10%
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-neutral-500">40代</span>
          <span
            className="font-bold text-2xl"
            style={{ color: "rgba(255, 206, 86)" }}
          >
            7%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AgeGraph;

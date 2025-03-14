import { ChartOptions } from "chart.js";
import { Context } from "chartjs-plugin-datalabels";

export const AgeData = {
  labels: ["20代", "30代", "40代"],
  datasets: [
    {
      data: [24, 3, 2],
      backgroundColor: [
        "rgba(255, 99, 132)",
        "rgba(54, 162, 235)",
        "rgba(255, 206, 86)",
      ],
      borderColor: ["rgb(0, 0, 132)", "rgb(0, 0, 132)", "rgb(0, 0, 132)"],
    },
  ],
};

export const AgeOptions: ChartOptions<"doughnut"> = {
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: false,
    },
  },
};

export const activeRatioData = {
  labels: ["公式戦", "練習試合", "練習", "OFF"],
  datasets: [
    {
      data: [15, 11, 18, 7],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
      ],
      borderColor: [
        "rgb(0, 0, 132)",
        "rgb(0, 0, 132)",
        "rgb(0, 0, 132)",
        "rgb(0, 0, 132)",
      ],
    },
  ],
};

export const activeRatioOptions: ChartOptions<"pie"> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      color: "#fff",
      font: { size: 12, weight: "bold" },
      formatter: (value: number, context: Context) => {
        const label = context.chart.data.labels?.[context.dataIndex];

        // ラベルと値を返す
        return label ? `${label}:${value}` : `${value}`;
      },
      anchor: "center",
      align: "center",
    },
  },
};

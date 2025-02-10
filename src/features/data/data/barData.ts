import { ChartOptions } from "chart.js";

export const goalData = {
  labels: ["18:石川", "11:榎本", "17:山口", "19:岩瀬", "7貫井"],
  datasets: [
    {
      label: "川口市民選手権",
      data: [0, 1, 0, 0, 0],
      backgroundColor: "#FF9F40",
      borderColor: "rgb(0, 0, 132)",
      borderWidth: 1,
    },
    {
      label: "彩の国",
      data: [3, 3, 1, 2, 2],
      backgroundColor: "#4BC001",
      borderColor: "rgb(0, 0, 132)",
      borderWidth: 1,
    },
    {
      label: "クラブ選手権",
      data: [1, 0, 0, 0, 0],
      backgroundColor: "#FFCE56",
      borderColor: "rgb(0, 0, 132)",
      borderWidth: 1,
    },
    {
      label: "南部ブロック決勝大会",
      data: [1, 0, 1, 0, 0],
      backgroundColor: "#36A2EB",
      borderColor: "rgb(0, 0, 132)",
      borderWidth: 1,
    },
    {
      label: "リーグ戦",
      data: [3, 1, 0, 0, 0],
      backgroundColor: "#FF6384",
      borderColor: "rgb(0, 0, 132)",
      borderWidth: 1,
    },
  ],
};

export const goalOptions: ChartOptions<"bar"> = {
  responsive: true,
  indexAxis: "x",
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: false,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      stacked: true,
      ticks: {
        color: "#003320",
      },
    },
    y: {
      stacked: true,
      ticks: {
        autoSkip: false,
        color: "#003320",
      },
      suggestedMax: 10,
    },
  },
};

export const assistData = {
  labels: ["4:賀川", "7:貫井", "17:山口", "18:石川", "19:岩瀬"],
  datasets: [
    {
      label: "市民選手権",
      data: [0, 0, 0, 1, 0],
      backgroundColor: "#FF9F40",
      borderColor: "rgb(0, 0, 132)",
      borderWidth: 1,
    },
    {
      label: "彩の国",
      data: [2, 3, 0, 1, 1],
      backgroundColor: "#4BC001",
      borderColor: "rgb(0, 0, 132)",
      borderWidth: 1,
    },
    {
      label: "ブロックリーグ決勝大会",
      data: [1, 0, 0, 0, 0],
      backgroundColor: "#36A2EB",
      borderColor: "rgb(0, 0, 132)",
      borderWidth: 1,
    },
    {
      label: "リーグ戦",
      data: [0, 0, 2, 0, 0],
      backgroundColor: "#FF6384",
      borderColor: "rgb(0, 0, 132)",
      borderWidth: 1,
    },
  ],
};

export const assitOptions: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      stacked: true,
      suggestedMax: 5,
      ticks: {
        color: "#003320",
      },
    },
    x: {
      stacked: true,
      ticks: {
        autoSkip: false,
        color: "#003320",
      },
    },
  },
};

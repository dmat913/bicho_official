import { ChartOptions } from "chart.js";

export const goalData = {
  labels: ["18:石川", "11:榎本", "17:山口", "19:岩瀬", "7:貫井"],
  datasets: [
    {
      data: [8, 5, 2, 2, 2],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(255, 159, 64)",
      ],
      borderColor: [
        "rgb(0, 0, 132)",
        "rgb(0, 0, 132)",
        "rgb(0, 0, 132)",
        "rgb(0, 0, 132)",
        "rgb(0, 0, 132)",
      ],
      borderWidth: 2,
    },
  ],
};

export const goalOptions: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      suggestedMax: 10,
    },
    x: {
      ticks: {
        autoSkip: false,
      },
    },
  },
};

export const assistData = {
  labels: ["4:賀川", "7:貫井", "17:山口", "18:石川", "19:岩瀬"],
  datasets: [
    {
      data: [3, 3, 2, 2, 1],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(255, 159, 64)",
      ],
      borderColor: [
        "rgb(0, 0, 132)",
        "rgb(0, 0, 132)",
        "rgb(0, 0, 132)",
        "rgb(0, 0, 132)",
        "rgb(0, 0, 132)",
      ],
      borderWidth: 2,
    },
  ],
};

export const assitOptions: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      suggestedMax: 5,
    },
    x: {
      ticks: {
        autoSkip: false,
      },
    },
  },
};

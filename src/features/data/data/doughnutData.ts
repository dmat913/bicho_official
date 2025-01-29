export const AgeData = {
  labels: ["20代", "30代", "40代"],
  datasets: [
    {
      data: [21, 3, 2],
      backgroundColor: [
        "rgba(255, 99, 132)",
        "rgba(54, 162, 235)",
        "rgba(255, 206, 86)",
      ],
      borderColor: ["rgb(0, 0, 132)", "rgb(0, 0, 132)", "rgb(0, 0, 132)"],
    },
  ],
};

export const AgeOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

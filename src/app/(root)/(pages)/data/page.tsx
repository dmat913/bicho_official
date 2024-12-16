"use client";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import SoccerGround from "@/features/home/starting-lineup/SoccerGround";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<"bar"> = {
  responsive: true,
  indexAxis: "y",
  scales: {
    x: {
      beginAtZero: true,
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        autoSkip: false,
        stepSize: 1,
      },
    },
  },
};

export default function DataPage() {
  const scorerData = {
    labels: [
      "石川諒",
      "榎本歩夢",
      "山口大貴",
      "岩瀬輝",
      "貫井直",
      "賀川優斗",
      "中田湧大",
      "谷侑樹",
      "浅子太我",
    ],
    datasets: [
      {
        label: "リーグ戦",
        data: [3, 1, 0, 0, 0, 1, 1, 1, 0],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "クラブ選手権",
        data: [1, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "市民選手権",
        data: [0, 1, 0, 0, 0, 0, 0, 0, 1],
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "南部ブロック決勝大会",
        data: [1, 0, 1, 0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "彩の国カップ",
        data: [3, 3, 1, 2, 2, 0, 0, 0, 0],
        backgroundColor: "rgba(75, 192, 1, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const assistData = {
    labels: ["賀川優斗", "貫井直", "山口大貴", "石川諒", "岩瀬輝", "高柳智"],
    datasets: [
      {
        label: "リーグ戦",
        data: [0, 0, 2, 0, 0, 0],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "市民選手権",
        data: [0, 0, 0, 1, 0, 0],
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "ブロックリーグ決勝大会",
        data: [1, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "彩の国カップ",
        data: [2, 3, 0, 1, 1, 1],
        backgroundColor: "rgba(75, 192, 1, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-4 p-4">
          <span className="text-green-1 font-bold">得点 ランキング</span>
          <Bar options={options} data={scorerData} height={200} />
          <span className="text-green-1 font-bold block mt-5">
            アシスト ランキング
          </span>
          <Bar options={options} data={assistData} />
        </div>
        <SoccerGround />
      </div>
      <Footer />
    </div>
  );
}

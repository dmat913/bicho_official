"use client";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ActiveRatio from "@/features/data/components/ActiveRatio";
import AgeGraph from "@/features/data/components/AgeGraph";
import AssistGraph from "@/features/data/components/AssistGraph";
import GoalGraph from "@/features/data/components/GoalGraph";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

const DataPage = () => {
  return (
    <div className="bg-gray-200">
      <Header />
      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-green-1">DATA</span>
          <span className="text-sm">数字で見るBICHO</span>
        </div>
        <AgeGraph />
        <ActiveRatio />
        <GoalGraph />
        <AssistGraph />
      </div>
      <Footer />
    </div>
  );
};

export default DataPage;

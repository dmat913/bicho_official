"use client";

import { motion, useInView } from "framer-motion";
import React, { memo, useRef } from "react";
import BICHOLOGO from "@/public/bicho-icon.png";
import Image from "next/image";

const teams = [
  {
    id: "1",
    name: "下落合FC",
  },
  {
    id: "2",
    name: "浦和UFC",
  },
  {
    id: "3",
    name: "FC.BICHO",
  },
  {
    id: "4",
    name: "川口SC",
  },
  {
    id: "5",
    name: "FC.ARAO",
  },
  {
    id: "6",
    name: "浦和西クラブ",
  },
  {
    id: "7",
    name: "ほのぼのクラブ",
  },
  {
    id: "8",
    name: "FC.FAMITECH",
  },
];

const Tournament = () => {
  // 画面に入ったかどうかを監視するための参照
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });
  const tournamentRef = useRef(null);
  const tournamentInView = useInView(tournamentRef, { once: true });
  return (
    <div className="px-4 py-10 flex flex-col">
      <div className="flex flex-col items-center mb-4">
        {/* アニメーションを適用する要素 */}
        <motion.span
          ref={titleRef}
          className="text-black-1 font-bold text-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          2024年度 南部地区ブロックリーグ決勝大会
        </motion.span>
      </div>
      <motion.div
        ref={tournamentRef}
        className="flex"
        initial={{ opacity: 0, y: 50 }}
        animate={tournamentInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col flex-1 min-w-[140px] gap-1">
          {teams.map((team) => (
            <div
              key={team.id}
              className={`border h-10 w-full flex items-center justify-center gap-1 rounded-md ${
                team.id === "3"
                  ? "bg-green-3 border-green-2"
                  : "border-gray-300"
              }`}
            >
              {team.id === "3" && (
                <Image src={BICHOLOGO} alt="" width={30} height={30} />
              )}
              <span
                className={`text-sm text-black-1 ${
                  team.id === "3" && "text-white-1"
                }`}
              >
                {team.name}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col flex-1 justify-around text-xs">
          <div className="h-11 w-full flex flex-col relative">
            <div className="flex flex-1 border-t-[3px] border-r-[3px] border-red-600">
              <span className="absolute right-0 top-[-16px] text-red-600">
                1PK4
              </span>
            </div>
            <div className="flex flex-1 border-b border-r">
              <span className="absolute right-0 bottom-[-16px]">1PK2</span>
            </div>
          </div>
          <div className="h-11 w-full flex flex-col relative">
            <div className="flex flex-1 border-t-[3px] border-r-[3px] border-red-600">
              <span className="absolute right-0 top-[-16px] text-red-600">
                1PK4
              </span>
            </div>
            <div className="flex flex-1 border-b border-r">
              <span className="absolute right-0 bottom-[-16px]">1PK1</span>
            </div>
          </div>
          <div className="h-11 w-full flex flex-col relative">
            <div className="flex flex-1 border-t border-r">
              <span className="absolute right-0 top-[-16px]">0</span>
            </div>
            <div className="flex flex-1 border-b-[3px] border-r-[3px] border-red-600">
              <span className="absolute right-0 bottom-[-16px] text-red-600">
                3
              </span>
            </div>
          </div>
          <div className="h-11 w-full flex flex-col relative">
            <div className="flex flex-1 border-t-[3px] border-r-[3px] border-red-600">
              <span className="absolute right-0 top-[-16px] text-red-600">
                3
              </span>
            </div>
            <div className="flex flex-1 border-b border-r">
              <span className="absolute right-0 bottom-[-16px]">0</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 justify-around text-xs relative left-[-3px]">
          <div className="h-[88px] w-full flex flex-col ">
            <div className="flex flex-1 border-t-[3px] border-t-red-600 border-r relative">
              <span className="absolute right-0 top-[-18px]">0</span>
            </div>
            <div className="flex flex-1 border-b-[3px] border-r-[3px] border-red-600 relative">
              <span className="absolute right-0 bottom-[-18px] text-red-600">
                1
              </span>
            </div>
          </div>
          <div className="h-[88px] w-full flex flex-col">
            <div className="flex flex-1 border-t-[3px] border-t-red-600 border-r relative">
              <span className="absolute right-0 top-[-18px]">0PK4</span>
            </div>
            <div className="flex flex-1 border-b-[3px] border-r-[3px] border-red-600 relative">
              <span className="absolute right-0 bottom-[-18px] text-red-600">
                0PK5
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center relative left-[-6px]">
          <div className="h-[176px] w-full flex flex-col">
            <div className="flex flex-1 border-t-[3px] border-t-red-600 border-r relative"></div>
            <div className="flex flex-1 border-b-[3px] border-b-red-600 border-r relative"></div>
          </div>
        </div>
        <div className="flex flex-1 items-center relative left-[-7px]">
          <div className="h-[1px] w-full bg-gray-300"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default memo(Tournament);

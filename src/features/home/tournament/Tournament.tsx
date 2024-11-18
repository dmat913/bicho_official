"use client";

import { motion, useInView } from "framer-motion";
import React, { memo, useRef } from "react";
import BICHOLOGO from "@/public/bicho-icon.png";
import Image from "next/image";
import TopBorder from "./border/TopBorder";
import RightBorderTopToBottom from "./border/RightBorderTopToBottom";
import BottomBorder from "./border/BottomBorder";
import RightBorderBottomToTop from "./border/RightBorderBottomToTop";

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
    <div id="tournament" className="px-4 py-10 flex flex-col">
      <div className="flex flex-col items-center mb-4">
        {/* アニメーションを適用する要素 */}
        <motion.span
          ref={titleRef}
          className="text-gradient-black font-bold text-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          2024年度 埼玉県南部地区
          <br />
          ブロックリーグ決勝大会
        </motion.span>
      </div>
      <motion.div
        ref={tournamentRef}
        className="flex"
        initial={{ opacity: 0, y: 50 }}
        animate={tournamentInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col min-w-[140px] gap-1">
          {teams.map((team) => (
            <motion.div
              key={team.id}
              className={`border h-10 w-full flex items-center justify-center gap-1 rounded-md z-10 ${
                team.id === "3" ? `bg-green-3 border-green-2` : "border-gray-2"
              }`}
              initial={{ opacity: 0, x: -50 }}
              animate={tournamentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * Number(team.id) }}
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
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col flex-1 justify-around text-xs">
          <div className="h-11 w-full flex flex-col relative">
            <div className="relative flex flex-1 border-r-gray-2">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute right-0 top-[-16px] text-red-600"
              >
                1PK4
              </motion.span>
              <TopBorder inView={tournamentInView} />
              <RightBorderTopToBottom inView={tournamentInView} isWin />
            </div>
            <div className="relative flex flex-1">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute right-0 bottom-[-16px] text-gray-2"
              >
                1PK2
              </motion.span>
              <BottomBorder inView={tournamentInView} />
              <RightBorderBottomToTop inView={tournamentInView} />
            </div>
          </div>
          <div className="h-11 w-full flex flex-col relative">
            <div className="relative flex flex-1">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute right-0 top-[-16px] text-red-600"
              >
                1PK4
              </motion.span>
              <TopBorder inView={tournamentInView} />
              <RightBorderTopToBottom inView={tournamentInView} isWin />
            </div>
            <div className="relative flex flex-1">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute right-0 bottom-[-16px] text-gray-2"
              >
                1PK1
              </motion.span>
              <BottomBorder inView={tournamentInView} />
              <RightBorderBottomToTop inView={tournamentInView} />
            </div>
          </div>
          <div className="h-11 w-full flex flex-col relative">
            <div className="relative flex flex-1">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute right-0 top-[-16px] text-gray-2"
              >
                0
              </motion.span>
              <TopBorder inView={tournamentInView} isWin={false} />
              <RightBorderTopToBottom inView={tournamentInView} />
            </div>
            <div className="relative flex flex-1">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute right-0 bottom-[-16px] text-red-600"
              >
                3
              </motion.span>
              <BottomBorder inView={tournamentInView} isWin />
              <RightBorderBottomToTop inView={tournamentInView} isWin />
            </div>
          </div>
          <div className="h-11 w-full flex flex-col relative">
            <div className="relative flex flex-1">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute right-0 top-[-16px] text-red-600"
              >
                3
              </motion.span>
              <TopBorder inView={tournamentInView} isWin />
              <RightBorderTopToBottom inView={tournamentInView} isWin />
            </div>
            <div className="relative flex flex-1">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute right-0 bottom-[-16px] text-gray-2"
              >
                0
              </motion.span>
              <BottomBorder inView={tournamentInView} />

              <RightBorderBottomToTop inView={tournamentInView} />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 justify-around text-xs relative left-[-3px]">
          <div className="h-[88px] w-full flex flex-col ">
            <div className="relative flex flex-1">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={
                  tournamentInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: -10 }
                }
                transition={{
                  duration: 0.5,
                  delay: tournamentInView ? 1.5 : 0,
                }}
                className="absolute right-0 top-[-16px] text-gray-2"
              >
                0
              </motion.span>
              <TopBorder inView={tournamentInView} isWin delay={1} />
              <RightBorderTopToBottom inView={tournamentInView} delay={1.5} />
            </div>
            <div className="relative flex flex-1">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={
                  tournamentInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                transition={{
                  duration: 0.5,
                  delay: tournamentInView ? 1.5 : 0,
                }}
                className="absolute right-0 bottom-[-16px] text-red-600"
              >
                1
              </motion.span>
              <BottomBorder inView={tournamentInView} isWin delay={1} />
              <RightBorderBottomToTop
                inView={tournamentInView}
                isWin
                delay={1.5}
              />
            </div>
          </div>
          <div className="h-[88px] w-full flex flex-col">
            <div className="relative flex flex-1">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={
                  tournamentInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: -10 }
                }
                transition={{
                  duration: 0.5,
                  delay: tournamentInView ? 1.5 : 0,
                }}
                className="absolute right-0 top-[-16px] text-gray-2 "
              >
                0PK4
              </motion.span>
              <TopBorder inView={tournamentInView} isWin delay={1} />
              <RightBorderTopToBottom inView={tournamentInView} delay={1.5} />
            </div>
            <div className="relative flex flex-1">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={
                  tournamentInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                transition={{
                  duration: 0.5,
                  delay: tournamentInView ? 1.5 : 0,
                }}
                className="absolute right-0 bottom-[-16px] text-red-600"
              >
                0PK5
              </motion.span>
              <BottomBorder inView={tournamentInView} isWin delay={1} />
              <RightBorderBottomToTop
                inView={tournamentInView}
                isWin
                delay={1.5}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center relative left-[-6px]">
          <div className="h-[176px] w-full flex flex-col">
            <div className="flex flex-1  relative">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={
                  tournamentInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: -10 }
                }
                transition={{
                  duration: 0.5,
                  delay: tournamentInView ? 2.5 : 0,
                }}
                className="absolute right-0 top-[-16px] text-red-600 text-xs"
              >
                0PK5
              </motion.span>
              <TopBorder inView={tournamentInView} isWin delay={2} />
              <RightBorderTopToBottom
                inView={tournamentInView}
                delay={2.5}
                isWin
              />
            </div>
            <div className="flex flex-1 relative">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={
                  tournamentInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                transition={{
                  duration: 0.5,
                  delay: tournamentInView ? 2.5 : 0,
                }}
                className="absolute right-0 bottom-[-16px] text-gray-2 text-xs"
              >
                0PK3
              </motion.span>
              <BottomBorder inView={tournamentInView} isWin delay={2} />
              <RightBorderBottomToTop inView={tournamentInView} delay={2.5} />
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center relative left-[-7px]">
          <motion.div
            initial={{ width: "0%" }}
            animate={tournamentInView ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 0.5, delay: 3 }}
            className="border-b-[3px] border-[#dc2626] relative right-[2px]"
          />
        </div>
        <div className="flex items-center">
          <motion.div
            initial={{ width: "0%" }}
            animate={tournamentInView ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 1, delay: 3.5 }}
          >
            <Image src={BICHOLOGO} alt="" width={40} height={40} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default memo(Tournament);

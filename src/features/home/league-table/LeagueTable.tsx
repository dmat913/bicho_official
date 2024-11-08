"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { league2024 } from "./data/league";

const LeagueTable = () => {
  const textRef = useRef(null);
  const tableRef = useRef(null);
  const isInView = useInView(textRef, { once: true });
  const tableInView = useInView(tableRef, { once: true });

  return (
    <div
      id="league-table"
      className="flex flex-col justify-between w-full px-4 py-10 bg-noise-green-1 border-b-[1px] border-line-1"
    >
      {/* タイトル */}
      <motion.div
        ref={textRef}
        className="flex justify-center gap-2 pb-4"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <span className="text-white-1 font-bold text-2xl">
          2024年度川口市リーグ戦結果
        </span>
      </motion.div>

      {/* リーグ戦結果の表 */}
      <motion.table
        ref={tableRef}
        className="w-full mt-6 bg-white-2 rounded-sm overflow-hidden border border-gray-300"
        initial={{ opacity: 0, y: 50 }}
        animate={tableInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <thead>
          <tr className="bg-gray-200 uppercase tracking-wider text-black-1 text-sm border-b border-gray-300">
            <th className="p-2 border-r border-gray-300">順位</th>
            <th className="p-2 border-r border-gray-300">チーム名</th>
            <th className="p-2 border-r border-gray-300">勝ち点</th>
            <th className="p-2 border-r border-gray-300">勝</th>
            <th className="p-2 border-r border-gray-300">負</th>
            <th className="p-2 border-r border-gray-300">分</th>
            <th className="p-2 hidden md:table-cell border-r border-gray-300">
              得点
            </th>
            <th className="p-2 hidden md:table-cell border-r border-gray-300">
              失点
            </th>
            <th className="p-2 hidden md:table-cell">得失点</th>
          </tr>
        </thead>
        <tbody>
          {league2024.map((row, index) => (
            <motion.tr
              key={index}
              className={`border-b border-gray-300 text-center text-sm ${
                row.team === "FC.BICHO" ? "text-white-1 bg-green-3" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={tableInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <td className="p-2 border-r border-gray-300">{index + 1}</td>
              <td className="p-2 border-r border-gray-300">{row.team}</td>
              <td className="p-2 border-r border-gray-300">{row.points}</td>
              <td className="p-2 border-r border-gray-300">{row.wins}</td>
              <td className="p-2 border-r border-gray-300">{row.losses}</td>
              <td className="p-2 border-r border-gray-300">{row.draws}</td>
              <td className="p-2 hidden md:table-cell border-r border-gray-300">
                {row.goalsFor}
              </td>
              <td className="p-2 hidden md:table-cell border-r border-gray-300">
                {row.goalsAgainst}
              </td>
              <td className="p-2 hidden md:table-cell">{row.goalDifference}</td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default LeagueTable;

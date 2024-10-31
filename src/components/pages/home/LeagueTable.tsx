"use client";

import { league2024 } from "@/data/league";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const LeagueTable = () => {
  const textRef = useRef(null);
  const tableRef = useRef(null);
  const isInView = useInView(textRef, { once: true });
  const tableInView = useInView(tableRef, { once: true });

  return (
    <div className="flex flex-col justify-between w-full px-4 py-10 bg-noise-green-1 border-b-[1px] border-line-1">
      {/* タイトル */}
      <motion.div
        ref={textRef}
        className="flex justify-center gap-2 pb-4"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <span className="text-white-1 font-bold text-2xl">
          2024リーグ戦結果
        </span>
      </motion.div>

      {/* リーグ戦結果の表 */}
      <motion.table
        ref={tableRef}
        className="w-full mt-6 bg-white-1 rounded-sm overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={tableInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <thead>
          <tr className="bg-gray-300 uppercase tracking-wider text-black-1 text-sm">
            <th className="p-2">順位</th>
            <th className="p-2">チーム名</th>
            <th className="p-2">勝ち点</th>
            <th className="p-2">勝</th>
            <th className="p-2">負</th>
            <th className="p-2">分</th>
            <th className="p-2 hidden md:table-cell">得点</th>
            <th className="p-2 hidden md:table-cell">失点</th>
            <th className="p-2 hidden md:table-cell">得失点</th>
          </tr>
        </thead>
        <tbody>
          {league2024.map((row, index) => (
            <motion.tr
              key={index}
              className={`border-b border-white-1 text-center text-sm ${
                row.team === "FC.BICHO" && "text-white-1 bg-green-2"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={tableInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{row.team}</td>
              <td className="p-2">{row.points}</td>
              <td className="p-2">{row.wins}</td>
              <td className="p-2">{row.losses}</td>
              <td className="p-2">{row.draws}</td>
              <td className="p-2 hidden md:table-cell">{row.goalsFor}</td>
              <td className="p-2 hidden md:table-cell">{row.goalsAgainst}</td>
              <td className="p-2 hidden md:table-cell">{row.goalDifference}</td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default LeagueTable;

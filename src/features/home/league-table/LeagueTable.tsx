"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { getLeagueData, getLogo } from "@/utils/date";

const LeagueTable = () => {
  const textRef = useRef(null);
  const tableRef = useRef(null);
  const isInView = useInView(textRef, { once: true });
  const tableInView = useInView(tableRef, { once: true });

  // const [selectedYear, setSelectedYear] = useState<string>("2025");

  const LEAGUE_DATA = getLeagueData("2025");

  // const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedYear(e.target.value);
  // };

  return (
    <div
      id="league-table"
      className="flex flex-col justify-between w-full px-4 py-10 bg-noise-green-3"
    >
      {/* タイトル */}
      <motion.div
        ref={textRef}
        className="flex justify-center gap-2  pb-4 items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="text-white-1 font-bold text-2xl flex justify-center flex-col">
          {LEAGUE_DATA.title.split(" ").map((part, index) => (
            <span key={index}>
              {part}
              {index < LEAGUE_DATA.title.split(" ").length - 1 && <br />}
            </span>
          ))}
        </div>
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
            <th className="p-2 text-[10px]">順位</th>
            <th className="p-2 text-[10px]">チーム名</th>
            <th className="p-2 text-[10px]">試合</th>
            <th className="p-2 text-[10px]">勝点</th>
            <th className="p-2 text-[10px]">勝</th>
            <th className="p-2 text-[10px]">負</th>
            <th className="p-2 text-[10px]">分</th>
            <th className="p-2 md:table-cell  text-[10px]">得点</th>
            <th className="p-2 md:table-cell  text-[10px]">失点</th>
            <th className="p-2 md:table-cell text-[10px]">差</th>
          </tr>
        </thead>
        <tbody>
          {LEAGUE_DATA.league.map((row, index) => (
            <motion.tr
              key={index}
              className={`border-b border-gray-300 text-center text-sm  ${index % 2 === 0 && "bg-gray-100"} ${
                row.team === "FC.BICHO"
                  && "text-white-1 !bg-[rgba(0,96,54,0.8)]"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={tableInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <td className="p-2 text-[10px]">{index + 1}</td>
              <td className="p-2 text-[10px] flex items-center gap-1">
                {getLogo(row.team) !== "" && (
                  <Image
                    src={getLogo(row.team)}
                    alt=""
                    width={20}
                    height={20}
                  />
                )}
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {row.team}
                </span>
              </td>
              <td className="p-2 text-[10px]">{row.game_count}</td>
              <td className="p-2 text-[10px]">{row.points}</td>
              <td className="p-2 text-[10px]">{row.wins}</td>
              <td className="p-2 text-[10px]">{row.losses}</td>
              <td className="p-2 text-[10px]">{row.draws}</td>
              <td className="p-2 md:table-cell text-[10px]">
                {row.goalsFor}
              </td>
              <td className="p-2 md:table-cell text-[10px]">
                {row.goalsAgainst}
              </td>
              <td className="p-2 md:table-cell text-[10px]">
                {row.goalDifference}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
      {/* <select
        value={selectedYear}
        onChange={handleYearChange}
        className="px-4 py-2 mt-4 w-[140px] border rounded-sm bg-white-2 text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-2 focus:border-transparent cursor-pointer"
      >
        <option value="2024">2024年度</option>
        <option value="2025">2025年度</option>
      </select> */}
    </div>
  );
};

export default LeagueTable;

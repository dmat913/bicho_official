import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdAdd, MdEdit, MdDelete, MdFilterList } from "react-icons/md";
import { LeagueInfo } from "@/types/league";
import { LeagueTeam } from "@/types/league";
import { useRouter } from "next/navigation";

interface TeamTabProps {
  leagues: LeagueInfo[];
  teams: LeagueTeam[];
  onDelete: (team: LeagueTeam) => void;
}

export const TeamTab = ({ leagues, teams, onDelete }: TeamTabProps) => {
  const router = useRouter();
  const [isTeamFilterOpen, setIsTeamFilterOpen] = useState(false);
  const [selectedLeagueId, setSelectedLeagueId] = useState("");

  // フィルタリング処理
  const filteredTeams = selectedLeagueId
    ? teams.filter((team) => team.leagueId === selectedLeagueId)
    : teams;

  // アクティブなフィルター数を計算
  const activeTeamFilterCount = selectedLeagueId ? 1 : 0;

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-lg sm:text-2xl font-bold text-white-1 whitespace-nowrap">
            チーム情報 ({filteredTeams.length}件)
          </h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsTeamFilterOpen(!isTeamFilterOpen)}
              className={`relative flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg transition-colors whitespace-nowrap flex-1 sm:flex-none justify-center ${
                isTeamFilterOpen
                  ? "bg-green-600 text-white-1"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              <MdFilterList size={20} />
              <span className="text-xs sm:text-sm">フィルター</span>
              {activeTeamFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white-1 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeTeamFilterCount}
                </span>
              )}
            </button>
            <button
              onClick={() => router.push("/admin/league/create-team")}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-6 sm:py-3 bg-green-600 text-white-1 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap flex-1 sm:flex-none justify-center"
            >
              <MdAdd size={20} className="sm:w-6 sm:h-6" />
              <span className="text-xs sm:text-base">新規登録</span>
            </button>
          </div>
        </div>
      </div>

      {/* フィルターパネル */}
      <AnimatePresence>
        {isTeamFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mb-4"
          >
            <div className="bg-neutral-800 rounded-lg p-4 space-y-3">
              {/* リーグ選択 */}
              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  リーグ
                </label>
                <select
                  value={selectedLeagueId}
                  onChange={(e) => setSelectedLeagueId(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700 text-white-1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">すべてのリーグ</option>
                  {leagues.map((league) => (
                    <option key={league._id} value={league._id}>
                      {league.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* フィルタークリアボタン */}
              {activeTeamFilterCount > 0 && (
                <button
                  onClick={() => setSelectedLeagueId("")}
                  className="w-full px-3 py-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white-1 rounded-lg text-sm font-medium transition-colors"
                >
                  フィルターをクリア
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredTeams.length === 0 ? (
        <div className="bg-neutral-800 rounded-lg p-8 text-center text-neutral-400">
          {selectedLeagueId
            ? "このリーグに登録されているチームはありません。"
            : "チーム情報がありません。新規登録してください。"}
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredTeams.map((team) => {
            const league = leagues.find((l) => l._id === team.leagueId);
            return (
              <motion.div
                key={team._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative rounded-xl bg-neutral-800/50 border-2 border-neutral-700/50 hover:border-neutral-600 p-3 sm:p-5 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                  {/* チーム情報 */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <div className="w-1.5 sm:w-2 h-10 sm:h-12 bg-neutral-600 rounded-full flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start flex-col gap-1 sm:gap-1.5">
                        <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white-1 break-words">
                          {team.teamName}
                        </h3>
                        {league && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-neutral-700/80 text-neutral-300 text-[10px] sm:text-xs font-medium rounded-lg flex-shrink-0 w-fit">
                            {league.title}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ボタン群 */}
                  <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                    <button
                      onClick={() =>
                        router.push(`/admin/league/edit-team/${team._id}`)
                      }
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-neutral-700 text-neutral-300 hover:bg-neutral-600 hover:text-white-1 rounded-lg transition-all duration-200 whitespace-nowrap text-xs sm:text-sm font-semibold"
                      title="編集"
                    >
                      <MdEdit size={16} className="sm:w-5 sm:h-5" />
                      <span>編集</span>
                    </button>
                    <button
                      onClick={() => onDelete(team)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white-1 rounded-lg transition-all duration-200 whitespace-nowrap text-xs sm:text-sm font-semibold"
                      title="削除"
                    >
                      <MdDelete size={16} className="sm:w-5 sm:h-5" />
                      <span>削除</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

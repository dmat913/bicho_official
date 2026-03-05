import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdFilterList,
  MdSearch,
} from "react-icons/md";
import { LeagueInfo } from "@/types/league";
import { LeagueTeam } from "@/types/league";
import { MatchResult } from "@/types/league";
import { useRouter } from "next/navigation";

interface MatchTabProps {
  leagues: LeagueInfo[];
  teams: LeagueTeam[];
  matches: MatchResult[];
  onDelete: (match: MatchResult) => void;
}

export const MatchTab = ({ leagues, matches, onDelete }: MatchTabProps) => {
  const router = useRouter();
  const [isMatchFilterOpen, setIsMatchFilterOpen] = useState(false);
  const [matchFilters, setMatchFilters] = useState({
    leagueId: "",
    searchTerm: "",
    startDate: "",
    endDate: "",
  });

  // フィルタリング処理
  const filteredMatches = matches.filter((match) => {
    // リーグフィルター
    if (matchFilters.leagueId && match.leagueId !== matchFilters.leagueId) {
      return false;
    }
    // 検索フィルター（チーム名）
    if (matchFilters.searchTerm) {
      const searchTerm = matchFilters.searchTerm.toLowerCase();
      const matchesSearch =
        match.homeTeam.toLowerCase().includes(searchTerm) ||
        match.awayTeam.toLowerCase().includes(searchTerm);
      if (!matchesSearch) return false;
    }
    // 日付範囲フィルター（開始日）
    if (matchFilters.startDate) {
      const matchDate = new Date(match.matchDate);
      const startDate = new Date(matchFilters.startDate);
      if (matchDate < startDate) return false;
    }
    // 日付範囲フィルター（終了日）
    if (matchFilters.endDate) {
      const matchDate = new Date(match.matchDate);
      const endDate = new Date(matchFilters.endDate);
      if (matchDate > endDate) return false;
    }
    return true;
  });

  // アクティブなフィルター数を計算
  const activeMatchFilterCount =
    (matchFilters.leagueId ? 1 : 0) +
    (matchFilters.searchTerm ? 1 : 0) +
    (matchFilters.startDate ? 1 : 0) +
    (matchFilters.endDate ? 1 : 0);

  // リーグIDからタイトルを取得
  const getLeagueTitle = (leagueId: string) => {
    const league = leagues.find((l) => l._id === leagueId);
    return league?.title || "不明なリーグ";
  };

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-lg sm:text-2xl font-bold text-white-1 whitespace-nowrap">
            試合結果 ({filteredMatches.length}件)
          </h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsMatchFilterOpen(!isMatchFilterOpen)}
              className={`relative flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg transition-colors whitespace-nowrap flex-1 sm:flex-none justify-center ${
                isMatchFilterOpen
                  ? "bg-green-600 text-white-1"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              <MdFilterList size={20} />
              <span className="text-xs sm:text-sm">フィルター</span>
              {activeMatchFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white-1 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeMatchFilterCount}
                </span>
              )}
            </button>
            <button
              onClick={() => router.push("/admin/league/create-match")}
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
        {isMatchFilterOpen && (
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
                  value={matchFilters.leagueId}
                  onChange={(e) =>
                    setMatchFilters({
                      ...matchFilters,
                      leagueId: e.target.value,
                    })
                  }
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

              {/* チーム検索 */}
              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  チーム名で検索
                </label>
                <div className="relative">
                  <MdSearch
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    size={18}
                  />
                  <input
                    type="text"
                    value={matchFilters.searchTerm}
                    onChange={(e) =>
                      setMatchFilters({
                        ...matchFilters,
                        searchTerm: e.target.value,
                      })
                    }
                    placeholder="チーム名を入力..."
                    className="w-full pl-10 pr-3 py-2 bg-neutral-700 text-white-1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* 日付範囲 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">
                    開始日
                  </label>
                  <input
                    type="date"
                    value={matchFilters.startDate}
                    onChange={(e) =>
                      setMatchFilters({
                        ...matchFilters,
                        startDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-neutral-700 text-white-1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">
                    終了日
                  </label>
                  <input
                    type="date"
                    value={matchFilters.endDate}
                    onChange={(e) =>
                      setMatchFilters({
                        ...matchFilters,
                        endDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-neutral-700 text-white-1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* フィルタークリアボタン */}
              {activeMatchFilterCount > 0 && (
                <button
                  onClick={() =>
                    setMatchFilters({
                      leagueId: "",
                      searchTerm: "",
                      startDate: "",
                      endDate: "",
                    })
                  }
                  className="w-full px-3 py-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white-1 rounded-lg text-sm font-medium transition-colors"
                >
                  フィルターをクリア
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredMatches.length === 0 ? (
        <div className="bg-neutral-800 rounded-lg p-8 text-center text-neutral-400">
          {matchFilters.leagueId ||
          matchFilters.searchTerm ||
          matchFilters.startDate ||
          matchFilters.endDate
            ? "条件に一致する試合結果がありません。"
            : "試合結果がありません。新規登録してください。"}
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredMatches.map((match) => {
            const leagueTitle = getLeagueTitle(match.leagueId);

            return (
              <motion.div
                key={match._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative rounded-xl border-2 p-3 sm:p-5 transition-all duration-300 bg-neutral-800/50 border-neutral-700/50 hover:border-neutral-600"
              >
                <div className="flex flex-col gap-3 sm:gap-4">
                  {/* リーグ名と日付 */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-neutral-700/80 text-neutral-300 text-[10px] sm:text-xs font-medium rounded-lg w-fit">
                      {leagueTitle}
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-400 font-medium">
                      {new Date(match.matchDate).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* 試合スコア */}
                  <div className="flex items-center justify-between gap-2 sm:gap-4">
                    {/* ホームチーム */}
                    <div className="flex-1 min-w-0 text-right">
                      <p className="text-sm sm:text-lg md:text-xl font-bold truncate text-white-1">
                        {match.homeTeam}
                      </p>
                    </div>

                    {/* スコア */}
                    <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 bg-neutral-900/50 rounded-lg flex-shrink-0">
                      <span className="text-xl sm:text-2xl md:text-3xl font-black text-white-1 min-w-[1.5ch] text-center">
                        {match.homeScore}
                      </span>
                      <span className="text-base sm:text-lg md:text-xl font-bold text-neutral-500">
                        -
                      </span>
                      <span className="text-xl sm:text-2xl md:text-3xl font-black text-white-1 min-w-[1.5ch] text-center">
                        {match.awayScore}
                      </span>
                    </div>

                    {/* アウェイチーム */}
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm sm:text-lg md:text-xl font-bold truncate text-white-1">
                        {match.awayTeam}
                      </p>
                    </div>
                  </div>

                  {/* メモ（もしあれば） */}
                  {match.notes && (
                    <div className="pt-2 sm:pt-3 border-t border-neutral-700/50">
                      <p className="text-xs sm:text-sm text-neutral-400 break-words">
                        {match.notes}
                      </p>
                    </div>
                  )}

                  {/* ボタン群 */}
                  <div className="flex items-center gap-2 pt-2 sm:pt-0">
                    <button
                      onClick={() =>
                        router.push(`/admin/league/edit-match/${match._id}`)
                      }
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-neutral-700 text-neutral-300 hover:bg-neutral-600 hover:text-white-1 rounded-lg transition-all duration-200 whitespace-nowrap text-xs sm:text-sm font-semibold"
                      title="編集"
                    >
                      <MdEdit size={16} className="sm:w-5 sm:h-5" />
                      <span>編集</span>
                    </button>
                    <button
                      onClick={() => onDelete(match)}
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

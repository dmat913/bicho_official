import { useState } from "react";
import { motion } from "framer-motion";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
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

export const MatchTab = ({
  leagues,
  teams,
  matches,
  onDelete,
}: MatchTabProps) => {
  const router = useRouter();
  const [selectedLeagueId, setSelectedLeagueId] = useState<string>("all");
  const [selectedTeamId, setSelectedTeamId] = useState<string>("all");
  const [selectedResult, setSelectedResult] = useState<string>("all");

  // リーグでフィルタリング
  const leagueFilteredMatches =
    selectedLeagueId === "all"
      ? matches
      : matches.filter((match) => match.leagueId === selectedLeagueId);

  // さらにチームでフィルタリング
  const teamFilteredMatches =
    selectedTeamId === "all"
      ? leagueFilteredMatches
      : leagueFilteredMatches.filter(
          (match) =>
            match.homeTeam === selectedTeamId ||
            match.awayTeam === selectedTeamId,
        );

  // さらに結果でフィルタリング
  const filteredMatches =
    selectedResult === "all"
      ? teamFilteredMatches
      : teamFilteredMatches.filter((match) => {
          if (selectedResult === "win") {
            return (
              (match.homeTeam === selectedTeamId &&
                match.homeScore > match.awayScore) ||
              (match.awayTeam === selectedTeamId &&
                match.awayScore > match.homeScore)
            );
          } else if (selectedResult === "lose") {
            return (
              (match.homeTeam === selectedTeamId &&
                match.homeScore < match.awayScore) ||
              (match.awayTeam === selectedTeamId &&
                match.awayScore < match.homeScore)
            );
          } else if (selectedResult === "draw") {
            return match.homeScore === match.awayScore;
          }
          return true;
        });

  // リーグIDからタイトルを取得
  const getLeagueTitle = (leagueId: string) => {
    const league = leagues.find((l) => l._id === leagueId);
    return league?.title || "不明なリーグ";
  };

  // 選択されたリーグに所属するチームのリストを取得
  const availableTeams =
    selectedLeagueId === "all"
      ? teams
      : teams.filter((team) => team.leagueId === selectedLeagueId);

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-lg sm:text-2xl font-bold text-white-1 whitespace-nowrap">
            試合結果 ({filteredMatches.length}件)
          </h2>
          <button
            onClick={() => router.push("/admin/league/create-match")}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-6 sm:py-3 bg-green-600 text-white-1 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
          >
            <MdAdd size={20} className="sm:w-6 sm:h-6" />
            <span className="text-xs sm:text-base">新規登録</span>
          </button>
        </div>

        {/* フィルター */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* リーグ選択 */}
          <select
            value={selectedLeagueId}
            onChange={(e) => {
              setSelectedLeagueId(e.target.value);
              setSelectedTeamId("all");
            }}
            className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-neutral-800 text-white-1 rounded-lg border-2 border-neutral-700 hover:border-neutral-600 focus:outline-none focus:border-green-500 transition-colors text-sm sm:text-base"
          >
            <option value="all">すべてのリーグ</option>
            {leagues.map((league) => (
              <option key={league._id} value={league._id}>
                {league.title}
              </option>
            ))}
          </select>

          {/* チーム選択 */}
          <select
            value={selectedTeamId}
            onChange={(e) => setSelectedTeamId(e.target.value)}
            className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-neutral-800 text-white-1 rounded-lg border-2 border-neutral-700 hover:border-neutral-600 focus:outline-none focus:border-green-500 transition-colors text-sm sm:text-base"
            disabled={selectedLeagueId === "all" && teams.length > 0}
          >
            <option value="all">すべてのチーム</option>
            {availableTeams.map((team) => (
              <option key={team._id} value={team.teamName}>
                {team.teamName}
              </option>
            ))}
          </select>

          {/* 結果選択 */}
          <select
            value={selectedResult}
            onChange={(e) => setSelectedResult(e.target.value)}
            className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-neutral-800 text-white-1 rounded-lg border-2 border-neutral-700 hover:border-neutral-600 focus:outline-none focus:border-green-500 transition-colors text-sm sm:text-base"
            disabled={selectedTeamId === "all"}
          >
            <option value="all">すべての結果</option>
            <option value="win">勝利</option>
            <option value="draw">引き分け</option>
            <option value="lose">敗北</option>
          </select>
        </div>
      </div>

      {filteredMatches.length === 0 ? (
        <div className="bg-neutral-800 rounded-lg p-8 text-center text-neutral-400">
          {selectedLeagueId === "all"
            ? "試合結果がありません。新規登録してください。"
            : selectedTeamId === "all"
              ? "このリーグに登録されている試合結果はありません。"
              : "条件に一致する試合結果がありません。"}
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredMatches.map((match) => {
            const leagueTitle = getLeagueTitle(match.leagueId);

            // 選択されたチームの結果を判定
            let resultStatus = "";
            if (selectedTeamId !== "all") {
              if (match.homeScore === match.awayScore) {
                resultStatus = "draw";
              } else if (
                (match.homeTeam === selectedTeamId &&
                  match.homeScore > match.awayScore) ||
                (match.awayTeam === selectedTeamId &&
                  match.awayScore > match.homeScore)
              ) {
                resultStatus = "win";
              } else {
                resultStatus = "lose";
              }
            }

            return (
              <motion.div
                key={match._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`group relative rounded-xl border-2 p-3 sm:p-5 transition-all duration-300 ${
                  resultStatus === "win"
                    ? "bg-green-600/10 border-green-500/30 hover:border-green-500/50"
                    : resultStatus === "lose"
                      ? "bg-red-600/10 border-red-500/30 hover:border-red-500/50"
                      : resultStatus === "draw"
                        ? "bg-neutral-700/30 border-neutral-600/30 hover:border-neutral-500/50"
                        : "bg-neutral-800/50 border-neutral-700/50 hover:border-neutral-600"
                }`}
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
                    <div
                      className={`flex-1 min-w-0 text-right ${
                        match.homeTeam === selectedTeamId &&
                        selectedTeamId !== "all"
                          ? "font-bold"
                          : ""
                      }`}
                    >
                      <p
                        className={`text-sm sm:text-lg md:text-xl font-bold truncate ${
                          match.homeTeam === selectedTeamId &&
                          selectedTeamId !== "all"
                            ? "text-green-400"
                            : "text-white-1"
                        }`}
                      >
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
                    <div
                      className={`flex-1 min-w-0 text-left ${
                        match.awayTeam === selectedTeamId &&
                        selectedTeamId !== "all"
                          ? "font-bold"
                          : ""
                      }`}
                    >
                      <p
                        className={`text-sm sm:text-lg md:text-xl font-bold truncate ${
                          match.awayTeam === selectedTeamId &&
                          selectedTeamId !== "all"
                            ? "text-green-400"
                            : "text-white-1"
                        }`}
                      >
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

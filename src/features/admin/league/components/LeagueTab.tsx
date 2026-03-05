import { motion } from "framer-motion";
import { MdAdd } from "react-icons/md";
import { LeagueInfo } from "@/types/league";
import { useRouter } from "next/navigation";

interface LeagueTabProps {
  leagues: LeagueInfo[];
  onToggleActive: (leagueId: string, currentStatus: boolean) => void;
}

export const LeagueTab = ({ leagues, onToggleActive }: LeagueTabProps) => {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center mb-6 gap-3">
        <h2 className="text-lg sm:text-2xl font-bold text-white-1">
          リーグ情報 ({leagues.length}件)
        </h2>
        <button
          onClick={() => router.push("/admin/league/create-league")}
          className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-6 sm:py-3 bg-green-600 text-white-1 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
        >
          <MdAdd size={20} className="sm:w-6 sm:h-6" />
          <span className="text-xs sm:text-base">新規登録</span>
        </button>
      </div>

      {leagues.length === 0 ? (
        <div className="bg-neutral-800 rounded-lg p-8 text-center text-neutral-400">
          リーグ情報がありません。新規登録してください。
        </div>
      ) : (
        <div className="grid gap-3">
          {leagues.map((league) => (
            <motion.div
              key={league._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`group relative rounded-xl p-3 sm:p-5 transition-all duration-300 ${
                league.isActive
                  ? "bg-gradient-to-r from-green-600/20 to-green-500/10 border-2 border-green-500/50 hover:border-green-400"
                  : "bg-neutral-800/50 border-2 border-neutral-700/50 hover:border-neutral-600"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                {/* タイトル部分 */}
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <div
                    className={`w-1.5 sm:w-2 h-10 sm:h-12 rounded-full transition-all flex-shrink-0 ${
                      league.isActive
                        ? "bg-green-500 shadow-lg shadow-green-500/50"
                        : "bg-neutral-600"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        className={`text-base sm:text-xl md:text-2xl font-bold transition-colors ${
                          league.isActive ? "text-white-1" : "text-neutral-300"
                        }`}
                      >
                        {league.title}
                      </h3>
                      {league.isActive && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 bg-green-500 text-white-1 text-[10px] sm:text-xs font-bold rounded-full shadow-lg flex-shrink-0"
                        >
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white-1 rounded-full animate-pulse" />
                          ACTIVE
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ボタン群 */}
                <div className="flex items-center gap-2 sm:gap-2 flex-shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => onToggleActive(league._id!, league.isActive)}
                    className={`flex-1 sm:flex-none px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
                      league.isActive
                        ? "bg-neutral-700 text-neutral-300 hover:bg-neutral-600 hover:text-white-1"
                        : "bg-green-600 text-white-1 hover:bg-green-500 shadow-lg shadow-green-600/30"
                    }`}
                    title={
                      league.isActive
                        ? "非アクティブにする"
                        : "アクティブにする"
                    }
                  >
                    {league.isActive ? "無効化" : "有効化"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

import { connectDb } from "@/utils/database";
import { ScheduleModel } from "@/models/schedule";
import { ImageModel } from "@/models/image";
import { LeagueModel } from "@/models/league";
import { LeagueTeamModel } from "@/models/leagueTeam";
import { MatchResultModel } from "@/models/matchResult";
import { ScheduleData } from "@/types/schedule";
import { ImageData } from "@/types/image";
import { League, LeagueData } from "@/types/league";

/**
 * サーバーサイドでスケジュールデータを取得
 */
export async function getSchedules(): Promise<ScheduleData[]> {
  try {
    await connectDb();
    const schedules = await ScheduleModel.find().sort({ date: -1 }).lean();

    // MongoDBのオブジェクトをプレーンなJSONに変換
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return schedules.map((schedule: any) => ({
      _id: schedule._id.toString(),
      date: schedule.date,
      title: schedule.title || "",
      description: schedule.description || "",
      teamName: schedule.teamName || "",
      thumbnail: schedule.thumbnail || "",
      location: schedule.location || "",
      result: schedule.result || "",
      pk: schedule.pk || "",
      kickoffTime: schedule.kickoffTime || "",
      scorer: schedule.scorer || [],
    }));
  } catch (error) {
    console.error("スケジュール取得エラー:", error);
    return [];
  }
}

/**
 * サーバーサイドで画像データを取得
 * @param limit 取得する画像の枚数（指定した場合はランダムに取得、指定しない場合はすべて取得）
 */
export async function getImages(limit?: number): Promise<ImageData[]> {
  try {
    await connectDb();
    let images;

    if (limit) {
      // ランダムにlimit枚取得
      images = await ImageModel.aggregate([{ $sample: { size: limit } }]);
    } else {
      // 全件取得（作成日時の降順）
      images = await ImageModel.find().sort({ createdAt: -1 }).lean();
    }

    // MongoDBのオブジェクトをプレーンなJSONに変換
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return images.map((image: any) => ({
      _id: image._id.toString(),
      contentType: image.contentType || "",
      data: image.data || "",
    }));
  } catch (error) {
    console.error("画像取得エラー:", error);
    return [];
  }
}

/**
 * リーグ順位表データを取得（試合結果から自動計算）
 */
export async function getLeagueStandings(year?: number): Promise<LeagueData> {
  try {
    await connectDb();

    // アクティブなリーグを取得
    let targetYear = year;
    if (!targetYear) {
      const activeLeague = await LeagueModel.findOne({ isActive: true });
      targetYear = activeLeague?.year || new Date().getFullYear();
    }

    const leagueInfo = await LeagueModel.findOne({
      year: targetYear,
      isActive: true,
    });

    if (!leagueInfo) {
      return { title: "", league: [], year: "" };
    }

    // リーグに参加しているチームを取得
    const teams = await LeagueTeamModel.find({
      leagueId: leagueInfo._id,
    }).lean();

    // 試合結果を取得
    const matches = await MatchResultModel.find({
      leagueId: leagueInfo._id,
      isFinished: true,
    }).lean();

    // チームごとの成績を計算
    const standings: Map<string, League> = new Map();

    // 初期化
    teams.forEach((team) => {
      standings.set(team.teamName, {
        team: team.teamName,
        game_count: 0,
        points: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        goalsFor: 0,
        goalsAgainst: 0,
      });
    });

    // 試合結果を集計
    matches.forEach((match) => {
      const homeTeamStats = standings.get(match.homeTeam);
      const awayTeamStats = standings.get(match.awayTeam);

      if (!homeTeamStats || !awayTeamStats) return;

      // 試合数を増やす
      homeTeamStats.game_count++;
      awayTeamStats.game_count++;

      // 得点・失点を追加
      homeTeamStats.goalsFor += match.homeScore;
      homeTeamStats.goalsAgainst += match.awayScore;
      awayTeamStats.goalsFor += match.awayScore;
      awayTeamStats.goalsAgainst += match.homeScore;

      // 勝敗判定
      if (match.homeScore > match.awayScore) {
        // ホームチームの勝利
        homeTeamStats.wins++;
        homeTeamStats.points += 3;
        awayTeamStats.losses++;
      } else if (match.homeScore < match.awayScore) {
        // アウェイチームの勝利
        awayTeamStats.wins++;
        awayTeamStats.points += 3;
        homeTeamStats.losses++;
      } else {
        // 引き分け
        homeTeamStats.draws++;
        awayTeamStats.draws++;
        homeTeamStats.points += 1;
        awayTeamStats.points += 1;
      }

      standings.set(match.homeTeam, homeTeamStats);
      standings.set(match.awayTeam, awayTeamStats);
    });

    // 順位表をソート
    const league = Array.from(standings.values()).sort((a, b) => {
      // 勝ち点で比較
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      // 得失点差で比較
      const bDiff = b.goalsFor - b.goalsAgainst;
      const aDiff = a.goalsFor - a.goalsAgainst;
      if (bDiff !== aDiff) {
        return bDiff - aDiff;
      }
      // 総得点で比較
      return b.goalsFor - a.goalsFor;
    });

    return {
      title: leagueInfo.title,
      league,
      year: targetYear ? targetYear.toString() : "",
    };
  } catch (error) {
    console.error("リーグ順位表取得エラー:", error);
    return { title: "", league: [], year: "" };
  }
}

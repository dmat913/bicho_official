import { NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import { LeagueModel } from "@/models/league";
import { LeagueTeamModel } from "@/models/leagueTeam";
import { MatchResultModel } from "@/models/matchResult";

/**
 * DB状態を確認
 * GET /api/check-db
 */
export async function GET() {
  try {
    await connectDb();

    // リーグ情報を確認
    const leagues = await LeagueModel.find().lean();

    // チーム情報を確認
    const teams = await LeagueTeamModel.find().lean();

    // 試合結果を確認
    const matches = await MatchResultModel.find().lean();

    return NextResponse.json({
      success: true,
      data: {
        leagues: {
          count: leagues.length,
          data: leagues,
        },
        teams: {
          count: teams.length,
          data: teams,
        },
        matches: {
          count: matches.length,
          data: matches,
        },
      },
    });
  } catch (error) {
    console.error("DB確認エラー:", error);
    return NextResponse.json(
      { success: false, error: "サーバーエラーが発生しました" },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import { MatchResultModel } from "@/models/matchResult";
import { LeagueModel } from "@/models/league";
import { LeagueTeamModel } from "@/models/leagueTeam";
import { revalidatePath } from "next/cache";

/**
 * 試合結果を登録
 * POST /api/match-results
 */
export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const body = await request.json();
    const {
      leagueId,
      matchDate,
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      venue,
      notes,
    } = body;

    // バリデーション
    if (!leagueId || !matchDate || !homeTeam || !awayTeam) {
      return NextResponse.json(
        { success: false, error: "必須項目が不足しています" },
        { status: 400 },
      );
    }

    if (homeScore === undefined || awayScore === undefined) {
      return NextResponse.json(
        { success: false, error: "スコアが不足しています" },
        { status: 400 },
      );
    }

    // リーグの存在確認
    const league = await LeagueModel.findById(leagueId);
    if (!league) {
      return NextResponse.json(
        { success: false, error: "リーグが見つかりません" },
        { status: 404 },
      );
    }

    // チームの存在確認
    const homeTeamExists = await LeagueTeamModel.findOne({
      leagueId,
      teamName: homeTeam,
    });
    const awayTeamExists = await LeagueTeamModel.findOne({
      leagueId,
      teamName: awayTeam,
    });

    if (!homeTeamExists || !awayTeamExists) {
      return NextResponse.json(
        { success: false, error: "チームが見つかりません" },
        { status: 404 },
      );
    }

    // 試合結果を登録
    const matchResult = await MatchResultModel.create({
      leagueId,
      matchDate: new Date(matchDate),
      homeTeam,
      awayTeam,
      homeScore: Number(homeScore),
      awayScore: Number(awayScore),
      isFinished: true,
      venue,
      notes,
    });

    // キャッシュを再検証
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      data: matchResult,
    });
  } catch (error) {
    console.error("試合結果登録エラー:", error);
    return NextResponse.json(
      { success: false, error: "サーバーエラーが発生しました" },
      { status: 500 },
    );
  }
}

/**
 * 試合結果一覧を取得
 * GET /api/match-results?leagueId=xxx
 */
export async function GET(request: NextRequest) {
  try {
    await connectDb();

    const searchParams = request.nextUrl.searchParams;
    const leagueId = searchParams.get("leagueId");

    if (!leagueId) {
      return NextResponse.json(
        { success: false, error: "leagueIdが必要です" },
        { status: 400 },
      );
    }

    const matchResults = await MatchResultModel.find({ leagueId })
      .sort({ matchDate: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: matchResults,
    });
  } catch (error) {
    console.error("試合結果取得エラー:", error);
    return NextResponse.json(
      { success: false, error: "サーバーエラーが発生しました" },
      { status: 500 },
    );
  }
}

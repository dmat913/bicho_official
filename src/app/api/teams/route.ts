import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import { LeagueTeamModel } from "@/models/leagueTeam";
import { LeagueModel } from "@/models/league";
import { revalidatePath } from "next/cache";

/**
 * チームを登録
 * POST /api/teams
 */
export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const body = await request.json();
    const { leagueId, teamName } = body;

    // バリデーション
    if (!leagueId || !teamName) {
      return NextResponse.json(
        { success: false, error: "必須項目が不足しています" },
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

    // チームを登録
    const team = await LeagueTeamModel.create({
      leagueId,
      teamName,
    });

    // キャッシュを再検証
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      data: team,
    });
  } catch (error: unknown) {
    console.error("チーム登録エラー:", error);

    // ユニークキー違反の場合
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: number }).code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "同じリーグに同じ名前のチームが既に存在します",
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { success: false, error: "サーバーエラーが発生しました" },
      { status: 500 },
    );
  }
}

/**
 * チーム一覧を取得
 * GET /api/teams?leagueId=xxx
 */
export async function GET(request: NextRequest) {
  try {
    await connectDb();

    const searchParams = request.nextUrl.searchParams;
    const leagueId = searchParams.get("leagueId");

    const query = leagueId ? { leagueId } : {};
    const teams = await LeagueTeamModel.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: teams,
    });
  } catch (error) {
    console.error("チーム取得エラー:", error);
    return NextResponse.json(
      { success: false, error: "サーバーエラーが発生しました" },
      { status: 500 },
    );
  }
}

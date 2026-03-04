import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import { LeagueModel } from "@/models/league";
import { revalidatePath } from "next/cache";

/**
 * リーグ情報を登録
 * POST /api/leagues
 */
export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const body = await request.json();
    const { year, title, season, division, isActive } = body;

    // バリデーション
    if (!year || !title || !season || !division) {
      return NextResponse.json(
        { success: false, error: "必須項目が不足しています" },
        { status: 400 },
      );
    }

    // リーグを登録
    const league = await LeagueModel.create({
      year: Number(year),
      title,
      season,
      division,
      isActive: isActive !== undefined ? isActive : true,
    });

    // キャッシュを再検証
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      data: league,
    });
  } catch (error: unknown) {
    console.error("リーグ登録エラー:", error);

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
          error: "同じ年度・シーズン・ディビジョンのリーグが既に存在します",
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
 * リーグ情報一覧を取得
 * GET /api/leagues
 */
export async function GET() {
  try {
    await connectDb();

    const leagues = await LeagueModel.find()
      .sort({ year: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: leagues,
    });
  } catch (error) {
    console.error("リーグ取得エラー:", error);
    return NextResponse.json(
      { success: false, error: "サーバーエラーが発生しました" },
      { status: 500 },
    );
  }
}

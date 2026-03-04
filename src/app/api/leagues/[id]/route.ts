import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import { LeagueModel } from "@/models/league";
import { revalidatePath } from "next/cache";

/**
 * リーグ情報を取得
 * GET /api/leagues/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectDb();

    const league = await LeagueModel.findById(params.id).lean();

    if (!league) {
      return NextResponse.json(
        { success: false, error: "リーグが見つかりません" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: league,
    });
  } catch (error) {
    console.error("リーグ取得エラー:", error);
    return NextResponse.json(
      { success: false, error: "サーバーエラーが発生しました" },
      { status: 500 },
    );
  }
}

/**
 * リーグ情報を更新
 * PUT /api/leagues/[id]
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectDb();

    const body = await request.json();
    const { year, title, season, division, isActive } = body;

    const updateData: {
      year?: number;
      title?: string;
      season?: string;
      division?: string;
      isActive?: boolean;
      updatedAt: Date;
    } = {
      updatedAt: new Date(),
    };

    if (year !== undefined) updateData.year = Number(year);
    if (title !== undefined) updateData.title = title;
    if (season !== undefined) updateData.season = season;
    if (division !== undefined) updateData.division = division;
    if (isActive !== undefined) updateData.isActive = isActive;

    const league = await LeagueModel.findByIdAndUpdate(params.id, updateData, {
      new: true,
    });

    if (!league) {
      return NextResponse.json(
        { success: false, error: "リーグが見つかりません" },
        { status: 404 },
      );
    }

    // キャッシュを再検証
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      data: league,
    });
  } catch (error: unknown) {
    console.error("リーグ更新エラー:", error);

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
 * リーグ情報を削除
 * DELETE /api/leagues/[id]
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectDb();

    const league = await LeagueModel.findByIdAndDelete(params.id);

    if (!league) {
      return NextResponse.json(
        { success: false, error: "リーグが見つかりません" },
        { status: 404 },
      );
    }

    // キャッシュを再検証
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      message: "リーグを削除しました",
    });
  } catch (error) {
    console.error("リーグ削除エラー:", error);
    return NextResponse.json(
      { success: false, error: "サーバーエラーが発生しました" },
      { status: 500 },
    );
  }
}

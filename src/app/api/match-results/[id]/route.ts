import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import { MatchResultModel } from "@/models/matchResult";
import { revalidatePath } from "next/cache";

/**
 * 試合結果を更新
 * PUT /api/match-results/[id]
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectDb();

    const body = await request.json();
    const { homeScore, awayScore, venue, notes } = body;

    const updateData: {
      updatedAt: Date;
      homeScore?: number;
      awayScore?: number;
      venue?: string;
      notes?: string;
    } = {
      updatedAt: new Date(),
    };

    if (homeScore !== undefined) updateData.homeScore = Number(homeScore);
    if (awayScore !== undefined) updateData.awayScore = Number(awayScore);
    if (venue !== undefined) updateData.venue = venue;
    if (notes !== undefined) updateData.notes = notes;

    const matchResult = await MatchResultModel.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true },
    );

    if (!matchResult) {
      return NextResponse.json(
        { success: false, error: "試合結果が見つかりません" },
        { status: 404 },
      );
    }

    // キャッシュを再検証
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      data: matchResult,
    });
  } catch (error) {
    console.error("試合結果更新エラー:", error);
    return NextResponse.json(
      { success: false, error: "サーバーエラーが発生しました" },
      { status: 500 },
    );
  }
}

/**
 * 試合結果を削除
 * DELETE /api/match-results/[id]
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectDb();

    const matchResult = await MatchResultModel.findByIdAndDelete(params.id);

    if (!matchResult) {
      return NextResponse.json(
        { success: false, error: "試合結果が見つかりません" },
        { status: 404 },
      );
    }

    // キャッシュを再検証
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      message: "試合結果を削除しました",
    });
  } catch (error) {
    console.error("試合結果削除エラー:", error);
    return NextResponse.json(
      { success: false, error: "サーバーエラーが発生しました" },
      { status: 500 },
    );
  }
}

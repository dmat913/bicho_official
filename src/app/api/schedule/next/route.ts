import { NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import { ScheduleModel } from "@/models/schedule";

export async function GET() {
  try {
    // データベース接続を確立
    await connectDb();

    // 今日以降の未来の日程を1件取得
    const currentDate = new Date();
    const schedule = await ScheduleModel.findOne({
      date: { $gte: currentDate },
    }).sort({ date: 1 });

    if (schedule) {
      return NextResponse.json({
        message: "データ取得成功",
        schedule: [schedule],
      });
    } else {
      return NextResponse.json(
        { message: "データが見つかりませんでした" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("データ取得エラー:", error);
    return NextResponse.json(
      { message: "データ取得失敗：エラーが発生しました" },
      { status: 500 }
    );
  }
}

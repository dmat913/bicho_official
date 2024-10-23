import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import { ScheduleModel } from "@/models/schedule";

// 試合日程追加処理
export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const {
      date,
      title,
      description,
      teamName,
      thumbnail,
      location,
      scorer,
      result,
      kickoffTime,
    } = await request.json();

    // 必須フィールドのチェック
    if (!date || !title || !description || !teamName || !location) {
      return NextResponse.json(
        { message: "必須項目が不足しています" },
        { status: 400 }
      );
    }

    const newEvent = new ScheduleModel({
      date,
      title,
      description,
      teamName,
      thumbnail,
      location,
      scorer: scorer.filter((row: string) => row !== ""),
      result,
      kickoffTime,
    });

    // MongoDBに保存
    await newEvent.save();

    return NextResponse.json({
      message: "試合日程が追加されました",
      event: newEvent,
    });
  } catch (error) {
    console.error("試合日程追加エラー:", error);
    return NextResponse.json(
      { message: "試合日程追加に失敗しました" },
      { status: 500 }
    );
  }
}

export async function GET(_: NextRequest) {
  try {
    // データベース接続を確立
    await connectDb();

    // スケジュール一覧を取得
    const schedules = await ScheduleModel.find();

    // データが見つかった場合
    if (schedules.length > 0) {
      return NextResponse.json({ message: "データ取得成功", schedules });
    } else {
      // データが見つからない場合
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

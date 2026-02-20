import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import { ScheduleModel } from "@/models/schedule";
import { revalidatePath } from "next/cache";

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
      pk,
      kickoffTime,
    } = await request.json();

    // 必須フィールドのチェック
    if (!date || !title || !description || !teamName || !location) {
      return NextResponse.json(
        { message: "必須項目が不足しています" },
        { status: 400 },
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
      pk,
      kickoffTime,
    });

    // MongoDBに保存
    await newEvent.save();

    // HOMEページと試合日程ページのキャッシュを即座に無効化
    revalidatePath("/");
    revalidatePath("/schedule");

    return NextResponse.json({
      message: "試合日程が追加されました",
      event: newEvent,
    });
  } catch (error) {
    console.error("試合日程追加エラー:", error);
    return NextResponse.json(
      { message: "試合日程追加に失敗しました" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    // データベース接続を確立
    await connectDb();

    // スケジュール一覧を取得して、dateフィールドで降順に並べ替え
    const schedules = await ScheduleModel.find().sort({ date: -1 });

    // データが見つかった場合
    if (schedules.length > 0) {
      return NextResponse.json({ message: "データ取得成功", schedules });
    } else {
      // データが見つからない場合
      return NextResponse.json(
        { message: "データが見つかりませんでした" },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("データ取得エラー:", error);
    return NextResponse.json(
      { message: "データ取得失敗：エラーが発生しました" },
      { status: 500 },
    );
  }
}

// 試合日程編集処理
export async function PATCH(request: NextRequest) {
  try {
    await connectDb();

    const { _id, ...updateFields } = await request.json();

    // ID のチェック
    if (!_id) {
      return NextResponse.json(
        { message: "ID が不足しています" },
        { status: 400 },
      );
    }

    // `scorer` の処理: 空文字を除外
    if (updateFields.scorer) {
      updateFields.scorer = updateFields.scorer.filter(
        (row: string) => row !== "",
      );
    }

    // データ更新
    const updatedEvent = await ScheduleModel.findByIdAndUpdate(
      _id,
      updateFields,
      { new: true }, // 更新後のデータを取得
    );

    // 該当ドキュメントがない場合
    if (!updatedEvent) {
      return NextResponse.json(
        { message: "指定された試合日程が見つかりませんでした" },
        { status: 404 },
      );
    }

    // HOMEページと試合日程ページのキャッシュを即座に無効化
    revalidatePath("/");
    revalidatePath("/schedule");

    return NextResponse.json({
      message: "試合日程が更新されました",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("試合日程編集エラー:", error);
    return NextResponse.json(
      { message: "試合日程の更新に失敗しました" },
      { status: 500 },
    );
  }
}

// 試合日程削除処理
export async function DELETE(request: NextRequest) {
  try {
    await connectDb();

    // クエリパラメータからIDを取得
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("_id");

    // IDのチェック
    if (!id) {
      return NextResponse.json(
        { message: "ID が不足しています" },
        { status: 400 },
      );
    }

    // 該当データを削除
    const deletedEvent = await ScheduleModel.findByIdAndDelete(id);

    // 該当データが見つからない場合
    if (!deletedEvent) {
      return NextResponse.json(
        { message: "指定された試合日程が見つかりませんでした" },
        { status: 404 },
      );
    }

    // HOMEページと試合日程ページのキャッシュを即座に無効化
    revalidatePath("/");
    revalidatePath("/schedule");

    return NextResponse.json({
      message: "試合日程が削除されました",
      deletedEvent,
    });
  } catch (error) {
    console.error("試合日程削除エラー:", error);
    return NextResponse.json(
      { message: "試合日程の削除に失敗しました" },
      { status: 500 },
    );
  }
}

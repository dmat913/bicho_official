import { NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import { ImageModel } from "@/models/image";

export async function GET() {
  try {
    // DB接続
    await connectDb();
    // 全件取得、作成日時の降順
    const images = await ImageModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(images);
  } catch (error) {
    console.error("画像取得エラー:", error);
    return NextResponse.json(
      {
        message: "画像の取得に失敗しました",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import { ImageModel } from "@/models/image";

// 最初の画像取得
export async function GET() {
  try {
    // DB接続
    await connectDb();

    // 一番最初の画像を取得
    const firstImage = await ImageModel.findOne().sort({
      createdAt: -1,
    });

    if (firstImage) {
      return NextResponse.json([firstImage]);
    } else {
      return NextResponse.json(
        { message: "画像が存在しません" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("画像取得エラー:", error);
    return NextResponse.json(
      { message: "画像の取得に失敗しました" },
      { status: 500 }
    );
  }
}

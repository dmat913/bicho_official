import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import { ImageModel } from "@/models/image";

export async function POST(request: NextRequest) {
  try {
    // DB接続
    await connectDb();
    const { uploadImage } = await request.json();

    // fileが存在しない場合,error
    if (!uploadImage) {
      return NextResponse.json(
        { message: "画像が不足しています" },
        { status: 400 }
      );
    }

    const newImage = new ImageModel({
      data: uploadImage,
      contentType: uploadImage.split(";")[0].split(":")[1],
    });

    await newImage.save();

    return NextResponse.json(
      { message: "画像がアップロードされました" },
      { status: 201 }
    );
  } catch (error) {
    console.error("画像アップロードエラー:", error);
    return NextResponse.json(
      {
        message: "アップロードに失敗しました",
        error: error || "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // DB接続
    await connectDb();
    const images = await ImageModel.find().sort({ createdAt: -1 }); // 新しい順に取得
    return NextResponse.json(images);
  } catch (error) {
    console.error("画像取得エラー:", error);
    return NextResponse.json(
      { message: "画像の取得に失敗しました" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import { ImageModel } from "@/models/image";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null; // ここで型アサーションを使用

    if (!imageFile) {
      return NextResponse.json(
        { message: "画像が不足しています" },
        { status: 400 }
      );
    }

    const buffer = await imageFile.arrayBuffer();
    const newImage = new ImageModel({
      data: Buffer.from(buffer),
      contentType: imageFile.type,
    });

    await newImage.save();
    return NextResponse.json(
      { message: "画像がアップロードされました" },
      { status: 201 }
    );
  } catch (error) {
    console.error("画像アップロードエラー:", error);
    return NextResponse.json(
      { message: "アップロードに失敗しました" },
      { status: 500 }
    );
  }
}

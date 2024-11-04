import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import { ImageModel } from "@/models/image";

// 追加処理
export async function POST(request: NextRequest) {
  try {
    // DB接続
    await connectDb();

    // imagesコレクションのドキュメント数を取得
    const imageCount = await ImageModel.countDocuments();

    // 画像が10個以上ある場合、エラーを返す
    if (imageCount >= 10) {
      return NextResponse.json(
        { message: "画像は10個未満でアップロードしてください" },
        { status: 400 }
      );
    }

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

// 取得処理
export async function GET() {
  try {
    // DB接続
    await connectDb();
    const images = await ImageModel.find().sort({ createdAt: -1 });
    return NextResponse.json(images);
  } catch (error) {
    console.error("画像取得エラー:", error);
    return NextResponse.json(
      { message: "画像の取得に失敗しました" },
      { status: 500 }
    );
  }
}

// 削除処理
export async function DELETE(request: NextRequest) {
  try {
    // DB接続
    await connectDb();

    // リクエストから削除する画像のIDを取得
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get("id");

    if (!imageId) {
      return NextResponse.json(
        { message: "画像IDが不足しています" },
        { status: 400 }
      );
    }

    // 画像の数を取得
    const imageCount = await ImageModel.countDocuments();

    // 画像が1枚だけの場合、削除を拒否
    if (imageCount <= 1) {
      return NextResponse.json(
        { message: "画像が1枚しかないため、削除できません" },
        { status: 403 }
      );
    }

    // 画像を検索
    const image = await ImageModel.findById(imageId);
    if (!image) {
      return NextResponse.json(
        { message: "指定された画像が見つかりません" },
        { status: 404 }
      );
    }

    // 画像を削除
    await ImageModel.findByIdAndDelete(imageId);

    return NextResponse.json(
      { message: "画像が削除されました" },
      { status: 200 }
    );
  } catch (error) {
    console.error("画像削除エラー:", error);
    return NextResponse.json(
      {
        message: "画像の削除に失敗しました",
        error: error || "Unknown error",
      },
      { status: 500 }
    );
  }
}

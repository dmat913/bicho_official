import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import { ImageModel } from "@/models/image";
import { revalidatePath } from "next/cache";

// ISRを無効化して動的レンダリングを強制（大容量データのため）
export const dynamic = "force-dynamic";

// APIルートの設定（動画アップロード対応のためボディサイズ制限を増やす）
export const maxDuration = 60; // 最大実行時間（秒）

// 追加処理
export async function POST(request: NextRequest) {
  try {
    // DB接続
    await connectDb();

    // リクエストボディのサイズを確認
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 100 * 1024 * 1024) {
      return NextResponse.json(
        { message: "ファイルサイズが大きすぎます（最大100MB）" },
        { status: 413 },
      );
    }

    const { uploadImage } = await request.json();

    // fileが存在しない場合,error
    if (!uploadImage) {
      return NextResponse.json(
        { message: "ファイルが不足しています" },
        { status: 400 },
      );
    }

    // Base64文字列の検証
    if (!uploadImage.startsWith("data:")) {
      return NextResponse.json(
        { message: "無効なファイル形式です" },
        { status: 400 },
      );
    }

    const newImage = new ImageModel({
      data: uploadImage,
      contentType: uploadImage.split(";")[0].split(":")[1],
    });

    await newImage.save();

    // HOMEページのキャッシュを即座に無効化
    revalidatePath("/");

    return NextResponse.json(
      { message: "ファイルがアップロードされました" },
      { status: 201 },
    );
  } catch (error) {
    console.error("ファイルアップロードエラー:", error);

    // エラーの種類に応じた詳細なメッセージ
    if (error instanceof Error) {
      if (error.message.includes("payload")) {
        return NextResponse.json(
          {
            message:
              "ファイルサイズが大きすぎます。30MB以下のファイルを選択してください。",
          },
          { status: 413 },
        );
      }
    }

    return NextResponse.json(
      {
        message: "アップロードに失敗しました",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// 取得処理
export async function GET() {
  try {
    // DB接続
    await connectDb();
    // ランダムに10件取得
    const images = await ImageModel.aggregate([{ $sample: { size: 10 } }]);
    return NextResponse.json(images);
  } catch (error) {
    console.error("メディア取得エラー:", error);
    return NextResponse.json(
      { message: "メディアの取得に失敗しました" },
      { status: 500 },
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
        { message: "ファイルIDが不足しています" },
        { status: 400 },
      );
    }

    // 画像の数を取得
    const imageCount = await ImageModel.countDocuments();

    // 画像が1枚だけの場合、削除を拒否
    if (imageCount <= 1) {
      return NextResponse.json(
        { message: "ファイルが1つしかないため、削除できません" },
        { status: 403 },
      );
    }

    // 画像を検索
    const image = await ImageModel.findById(imageId);
    if (!image) {
      return NextResponse.json(
        { message: "指定されたファイルが見つかりません" },
        { status: 404 },
      );
    }

    // 画像を削除
    await ImageModel.findByIdAndDelete(imageId);

    // HOMEページのキャッシュを即座に無効化
    revalidatePath("/");

    return NextResponse.json(
      { message: "ファイルが削除されました" },
      { status: 200 },
    );
  } catch (error) {
    console.error("ファイル削除エラー:", error);
    return NextResponse.json(
      {
        message: "ファイルの削除に失敗しました",
        error: error || "Unknown error",
      },
      { status: 500 },
    );
  }
}

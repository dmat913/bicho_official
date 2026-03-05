import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async () => {
  // 既に接続されている場合はスキップ
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  // DB_URIが設定されていない場合
  if (!process.env.DB_URI) {
    console.warn("⚠️ DB_URI is not set. Database features will be disabled.");
    return;
  }

  try {
    // タイムアウトとリトライ設定を追加
    await mongoose.connect(process.env.DB_URI, {
      serverSelectionTimeoutMS: 5000, // 5秒でタイムアウト
      socketTimeoutMS: 10000, // 10秒でソケットタイムアウト
    });
    isConnected = true;
    console.log("✅ DB接続成功");
  } catch (error) {
    console.error(
      "❌ DB接続に失敗しました:",
      error instanceof Error ? error.message : error,
    );
    // エラーをthrowせず、アプリケーションの起動を継続
    // データ取得系の関数で空配列を返す処理が有効になる
  }
};

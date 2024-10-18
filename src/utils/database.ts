import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI || "");
    console.log("DB接続成功");
  } catch (error) {
    console.log("DB接続に失敗しました。");
    throw new Error();
  }
};

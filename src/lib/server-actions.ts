import { connectDb } from "@/utils/database";
import { ScheduleModel } from "@/models/schedule";
import { ImageModel } from "@/models/image";
import { ScheduleData } from "@/types/schedule";
import { ImageData } from "@/types/image";

/**
 * サーバーサイドでスケジュールデータを取得
 */
export async function getSchedules(): Promise<ScheduleData[]> {
  try {
    await connectDb();
    const schedules = await ScheduleModel.find().sort({ date: -1 }).lean();

    // MongoDBのオブジェクトをプレーンなJSONに変換
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return schedules.map((schedule: any) => ({
      _id: schedule._id.toString(),
      date: schedule.date,
      title: schedule.title || "",
      description: schedule.description || "",
      teamName: schedule.teamName || "",
      thumbnail: schedule.thumbnail || "",
      location: schedule.location || "",
      result: schedule.result || "",
      pk: schedule.pk || "",
      kickoffTime: schedule.kickoffTime || "",
      scorer: schedule.scorer || [],
    }));
  } catch (error) {
    console.error("スケジュール取得エラー:", error);
    return [];
  }
}

/**
 * サーバーサイドで画像データを取得
 * @param limit 取得する画像の枚数（指定しない場合はすべて取得）
 */
export async function getImages(limit?: number): Promise<ImageData[]> {
  try {
    await connectDb();
    const query = ImageModel.find().sort({ createdAt: -1 });
    const images = limit ? await query.limit(limit).lean() : await query.lean();

    // MongoDBのオブジェクトをプレーンなJSONに変換
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return images.map((image: any) => ({
      _id: image._id.toString(),
      contentType: image.contentType || "",
      data: image.data || "",
    }));
  } catch (error) {
    console.error("画像取得エラー:", error);
    return [];
  }
}

/**
 * サーバーサイドで最初の画像を取得
 */
export async function getFirstImage(): Promise<ImageData | null> {
  try {
    await connectDb();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const image: any = await ImageModel.findOne()
      .sort({ createdAt: -1 })
      .lean();

    if (!image) return null;

    return {
      _id: image._id.toString(),
      contentType: image.contentType || "",
      data: image.data || "",
    };
  } catch (error) {
    console.error("画像取得エラー:", error);
    return null;
  }
}

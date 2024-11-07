import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  teamName: { type: String, required: true },
  thumbnail: { type: String, required: false },
  location: { type: String, required: true },
  result: { type: String, required: false },
  pk: { type: String, required: false },
  kickoffTime: { type: String, required: true },
  scorer: { type: [String], required: false },
});

const ScheduleModel =
  mongoose.models.Schedule || mongoose.model("Schedule", scheduleSchema);

export { ScheduleModel };

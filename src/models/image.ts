import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
  createdAt: { type: Date, default: Date.now },
});

const ImageModel =
  mongoose.models.Image || mongoose.model("Image", ImageSchema);

export { ImageModel };

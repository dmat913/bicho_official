import mongoose from "mongoose";

// images collection schema

const ImageSchema = new mongoose.Schema({
  data: String,
  contentType: String,
  createdAt: { type: Date, default: Date.now },
});

const ImageModel =
  mongoose.models.Image || mongoose.model("Image", ImageSchema);

export { ImageModel };

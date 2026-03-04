import mongoose from "mongoose";

const leagueSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  title: { type: String, required: true },
  season: { type: String, required: true },
  division: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

leagueSchema.index({ year: 1, season: 1, division: 1 }, { unique: true });

const LeagueModel =
  mongoose.models.League || mongoose.model("League", leagueSchema);

export { LeagueModel };

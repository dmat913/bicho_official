import mongoose from "mongoose";

const matchResultSchema = new mongoose.Schema({
  leagueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "League",
    required: true,
  },
  matchDate: { type: Date, required: true },
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  homeScore: { type: Number, required: true },
  awayScore: { type: Number, required: true },
  isFinished: { type: Boolean, default: true },
  venue: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

matchResultSchema.index({ leagueId: 1, matchDate: 1 });
matchResultSchema.index({ leagueId: 1, homeTeam: 1 });
matchResultSchema.index({ leagueId: 1, awayTeam: 1 });

const MatchResultModel =
  mongoose.models.MatchResult ||
  mongoose.model("MatchResult", matchResultSchema);

export { MatchResultModel };

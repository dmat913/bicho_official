import mongoose from "mongoose";

const leagueTeamSchema = new mongoose.Schema({
  leagueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "League",
    required: true,
  },
  teamName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

leagueTeamSchema.index({ leagueId: 1, teamName: 1 }, { unique: true });

const LeagueTeamModel =
  mongoose.models.LeagueTeam || mongoose.model("LeagueTeam", leagueTeamSchema);

export { LeagueTeamModel };

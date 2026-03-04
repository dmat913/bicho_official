export interface League {
  // チーム名
  team: string;
  // 試合数
  game_count: number;
  // 勝ち点
  points: number;
  // 勝
  wins: number;
  // 負
  losses: number;
  // 分
  draws: number;
  // 得点数
  goalsFor: number;
  // 失点数
  goalsAgainst: number;
}

export interface LeagueInfo {
  _id?: string;
  year: number;
  title: string;
  season: string;
  division: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LeagueTeam {
  _id?: string;
  leagueId: string;
  teamName: string;
  createdAt?: Date;
}

export interface MatchResult {
  _id?: string;
  leagueId: string;
  matchDate: Date;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  isFinished: boolean;
  venue?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LeagueData {
  title: string;
  year: string;
  league: League[];
}

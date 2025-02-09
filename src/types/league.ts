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
  // 得失点
  goalDifference: number;
}

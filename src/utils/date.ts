import PASSPOT_LOGO from "@/public/logo/passpotLogo.png";
import SHIMOOCHIAI_LOGO from "@/public/logo/simoochiai.png";
import BEES_EST_LOGO from "@/public/logo/Bees_EST_LOGO.png";
import REVER_NORTE_LOGO from "@/public/logo/RIVERNORTEFC_IMG.png";
import BICHO_LOGO from "@/public/bicho-icon.png";
import TACKYS_LOGO from "@/public/logo/TACKY'S_LOGO.png";
import KEISHIN_LOGO from "@/public/logo/KEISHIN_LOGO.png";
import ASHAHI_LOGO from "@/public/logo/ASHAHI_LOGO.png";
import FURUGON_LOGO from "@/public/logo/FURUGON_LOGO.png";
import OOYABA_LOGO from "@/public/logo/OOYABA_LOGO.png";
import KAWAGUCHIFC_LOGO from "@/public/logo/KAWAGUCHIFC_LOGO.png";
import HGC_LOGO from "@/public/logo/HGC_LOGO.png";
import GRANDE_LOGO from "@/public/logo/GRANDE_LOGO.png";
import {
  LEAGUE_2024,
  LEAGUE_2025,
} from "@/features/home/league-table/data/league";
import KAWAGUCHI_SC_LOGO from "@/public/logo/KAWAGUCHI_SC_LOGO.png";
import { League } from "@/types/league";

export const formatDate = (dateString: Date, timeString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[date.getDay()];

  return `${year}/${month}/${day} (${weekday}) ${timeString}`;
};

export const getLogo = (teamName: string) => {
  switch (teamName) {
    case "埼玉パスポットFC":
      return PASSPOT_LOGO;
    case "川口SC":
      return KAWAGUCHI_SC_LOGO;
    case "下落合FC":
      return SHIMOOCHIAI_LOGO;
    case "Bees EST":
      return BEES_EST_LOGO;
    case "RIVER NORTE FC":
    case "RIVER NORTE":
    case "RIVER":
      return REVER_NORTE_LOGO;
    case "FC.BICHO":
      return BICHO_LOGO;
    case "TACKY'S":
      return TACKYS_LOGO;
    case "繋信FC":
      return KEISHIN_LOGO;
    case "朝日FC GRAZIE":
      return ASHAHI_LOGO;
    case "FCフルゴン":
      return FURUGON_LOGO;
    case "Area大谷場":
      return OOYABA_LOGO;
    case "川口FCセカンド":
      return KAWAGUCHIFC_LOGO;
    case "HGC1990":
      return HGC_LOGO;
    case "GRANDE FC":
      return GRANDE_LOGO;
    default:
      return "";
  }
};

export const getLeagueData = (
  year: string
): {
  league: League[];
  title: string;
} => {
  const sortLeague = (league: League[]): League[] => {
    return league.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      const bDifference = b.goalsFor - b.goalsAgainst;
      const aDifference = a.goalsFor - a.goalsAgainst;
      if (bDifference !== aDifference) {
        return bDifference - aDifference;
      }
     return b.goalsFor - a.goalsFor
    });
  };

  switch (year) {
    case "2024":
      return {
        title: LEAGUE_2024.title,
        league: sortLeague(LEAGUE_2024.league),
      };
    case "2025":
      return {
        title: LEAGUE_2025.title,
        league: sortLeague(LEAGUE_2025.league),
      };
    default:
      return {
        title: LEAGUE_2025.title,
        league: sortLeague(LEAGUE_2025.league),
      };
  }
};

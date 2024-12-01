import PASSPOT_LOGO from "@/public/logo/passpotLogo.png";
import SHIMOOCHIAI_LOGO from "@/public/logo/simoochiai.png";
import BEES_EST_LOGO from "@/public/logo/Bees_EST_LOGO.png";

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
    case "下落合FC":
      return SHIMOOCHIAI_LOGO;
    case "Bees EST":
      return BEES_EST_LOGO;
    default:
      return "";
  }
};

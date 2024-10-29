import PASSPOTLOGO from "@/public/logo/passpotLogo.png";
import SHIMOOCHIAILOGO from "@/public/logo/simoochiai.png";

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
      return PASSPOTLOGO;
    case "下落合FC":
      return SHIMOOCHIAILOGO;
    default:
      return "";
  }
};

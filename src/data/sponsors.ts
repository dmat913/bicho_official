import { StaticImageData } from "next/image";
import KOJIMA_LOGO from "../public/sponsor/kojima-logo.png";
import RESTETODA_LOGO from "../public/sponsor/rest-toda.png";

export interface Sponsor {
  id: string;
  name: string;
  logo: StaticImageData;
  url: string;
  description?: string;
}

export const sponsors: Sponsor[] = [
  {
    id: "kojima-denki",
    name: "小島電機工業株式会社",
    logo: KOJIMA_LOGO,
    url: "https://www.kojima-denki.co.jp/",
    description: "Official Sponsor",
  },
  {
    id: "reste-futsal-city-toda",
    name: "レストフットサルシティ戸田",
    logo: RESTETODA_LOGO,
    url: "https://www.restefutsalcitytoda.jp/",
    description: "Official Sponsor",
  },
];

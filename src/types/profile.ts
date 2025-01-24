import { StaticImageData } from "next/image";

export interface Profile {
  number: string;
  name: string;
  position: string;
  englishName: string;
  img: StaticImageData;
  detail?: {
    competitionData: Detail[];
    images: StaticImageData[];
  };
}

export interface Detail {
  competition: string;
  contents: Data[];
}

export interface Data {
  year: string;
  gameCount: string;
  goal: string;
  assist: string;
}

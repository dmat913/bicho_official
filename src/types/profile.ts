import { StaticImageData } from "next/image";

export interface Profile {
  number: string;
  name: string;
  englishName: string;
  img: StaticImageData;
}

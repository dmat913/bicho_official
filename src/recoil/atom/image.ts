import { atom } from "recoil";
import { ImageData } from "@/types/image";

export const imagesState = atom<ImageData[]>({
  key: "imagesState",
  default: [],
});

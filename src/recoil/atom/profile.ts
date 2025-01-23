import { Profile } from "@/types/profile";
import { atom } from "recoil";

export const ProfileDetailState = atom<Profile | null>({
  key: "ProfileDetailState",
  default: null,
});

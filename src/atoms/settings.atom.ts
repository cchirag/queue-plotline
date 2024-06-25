import { atom } from "recoil";
import { Train } from "../types";

export const SettingsState = atom<{
  platforms: number[];
  trains: Train[];
}>({
  key: "Settings",
  default: {
    platforms: [],
    trains: [],
  },
});

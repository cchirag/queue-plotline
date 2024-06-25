import { atom } from "recoil";
import { Train } from "../types";

export const ReportState = atom<{
  trains: Train[];
}>({
  key: "ReportState",
  default: {
    trains: [],
  },
});

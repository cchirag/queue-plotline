import { atom } from "recoil";
import { Train } from "../types";

export const StagedScheduleState = atom<{
  trains: Train[];
}>({
  key: "StagedSchedule",
  default: {
    trains: [],
  },
});

import { atom } from "recoil";
import { TrainSchedule } from "../types";

export const InitialScheduleState = atom<{
  platforms: number;
  schedule: TrainSchedule[];
} | null>({
  key: "InitialSchedule",
  default: null,
});

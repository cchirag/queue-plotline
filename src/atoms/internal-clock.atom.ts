import { atom } from "recoil";
import { InternalClock } from "../types";

export const InternalClockState = atom<InternalClock>({
  key: "InternalClockState",
  default: {
    hour: 0,
    minute: 0,
  },
});

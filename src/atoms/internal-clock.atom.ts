import { atom } from "recoil";
import { InternalClock } from "../types";

export const InternalClockState = atom<InternalClock>({
  key: "InternalClockState",
  default: {
    day: 0o0,
    hour: 0o0,
    minute: 0o0,
  },
});

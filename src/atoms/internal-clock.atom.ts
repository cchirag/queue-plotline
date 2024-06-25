import { atom } from "recoil";
import { InternalClock } from "../types";

interface InternalClockState extends InternalClock {
  paused: boolean;
}

export const InternalClockState = atom<InternalClockState>({
  key: "InternalClockState",
  default: {
    day: 0o0,
    hour: 0o0,
    minute: 0o0,
    paused: false,
  },
});

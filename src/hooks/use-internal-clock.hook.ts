import { useRecoilValue } from "recoil";
import { InternalClockState } from "../atoms";

export const useInternalClock = () => {
  const internalClock = useRecoilValue(InternalClockState);

  return internalClock;
};

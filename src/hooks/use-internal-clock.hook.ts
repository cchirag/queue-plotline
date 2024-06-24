import { useRecoilState } from "recoil";
import { InternalClockState } from "../atoms";

export const useInternalClock = () => {
  const [clock, setClock] = useRecoilState(InternalClockState);
  const setTime = (day: number, hour: number, minute: number) => {
    setClock({
      day,
      hour,
      minute,
    });
  };
  const reset = () => {
    setClock({
      day: 0,
      hour: 0,
      minute: 0,
    });
  };
  return { clock, reset, setTime };
};

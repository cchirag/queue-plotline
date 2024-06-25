import { useRecoilState } from "recoil";
import { InternalClockState } from "../atoms";

export const useInternalClock = () => {
  const [clock, setClock] = useRecoilState(InternalClockState);

  const pause = () => {
    setClock((prev) => ({ ...prev, paused: true }));
  };

  const resume = () => {
    setClock((prev) => ({ ...prev, paused: false }));
  };

  const setTime = (day: number, hour: number, minute: number) => {
    setClock({
      day,
      hour,
      minute,
      paused: false,
    });
  };
  const reset = () => {
    setClock({
      day: 0,
      hour: 0,
      minute: 0,
      paused: false,
    });
  };
  return { clock, reset, setTime, pause, resume };
};

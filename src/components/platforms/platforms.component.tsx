import { useRecoilState, useRecoilValue } from "recoil";
import classes from "./platforms.module.css";
import { SettingsState, StagedScheduleState } from "../../atoms";
import { Platform } from "../platform/platform.component";
import { TrainStatus } from "../../enums";

export const Platforms = () => {
  const platforms = useRecoilValue(SettingsState).platforms;
  const [stagedSchedule, setStagedSchedule] =
    useRecoilState(StagedScheduleState);
  const handleTrainStatus = (trainNumber: string, status: TrainStatus) => {
    setStagedSchedule({
      ...stagedSchedule,
      trains: stagedSchedule.trains.map((t) =>
        t.trainNumber === trainNumber ? { ...t, status } : t
      ),
    });
  };

  return (
    <div className={classes.platformsContainer}>
      {platforms.map((platform) => (
        <Platform
          key={platform}
          platformNumber={platform}
          handleTrainStatus={handleTrainStatus}
        />
      ))}
    </div>
  );
};

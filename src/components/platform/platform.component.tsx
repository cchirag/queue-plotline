import classes from "./platform.module.css";
import railwayTrack from "../../assets/railway-track.svg";

import { useMemo, useRef } from "react";
import { TrainStatus } from "../../enums";
import { StagedScheduleState } from "../../atoms";
import { useRecoilValue } from "recoil";
import { Train } from "..";
interface PlatformProps {
  platformNumber: number;
  handleTrainStatus: (trainNumber: string, status: TrainStatus) => void;
}
export const Platform = (props: PlatformProps) => {
  const { platformNumber, handleTrainStatus } = props;

  const stagedSchedule = useRecoilValue(StagedScheduleState);

  const trackRef = useRef<HTMLImageElement>(null);
  const currentTrains = useMemo(() => {
    const trains = stagedSchedule.trains.filter(
      (train) =>
        train.platform === platformNumber &&
        train.status !== TrainStatus.DEPARTED
    );
    return trains;
  }, [platformNumber, stagedSchedule]);


  return (
    <div className={classes.platformContainer}>
      <div className={classes.platformInformationContainer}>
        <h3>Platform {platformNumber}</h3>
      </div>
      <img
        src={railwayTrack}
        alt="platform"
        className={classes.track}
        ref={trackRef}
      />
      {currentTrains.map((train) => (
        <Train
          key={train.trainNumber}
          trackRef={trackRef}
          handleTrainStatus={handleTrainStatus}
          train={train}
        />
      ))}
    </div>
  );
};

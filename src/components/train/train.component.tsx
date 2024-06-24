import classes from "./train.module.css";
import trainImage from "../../assets/train.svg";
import { useEffect, useRef } from "react";
import { InternalClockUtils } from "../../utils";
import { useInternalClock } from "../../hooks";
import { TrainStatus } from "../../enums";
import { Train as TrainType } from "../../types";
interface TrainProps {
  train: TrainType;
  trackRef: React.RefObject<HTMLImageElement>;
  handleTrainStatus: (trainNumber: string, status: TrainStatus) => void;
}

export const Train = (props: TrainProps) => {
  const { trackRef, train, handleTrainStatus } = props;
  const trainRef = useRef<HTMLImageElement>(null);
  const { clock } = useInternalClock();
  const moveTrain = (position: number, time: number) => {
    if (trainRef.current) {
      trainRef.current.style.transition = `transform ${time}s linear`;
      trainRef.current.style.transform = `translateX(${position}px)`;
    }
  };

  const handleScheduledTrain = () => {
    if (InternalClockUtils.isEqual(clock, train.timelines.startArrival!)) {
      handleTrainStatus(train?.trainNumber ?? "", TrainStatus.ARRIVING);
    }
  };

  const handleArrivingTrain = () => {
    if (trainRef.current && trackRef.current) {
      const trackWidth = trackRef.current.offsetWidth;
      const trainWidth = trainRef.current.offsetWidth;
      const trainPosition = trackWidth / 2 - trainWidth / 2;
      moveTrain(trainPosition, 10);
    }
    if (InternalClockUtils.isEqual(clock, train?.actualArrivalTime!)) {
      handleTrainStatus(train?.trainNumber ?? "", TrainStatus.ARRIVED);
    }
  };

  const handleArrivedTrain = () => {
    if (InternalClockUtils.isEqual(clock, train?.actualDepartureTime!)) {
      if (trainRef.current && trackRef.current) {
        const trackWidth = trackRef.current.offsetWidth;
        const trainWidth = trainRef.current.offsetWidth;
        const trainPosition = trackWidth + trainWidth;
        moveTrain(trainPosition, 10);
      }
      console.log(`Train ${train?.trainNumber} departing`);
      handleTrainStatus(train?.trainNumber ?? "", TrainStatus.DEPARTED);
    }
  };

  useEffect(() => {
    switch (train.status) {
      case TrainStatus.SCHEDULED:
        handleScheduledTrain();
        break;
      case TrainStatus.ARRIVING:
        handleArrivingTrain();
        break;
      case TrainStatus.ARRIVED:
        handleArrivedTrain();
        break;
    }
  }, [train, clock]);
  return (
    <img
      src={trainImage}
      alt="train"
      className={classes.train}
      ref={trainRef}
    />
  );
};

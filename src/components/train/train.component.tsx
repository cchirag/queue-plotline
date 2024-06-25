import classes from "./train.module.css";
import { useEffect, useMemo, useRef } from "react";
import { InternalClockUtils } from "../../utils";
import { useInternalClock, useTrainImage } from "../../hooks";
import { TrainStatus } from "../../enums";
import { Train as TrainType } from "../../types";
import { useSpring, animated } from "@react-spring/web";
interface TrainProps {
  train: TrainType;
  trackRef: React.RefObject<HTMLImageElement>;
  handleTrainStatus: (trainNumber: string, status: TrainStatus) => void;
}

export const Train = (props: TrainProps) => {
  const { trackRef, train, handleTrainStatus } = props;
  const trainRef = useRef<HTMLImageElement>(null);
  const { clock } = useInternalClock();
  const trainImage = useTrainImage(train.trainImage);

  const fromTransform = useMemo(() => {
    if (trainRef.current && trackRef.current) {
      const trackWidth = trackRef.current.offsetWidth;
      const trainWidth = trainRef.current.offsetWidth;
      switch (train.status) {
        case TrainStatus.SCHEDULED:
          return `translateX(-${trainWidth}px)`;
        case TrainStatus.ARRIVING:
          return `translateX(-${trainWidth}px)`;
        case TrainStatus.ARRIVED:
          return `translateX(${trackWidth / 2 + trainWidth / 2}px)`;
        case TrainStatus.DEPARTING:
          return `translateX(${trackWidth * 2}px)`;
      }
    }
  }, [trackRef, trainRef, train.status]);

  const toTransform = useMemo(() => {
    if (trainRef.current && trackRef.current) {
      const trackWidth = trackRef.current.offsetWidth;
      const trainWidth = trainRef.current.offsetWidth;
      switch (train.status) {
        case TrainStatus.SCHEDULED:
          return `translateX(-${trainWidth}px)`;
        case TrainStatus.ARRIVING:
          return `translateX(${trackWidth / 2 + trainWidth / 2}px)`;
        case TrainStatus.ARRIVED:
          return `translateX(${trackWidth / 2 + trainWidth / 2}px)`;
        case TrainStatus.DEPARTING:
          return `translateX(${trackWidth * 2}px)`;
      }
    }
  }, [trackRef, trainRef, train.status]);

  const { transform: transformX } = useSpring({
    pause: clock.paused,
    from: {
      transform: fromTransform,
    },
    to: {
      transform: toTransform,
    },
    config: {
      duration: 10000,
    },
  });

  const handleScheduledTrain = () => {
    if (InternalClockUtils.isEqual(train.timelines.startArrival!, clock)) {
      handleTrainStatus(train?.trainNumber ?? "", TrainStatus.ARRIVING);
    }
  };

  const handleArrivingTrain = () => {
    if (InternalClockUtils.isBefore(train.timelines.endArrival!, clock)) {
      handleTrainStatus(train?.trainNumber ?? "", TrainStatus.ARRIVED);
    }
  };

  const handleArrivedTrain = () => {
    if (InternalClockUtils.isBefore(train.timelines.startDeparture!, clock)) {
      handleTrainStatus(train?.trainNumber ?? "", TrainStatus.DEPARTING);
    }
  };

  const handleDepartingTrain = () => {
    if (InternalClockUtils.isBefore(train.timelines.endDeparture!, clock)) {
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
      case TrainStatus.DEPARTING:
        handleDepartingTrain();
        break;
    }
  }, [train, clock]);

  return train.status !== TrainStatus.DEPARTED ? (
    <animated.img
      src={trainImage}
      alt="train"
      className={classes.train}
      ref={trainRef}
      style={{
        transform: transformX,
      }}
    />
  ) : null;
};

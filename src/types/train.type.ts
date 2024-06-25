import { Priority, TrainImage, TrainStatus } from "../enums";
import { InternalClock } from "./internal-clock.type";

export type Train = {
  trainNumber: string;
  arrivalTime: InternalClock;
  departureTime: InternalClock;
  actualArrivalTime?: InternalClock;
  actualDepartureTime?: InternalClock;
  haltTime?: number;
  priority: Priority;
  platform: number;
  status: TrainStatus;
  timelines: {
    startArrival?: InternalClock;
    endDeparture?: InternalClock;
  };
  trainImage: TrainImage;
};

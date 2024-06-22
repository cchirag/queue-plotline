import { Priority } from "../enums";

export type TrainSchedule = {
  trainNumber: number;
  arrivalTime: string;
  departureTime: string;
  priority: Priority;
};

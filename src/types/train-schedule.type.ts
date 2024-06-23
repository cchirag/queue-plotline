import { Priority } from "../enums";

export type TrainSchedule = {
  trainNumber: string;
  arrivalTime: string;
  departureTime: string;
  priority: Priority;
};

import { FileContent } from "use-file-picker/types";
import { TrainSchedule as Schedule } from "../../types";
import { Priority } from "../../enums";

export class TrainSchedule {
  schedule: Schedule[] = [];

  static isValid(data: FileContent<string>): Promise<Schedule[]> {
    const trainData = JSON.parse(data.content) as Schedule[];
    return new Promise((resolve, reject) => {
      if (!Array.isArray(trainData)) {
        reject("Data is not an array");
      }
      if (trainData.length === 0) {
        reject("Data is empty");
      }
      if (
        !trainData.every((schedule) => {
          return (
            typeof schedule.trainNumber === "number" &&
            typeof schedule.arrivalTime === "string" &&
            typeof schedule.departureTime === "string" &&
            Priority[schedule.priority] === schedule.priority
          );
        })
      ) {
        reject("Data is not in the correct format");
      }
      resolve(trainData);
    });
  }
}

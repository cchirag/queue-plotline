import { FileContent } from "use-file-picker/types";
import { TrainSchedule as Schedule } from "../../types";
import { Priority } from "../../enums";
import csvtojson from "csvtojson";
export class TrainSchedule {
  schedule: Schedule[] = [];

  static isValid(data: FileContent<string>): Promise<Schedule[]> {
    return new Promise((resolve, reject) => {
      csvtojson()
        .fromString(data.content)
        .then((json: Schedule[]) => {
          if (!Array.isArray(json)) {
            reject("Data is not an array");
          }
          if (json.length === 0) {
            reject("Data is empty");
          }
          if (
            !json.every((schedule) => {
              return (
                typeof schedule.trainNumber === "string" &&
                typeof schedule.arrivalTime === "string" &&
                typeof schedule.departureTime === "string" &&
                Priority[schedule.priority] === schedule.priority
              );
            })
          ) {
            reject("Data is not in the correct format");
          }
          resolve(json);
        });
    });
  }
}

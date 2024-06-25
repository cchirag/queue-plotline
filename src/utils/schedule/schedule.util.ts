import { FileContent } from "use-file-picker/types";
import { Priority, TrainImage, TrainStatus } from "../../enums";
import csvtojson from "csvtojson";
import { InternalClock, Train } from "../../types";
import { InternalClockUtils } from "../internal-clock/internal-clock.util";
export class ScheduleUtils {
  static isValid(data: FileContent<string>): Promise<Train[]> {
    return new Promise((resolve, reject) => {
      csvtojson()
        .fromString(data.content)
        .then((json) => {
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
                Priority[schedule.priority as keyof typeof Priority] ===
                  schedule.priority
              );
            })
          ) {
            reject("Data is not in the correct format");
          }
          const newJson = json.map((schedule) => {
            return {
              ...schedule,
              arrivalTime: InternalClockUtils.formatTime(
                `00:${schedule.arrivalTime}`
              ),
              departureTime: InternalClockUtils.formatTime(
                `00:${schedule.departureTime}`
              ),
            };
          });
          resolve(newJson);
        });
    });
  }

  static getStagedSchedule(trains: Train[], platforms: number[]): Train[] {
    // Sort trains by arrival time, priority, and original order
    trains.sort((a, b) => {
      if (a.arrivalTime.day !== b.arrivalTime.day) {
        return a.arrivalTime.day - b.arrivalTime.day;
      }
      if (a.arrivalTime.hour !== b.arrivalTime.hour) {
        return a.arrivalTime.hour - b.arrivalTime.hour;
      }
      if (a.arrivalTime.minute !== b.arrivalTime.minute) {
        return a.arrivalTime.minute - b.arrivalTime.minute;
      }
      if (a.priority !== b.priority) {
        return a.priority.localeCompare(b.priority);
      }
      return 0; // Keep original order if arrival time and priority are the same
    });

    const platformAvailability: { [key: number]: InternalClock } = {};

    trains.forEach((train) => {
      const { actualArrival, actualDeparture, assignedPlatform } =
        this.assignPlatform(train, platforms, platformAvailability);

      // Update platform availability
      platformAvailability[assignedPlatform] = actualDeparture;

      // Update train details
      train.actualArrivalTime = actualArrival;
      train.actualDepartureTime = actualDeparture;
      train.haltTime = InternalClockUtils.getMinutesDiff(
        actualArrival,
        actualDeparture
      );
      train.platform = assignedPlatform;
      train.status = TrainStatus.SCHEDULED;
      const randomIndex = Math.floor(Math.random() * 5);
      train.trainImage = Object.values(TrainImage)[randomIndex];
      train.timelines = {
        startArrival: InternalClockUtils.subtractMinutes(actualArrival, 10),
        endDeparture: InternalClockUtils.addMinutes(actualDeparture, 10),
      };
    });

    // Sort trains by actualArrivalTime
    trains.sort((a, b) => {
      if (a.actualArrivalTime!.day !== b.actualArrivalTime!.day) {
        return a.actualArrivalTime!.day - b.actualArrivalTime!.day;
      }
      if (a.actualArrivalTime!.hour !== b.actualArrivalTime!.hour) {
        return a.actualArrivalTime!.hour - b.actualArrivalTime!.hour;
      }
      return a.actualArrivalTime!.minute - b.actualArrivalTime!.minute;
    });

    return trains;
  }

  private static assignPlatform(
    train: Train,
    platforms: number[],
    platformAvailability: { [key: number]: InternalClock }
  ): {
    actualArrival: InternalClock;
    actualDeparture: InternalClock;
    assignedPlatform: number;
  } {
    let assignedPlatform: number | null = null;
    let actualArrival = train.arrivalTime;
    let actualDeparture = train.departureTime;

    for (const platform of platforms) {
      if (
        !platformAvailability[platform] ||
        this.isTimeBeforeOrEqual(platformAvailability[platform], actualArrival)
      ) {
        assignedPlatform = platform;
        break;
      }
    }

    if (assignedPlatform === null) {
      const [earliestFreePlatform, earliestFreeTime] = Object.entries(
        platformAvailability
      ).sort((a, b) => this.compareInternalClocks(a[1], b[1]))[0];
      assignedPlatform = parseInt(earliestFreePlatform);
      actualArrival = InternalClockUtils.addMinutes(earliestFreeTime, 10);
      actualDeparture = InternalClockUtils.addMinutes(
        actualArrival,
        InternalClockUtils.getMinutesDiff(
          train.arrivalTime,
          train.departureTime
        )
      );
    }

    return { actualArrival, actualDeparture, assignedPlatform };
  }

  private static isTimeBeforeOrEqual(
    time1: InternalClock,
    time2: InternalClock
  ): boolean {
    if (time1.day < time2.day) return true;
    if (time1.day > time2.day) return false;
    if (time1.hour < time2.hour) return true;
    if (time1.hour > time2.hour) return false;
    return time1.minute <= time2.minute;
  }

  private static compareInternalClocks(
    time1: InternalClock,
    time2: InternalClock
  ): number {
    if (time1.day !== time2.day) return time1.day - time2.day;
    if (time1.hour !== time2.hour) return time1.hour - time2.hour;
    return time1.minute - time2.minute;
  }
}

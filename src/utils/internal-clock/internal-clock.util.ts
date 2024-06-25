import { InternalClock } from "../../types";

export class InternalClockUtils {
  // The initial input is in the format of HH:MM
  // We first format it to an InternalClock object

  static formatTime = (time: string): InternalClock => {
    return time.split(":").reduce(
      (acc, curr, index) => {
        if (index === 0) {
          acc.day = parseInt(curr);
        }
        if (index === 1) {
          acc.hour = parseInt(curr);
        }
        if (index === 2) {
          acc.minute = parseInt(curr);
        }
        return acc;
      },
      { day: 0, hour: 0, minute: 0 }
    );
  };

  static getTimeString = (time: InternalClock): string => {
    const { day, hour, minute } = time;
    const dayString = day.toString().padStart(2, "0");
    const hourString = hour.toString().padStart(2, "0");
    const minuteString = minute.toString().padStart(2, "0");
    return `${dayString}:${hourString}:${minuteString}`;
  };

  static getTimeFromTimeString = (time: string): InternalClock => {
    const [day, hour, minute] = time.split(":").map((time) => parseInt(time));
    return { day, hour, minute };
  };

  static getDifference = (time1: InternalClock, time2: InternalClock) => {
    const { day: day1, hour: hour1, minute: minute1 } = time1;
    const { day: day2, hour: hour2, minute: minute2 } = time2;

    const totalMinutes1 = day1 * 24 * 60 + hour1 * 60 + minute1;
    const totalMinutes2 = day2 * 24 * 60 + hour2 * 60 + minute2;
    return totalMinutes2 - totalMinutes1;
  };

  static isEqual = (time1: InternalClock, time2: InternalClock) => {
    const { day: day1, hour: hour1, minute: minute1 } = time1;
    const { day: day2, hour: hour2, minute: minute2 } = time2;

    return day1 === day2 && hour1 === hour2 && minute1 === minute2;
  };

  static isBefore = (time1: InternalClock, time2: InternalClock) => {
    const { day: day1, hour: hour1, minute: minute1 } = time1;
    const { day: day2, hour: hour2, minute: minute2 } = time2;

    if (day1 < day2) {
      return true;
    } else if (day1 === day2) {
      if (hour1 < hour2) {
        return true;
      } else if (hour1 === hour2) {
        return minute1 < minute2;
      }
    }
    return false;
  };

  static isAfter = (time1: InternalClock, time2: InternalClock) => {
    const { day: day1, hour: hour1, minute: minute1 } = time1;
    const { day: day2, hour: hour2, minute: minute2 } = time2;

    if (day1 > day2) {
      return true;
    } else if (day1 === day2) {
      if (hour1 > hour2) {
        return true;
      } else if (hour1 === hour2) {
        return minute1 > minute2;
      }
    }
    return false;
  }
  

  static getMinutesDiff(
    startTime: InternalClock,
    endTime: InternalClock
  ): number {
    const startMinutes =
      startTime.day * 1440 + startTime.hour * 60 + startTime.minute; // 1440 = 24 * 60
    const endMinutes = endTime.day * 1440 + endTime.hour * 60 + endTime.minute;
    return endMinutes - startMinutes;
  }

  static addMinutes(time: InternalClock, minutes: number): InternalClock {
    const newTime = { ...time };
    newTime.minute += minutes;

    while (newTime.minute >= 60) {
      newTime.minute -= 60;
      newTime.hour += 1;
    }

    while (newTime.hour >= 24) {
      newTime.hour -= 24;
      newTime.day += 1;
    }

    return newTime;
  }

  static subtractMinutes(time: InternalClock, minutes: number): InternalClock {
    const newTime = { ...time };
    newTime.minute -= minutes;

    while (newTime.minute < 0) {
      newTime.minute += 60;
      newTime.hour -= 1;
    }

    while (newTime.hour < 0) {
      newTime.hour += 24;
      newTime.day -= 1;
    }

    return newTime;
  }
}

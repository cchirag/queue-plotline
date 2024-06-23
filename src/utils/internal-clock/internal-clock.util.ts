



export class InternalClockUtils{
    static getDifference = (time1: string, time2: string) => {
        const [hour1, minute1] = time1.split(":").map(Number);
        const [hour2, minute2] = time2.split(":").map(Number);
      
        const totalMinutes1 = hour1 * 60 + minute1;
        const totalMinutes2 = hour2 * 60 + minute2;
      
        return totalMinutes2 - totalMinutes1;
    };
}



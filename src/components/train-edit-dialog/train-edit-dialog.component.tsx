import { Box, Modal } from "@mui/material";
import { InternalClock, Train } from "../../types";
import classes from "./train-edit-dialog.module.css";
import { useEffect, useMemo, useState } from "react";
import { useInternalClock } from "../../hooks";
import { LocalizationProvider, StaticTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InternalClockUtils } from "../../utils";
import { Dayjs } from "dayjs";
import dayJS from "dayjs";

interface TrainEditDialogProps {
  open: boolean;
  onClose: () => void;
  train?: Train;
  handleTimeChange: (trainNumber: string, time: InternalClock) => void;
}
export const TrainEditDialog = (props: TrainEditDialogProps) => {
  const [time, setTime] = useState<Dayjs | null>(null);
  const { open, onClose, train, handleTimeChange } = props;
  const { pause, resume, clock } = useInternalClock();

  const minimumTime = useMemo(() => {
    const dayjs = dayJS();
    const minTime = InternalClockUtils.addMinutes(clock, 5);
    return dayjs
      .set("hour", minTime.hour)
      .set("minute", minTime.minute)
      .set("second", 0)
      .set("millisecond", 0);
  }, [clock]);

  useEffect(() => {
    if (train) {
      pause();
      const arrivalTime = train.actualArrivalTime || train.arrivalTime;
      const dayjs = dayJS();
      setTime(
        dayjs
          .set("hour", arrivalTime.hour)
          .set("minute", arrivalTime.minute)
          .set("second", 0)
          .set("millisecond", 0)
      );
    }
    return () => {
      resume();
      setTime(null);
    };
  }, [train]);
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
      }}
    >
      <Box className={classes.modalBox}>
        <h2>Edit Train Arrival Time</h2>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticTimePicker
            value={time}
            onChange={(value) => {
              setTime(value);
            }}
            ampm={false}
            minTime={minimumTime}
            onAccept={(value) => {
              handleTimeChange(train!.trainNumber, {
                day: 0,
                hour: value!.hour(),
                minute: value!.minute(),
              });
            }}
          />
        </LocalizationProvider>
      </Box>
    </Modal>
  );
};

import { useRecoilValue } from "recoil";
import classes from "./schedule-chart.module.css";
import { StagedScheduleState } from "../../atoms";
import { Tooltip } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { TrainStatus } from "../../enums";
import { InternalClockUtils } from "../../utils";

export const ScheduleChart = () => {
  const chart = useRecoilValue(StagedScheduleState);

  return (
    <div className={classes.container}>
      {chart.trains.map((train) => (
        <div className={classes.scheduleCard} key={train.trainNumber}>
          <h4
            style={{
              color: train.status === TrainStatus.SCHEDULED ? "red" : "black",
            }}
          >
            {train.trainNumber} | P{train.platform} |{" "}
            {InternalClockUtils.getTimeString(train.actualArrivalTime!)}
          </h4>
          <Tooltip title="Train" className={classes.infoIcon}>
            <InfoOutlined />
          </Tooltip>
        </div>
      ))}
    </div>
  );
};

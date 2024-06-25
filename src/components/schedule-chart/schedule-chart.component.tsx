import { useRecoilValue } from "recoil";
import classes from "./schedule-chart.module.css";
import { StagedScheduleState } from "../../atoms";
import { IconButton } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { TrainStatus } from "../../enums";
import { InternalClockUtils } from "../../utils";
import { Train } from "../../types";
import { useState } from "react";
import { TrainInfoDialog } from "../train-info-dialog/train-info-dialog.component";

export const ScheduleChart = () => {
  const chart = useRecoilValue(StagedScheduleState);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const handleSelectTrain = (train: Train) => {
    setSelectedTrain(train);
  };

  const handleCloseModal = () => {
    setSelectedTrain(null);
  };
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
          <IconButton onClick={() => handleSelectTrain(train)}>
            <InfoOutlined />
          </IconButton>
        </div>
      ))}
      <TrainInfoDialog
        open={selectedTrain !== null}
        train={selectedTrain!}
        onClose={handleCloseModal}
      />
    </div>
  );
};

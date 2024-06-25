import { useRecoilState, useRecoilValue } from "recoil";
import classes from "./schedule-chart.module.css";
import { SettingsState, StagedScheduleState } from "../../atoms";
import { IconButton } from "@mui/material";
import { EditOutlined, InfoOutlined } from "@mui/icons-material";
import { TrainStatus } from "../../enums";
import { InternalClockUtils, ScheduleUtils } from "../../utils";
import { InternalClock, Train } from "../../types";
import { useState } from "react";
import { TrainInfoDialog } from "../train-info-dialog/train-info-dialog.component";
import { TrainEditDialog } from "../train-edit-dialog/train-edit-dialog.component";

export const ScheduleChart = () => {
  const settings = useRecoilValue(SettingsState);
  const [chart, setChart] = useRecoilState(StagedScheduleState);
  const [selectedTrainForEdit, setSelectedTrainForEdit] =
    useState<Train | null>(null);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);

  const editIsDisabled = (train: Train) => {
    return train.status !== TrainStatus.SCHEDULED;
  };

  const handleSelectTrain = (train: Train) => {
    setSelectedTrain(train);
  };

  const handleCloseModal = () => {
    setSelectedTrain(null);
  };

  const handleEditTrain = (train: Train) => {
    setSelectedTrainForEdit(train);
  };

  const handleCloseEditModal = () => {
    setSelectedTrainForEdit(null);
  };

  const handleTimeChange = (trainNumber: string, time: InternalClock) => {
    const stagedTrains = ScheduleUtils.updateTrainTime(
      chart.trains,
      trainNumber,
      time,
      settings.platforms
    );
    setSelectedTrainForEdit(null);
    setChart({
      trains: stagedTrains,
    });
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
          <div className={classes.actionsContainer}>
            <IconButton onClick={() => handleSelectTrain(train)}>
              <InfoOutlined />
            </IconButton>
            <IconButton
              onClick={() => handleEditTrain(train)}
              disabled={editIsDisabled(train)}
            >
              <EditOutlined />
            </IconButton>
          </div>
        </div>
      ))}
      <TrainInfoDialog
        open={selectedTrain !== null}
        train={selectedTrain!}
        onClose={handleCloseModal}
      />
      <TrainEditDialog
        open={selectedTrainForEdit !== null}
        train={selectedTrainForEdit!}
        onClose={handleCloseEditModal}
        handleTimeChange={handleTimeChange}
      />
    </div>
  );
};

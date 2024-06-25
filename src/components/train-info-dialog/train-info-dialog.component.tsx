import { Box, Modal } from "@mui/material";
import { Train } from "../../types";
import classes from "./train-info-dialog.module.css";
import { InternalClockUtils } from "../../utils";
import { useTrainImage } from "../../hooks";
interface TrainInfoDialogProps {
  open: boolean;
  train?: Train;
  onClose: () => void;
}

export const TrainInfoDialog = (props: TrainInfoDialogProps) => {
  const { open, train, onClose } = props;

  const trainImage = useTrainImage(train?.trainImage!);
  if (!train) return null;
  return (
    <Modal open={open} onClose={onClose}>
      <Box className={classes.modalBox}>
        <div className={classes.imageContainer}>
          <img src={trainImage} alt="Train" className={classes.trainImage} />
        </div>
        <div className={classes.detailsContainer}>
          <h2>Train {train.trainNumber}</h2>
          <h4>Platform {train.platform}</h4>
          <h4>
            Scheduled Arrival Time:{" "}
            {InternalClockUtils.getTimeString(train.arrivalTime)}
          </h4>
          <h4>
            Arrival Time:{" "}
            {InternalClockUtils.getTimeString(train.actualArrivalTime!)}
          </h4>
          <h4>
            Scheduled Departure Time:{" "}
            {InternalClockUtils.getTimeString(train.departureTime)}
          </h4>
          <h4>
            Departure Time:{" "}
            {InternalClockUtils.getTimeString(train.actualDepartureTime!)}
          </h4>
        </div>
      </Box>
    </Modal>
  );
};

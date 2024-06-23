import classes from "./Home.module.css";
import animationData from "../../assets/train_animation.json";
import LottieReact from "lottie-react";
import { Button, Slider } from "@mui/material";
import { useFilePicker } from "use-file-picker";
import { useState } from "react";
import { TrainSchedule } from "../../utils";
import { useSnackbar } from "../../components";
import { SnackbarSeverity } from "../../enums";
import { Fade } from "react-awesome-reveal";
import { useSetRecoilState } from "recoil";
import { InitialScheduleState } from "../../atoms";

export const HomePage = () => {
  const [numberOfPlatforms, setNumberOfPlatforms] = useState(2);
  const setInitialScheduleState = useSetRecoilState(InitialScheduleState);
  const { openFilePicker, filesContent } = useFilePicker({
    multiple: false,
    accept: ".csv",
    onFilesSuccessfullySelected: () => {},
  });
  const setMessage = useSnackbar();

  const handleStartSimulation = async () => {
    await TrainSchedule.isValid(filesContent[0])
      .then((data) => {
        setInitialScheduleState({
          schedule: data,
          platforms: numberOfPlatforms,
        });
      })
      .catch((error) => {
        setMessage(error, SnackbarSeverity.ERROR);
      });
  };
  return (
    <div className={classes.pageContainer}>
      <div className={classes.leftSide}>
        <div className={classes.introContainer}>
          <Fade cascade damping={0.2}>
            <h1 className={classes.title}>QUEUE</h1>
            <p className={classes.subtitle}>
              A Train <br />
              <span>Platform</span>
              <br />
              Simulation App
            </p>
          </Fade>
        </div>
        <LottieReact
          animationData={animationData}
          loop
          autoplay
          className={classes.animation}
        />
      </div>
      <div className={classes.rightSide}>
        <div className={classes.card}>
          <h3 className={classes.cardHeader}>Initial Setup</h3>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            fullWidth
            onClick={openFilePicker}
          >
            {filesContent.length > 0
              ? "Train Schedule Uploaded"
              : "Upload Train Schedule"}
          </Button>
          <div className={classes.sliderContainer}>
            <label>{numberOfPlatforms} Platforms</label>
            <Slider
              defaultValue={2}
              step={1}
              min={2}
              max={20}
              value={numberOfPlatforms}
              onChange={(_, value) => setNumberOfPlatforms(value as number)}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleStartSimulation}
            disabled={filesContent.length === 0}
          >
            Start Simulation
          </Button>
        </div>
      </div>
    </div>
  );
};

import classes from "./Home.module.css";
import animationData from "../../assets/train_animation.json";
import LottieReact from "lottie-react";
import { Button, Slider } from "@mui/material";
import { useFilePicker } from "use-file-picker";
import { useState } from "react";
import { useSnackbar } from "../../components";
import { SnackbarSeverity } from "../../enums";
import { Fade } from "react-awesome-reveal";
import { useSetRecoilState } from "recoil";
import { SettingsState, StagedScheduleState } from "../../atoms";
import { InternalClockUtils, ScheduleUtils } from "../../utils";
import { useInternalClock } from "../../hooks";

export const HomePage = () => {
  const [numberOfPlatforms, setNumberOfPlatforms] = useState(2);
  const setSettings = useSetRecoilState(SettingsState);
  const setStagedSchedule = useSetRecoilState(StagedScheduleState);
  const { openFilePicker, filesContent } = useFilePicker({
    multiple: false,
    accept: ".csv",
    onFilesSuccessfullySelected: () => {},
  });
  const setMessage = useSnackbar();
  const { setTime } = useInternalClock();

  const handleStartSimulation = async () => {
    await ScheduleUtils.isValid(filesContent[0])
      .then((trains) => {
        const platforms: number[] = Array.from({
          length: numberOfPlatforms,
        }).map((_, index) => {
          return index + 1;
        });
        const stagedSchedule = ScheduleUtils.getStagedSchedule(
          trains,
          platforms
        );
        setStagedSchedule({ trains: stagedSchedule });
        setSettings({
          platforms,
          trains,
        });
        const firstTrain = stagedSchedule[0];
        const time = firstTrain.arrivalTime;
        const timeToStart = InternalClockUtils.subtractMinutes(time, 10);
        setTime(timeToStart.day, timeToStart.hour, timeToStart.minute);
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
              defaultValue={1}
              step={1}
              min={1}
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

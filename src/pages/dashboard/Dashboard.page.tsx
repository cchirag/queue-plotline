import { Button } from "@mui/material";
import classes from "./Dashboard.module.css";
import logo from "../../assets/logo.png";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useInternalClock } from "../../hooks";
import { useMemo } from "react";
import { Platforms, ScheduleChart } from "../../components";
import { SettingsState, StagedScheduleState } from "../../atoms";
import { InternalClockUtils } from "../../utils";
import { CSVLink } from "react-csv";
import { TrainStatus } from "../../enums";
export const DashboardPage = () => {
  const stagedSchedule = useRecoilValue(StagedScheduleState);
  const setSettings = useSetRecoilState(SettingsState);
  const { clock } = useInternalClock();
  const applicationTime = useMemo(() => {
    return InternalClockUtils.getTimeString(clock);
  }, [clock]);

  const headers = [
    { label: "Train Number", key: "trainNumber" },
    { label: "Platform", key: "platform" },
    { label: "Priority", key: "priority" },
    { label: "Scheduled Arrival Time", key: "arrivalTime" },
    { label: "Actual Arrival Time", key: "actualArrivalTime" },
    { label: "Scheduled Departure Time", key: "departureTime" },
    { label: "Actual Departure Time", key: "actualDepartureTime" },
  ];

  const exportData = useMemo(() => {
    const trains = stagedSchedule.trains.filter(
      (train) => train.status === TrainStatus.DEPARTED
    );
    return trains.map((train) => {
      return {
        trainNumber: train.trainNumber,
        platform: train.platform,
        priority: train.priority,
        arrivalTime: InternalClockUtils.getTimeString(train.arrivalTime),
        actualArrivalTime: InternalClockUtils.getTimeString(
          train.actualArrivalTime!
        ),
        departureTime: InternalClockUtils.getTimeString(train.departureTime),
        actualDepartureTime: InternalClockUtils.getTimeString(
          train.actualDepartureTime!
        ),
      };
    });
  }, [stagedSchedule]);

  const exportFileName = `report-${applicationTime}.csv`;

  return (
    <div className={classes.container}>
      <div className={classes.navbarContainer}>
        <div className={classes.logoContainer}>
          <img src={logo} alt="logo" />
        </div>
        <div className={classes.scheduleChartContainer}>
          <ScheduleChart />
        </div>
        <div className={classes.actionsContainer}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => {
              setSettings({
                platforms: [],
                trains: [],
              });
            }}
          >
            Back
          </Button>
        </div>
      </div>
      <div className={classes.contentContainer}>
        <div className={classes.headerContainer}>
          <h1>Dashboard</h1>
          <h3>{`Current Time: ${applicationTime} `}</h3>
        </div>
        <div className={classes.platformsContainer}>
          <div className={classes.platformsContainerHeader}>
            <h3>Platforms</h3>

            <CSVLink
              data={exportData}
              headers={headers}
              filename={exportFileName}
              className={classes.exportButton}
            >
              EXPORT REPORT
            </CSVLink>
          </div>
          <div className={classes.platformsContentContainer}>
            <Platforms />
          </div>
        </div>
      </div>
    </div>
  );
};

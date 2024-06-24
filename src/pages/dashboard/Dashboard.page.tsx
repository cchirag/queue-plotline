import { Button } from "@mui/material";
import classes from "./Dashboard.module.css";
import logo from "../../assets/logo.png";
import { useSetRecoilState } from "recoil";
import { useInternalClock } from "../../hooks";
import { useMemo } from "react";
import { Platforms, ScheduleChart } from "../../components";
import { SettingsState } from "../../atoms";
import { InternalClockUtils } from "../../utils";
export const DashboardPage = () => {
  const setSettings = useSetRecoilState(SettingsState);
  const { clock } = useInternalClock();
  const applicationTime = useMemo(() => {
   return InternalClockUtils.getTimeString(clock);
  }, [clock]);
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
          <Button variant="contained" color="primary" fullWidth>
            Update Schedule
          </Button>
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
            <Button variant="outlined" color="primary">
              Print Report
            </Button>
          </div>
          <div className={classes.platformsContentContainer}>
            <Platforms />
          </div>
        </div>
      </div>
    </div>
  );
};

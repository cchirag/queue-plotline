import { Route, Switch, useLocation } from "wouter";
import "./App.css";
import { DashboardPage, ErrorPage, HomePage } from "./pages";
import { useRecoilState, useRecoilValue } from "recoil";
import { SettingsState, InternalClockState } from "./atoms";
import { useEffect } from "react";
import { InternalClockUtils } from "./utils";

function App() {
  const [_, navigate] = useLocation();
  const settings = useRecoilValue(SettingsState);
  const [internalClock, setInternalClock] = useRecoilState(InternalClockState);
  useEffect(() => {
    if (settings.platforms.length > 0 && settings.trains.length > 0) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [settings]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (internalClock.paused) return;
      setInternalClock((prev) => {
        return {
          ...InternalClockUtils.addMinutes(prev, 1),
          paused: prev.paused,
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [internalClock]);

  return (
    <Switch>
      <Route path="/">
        <HomePage />
      </Route>
      <Route path="/dashboard">
        <DashboardPage />
      </Route>
      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  );
}

export default App;

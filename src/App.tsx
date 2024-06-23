import { Route, Switch, useLocation } from "wouter";
import "./App.css";
import { DashboardPage, ErrorPage, HomePage } from "./pages";
import { useRecoilState, useRecoilValue } from "recoil";
import { InitialScheduleState, InternalClockState } from "./atoms";
import { useEffect } from "react";

function App() {
  const [_, navigate] = useLocation();
  const initialSchedule = useRecoilValue(InitialScheduleState);
  const [internalClock, setInternalClock] = useRecoilState(InternalClockState);
  useEffect(() => {
    if (initialSchedule) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [initialSchedule]);

  useEffect(() => {
    const interval = setInterval(() => {
      setInternalClock((prev) => {
        const newMinute = prev.minute + 1;
        const newHour = prev.hour + Math.floor(newMinute / 60);
        return {
          hour: newHour % 24,
          minute: newMinute % 60,
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

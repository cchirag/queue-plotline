import { Route, Switch, useLocation } from "wouter";
import "./App.css";
import { DashboardPage, ErrorPage, HomePage } from "./pages";
import { useRecoilValue } from "recoil";
import { InitialScheduleState } from "./atoms";
import { useEffect } from "react";

function App() {
  const [_, navigate] = useLocation();
  const initialSchedule = useRecoilValue(InitialScheduleState);

  useEffect(() => {
    if (initialSchedule) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [initialSchedule]);
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

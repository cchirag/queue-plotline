import { Route, Switch } from "wouter";
import "./App.css";
import { DashboardPage, ErrorPage, HomePage } from "./pages";

function App() {
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

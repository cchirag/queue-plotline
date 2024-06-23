import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { ThemeProvider, createTheme } from "@mui/material";
import { Snackbar } from "./components";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#503e9d",
    },
    secondary: {
      main: "#fdcb21",
    },
    background: {
      paper: "#f8f8f8",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <App/>
        <Snackbar autoHideDuration={5000} anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }} />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);

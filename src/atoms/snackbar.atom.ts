import { atom } from "recoil";
import { SnackbarSeverity } from "../enums";

export const SnackbarState = atom<{
  open: boolean;
  message?: string;
  severity?: SnackbarSeverity;
}>({
  key: "SnackbarState",
  default: {
    open: false,
    message: "",
    severity: SnackbarSeverity.INFO,
  },
});

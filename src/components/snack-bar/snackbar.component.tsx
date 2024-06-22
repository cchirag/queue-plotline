import { useRecoilState, useSetRecoilState } from "recoil";
import { SnackbarState } from "../../atoms";
import { Alert, Snackbar as MaterialSnackbar } from "@mui/material";
import { SnackbarSeverity } from "../../enums";
export const useSnackbar = () => {
  const setSnackbarState = useSetRecoilState(SnackbarState);
  const setMessage = (message: string, severity: SnackbarSeverity) => {
    setSnackbarState({
      open: true,
      message,
      severity,
    });
  };

  return setMessage;
};

interface SnackbarProps {
  autoHideDuration?: number;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
}

export const Snackbar = (props: SnackbarProps) => {
  const { autoHideDuration, anchorOrigin } = props;
  const [snackbarState, setSnackbarState] = useRecoilState(SnackbarState);

  const handleClose = () => {
    setSnackbarState({
      ...snackbarState,
      open: false,
    });
  };

  return (
    <MaterialSnackbar
      open={snackbarState.open}
      onClose={handleClose}
      autoHideDuration={autoHideDuration}
        anchorOrigin={anchorOrigin}
    >
      <Alert severity={snackbarState.severity}>{snackbarState.message}</Alert>
    </MaterialSnackbar>
  );
};

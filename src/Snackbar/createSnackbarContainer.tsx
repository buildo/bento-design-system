import { Box } from "../internal";
import { container } from "./SnackbarContainer.css";
import { SnackbarProps } from "../";
import { FunctionComponent } from "react";

export function createSnackbarContainer(Snackbar: FunctionComponent<SnackbarProps>) {
  return function SnackbarContainer(props: SnackbarProps) {
    return (
      <Box className={container}>
        <Snackbar {...props} />
      </Box>
    );
  };
}

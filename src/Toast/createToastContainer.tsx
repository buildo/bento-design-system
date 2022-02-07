import { Box } from "../internal";
import { container } from "./ToastContainer.css";
import { ToastProps } from "..";
import { FunctionComponent } from "react";

export function createToastContainer(Toast: FunctionComponent<ToastProps>) {
  return function ToastContainer(props: ToastProps) {
    return (
      <Box className={container}>
        <Toast {...props} />
      </Box>
    );
  };
}

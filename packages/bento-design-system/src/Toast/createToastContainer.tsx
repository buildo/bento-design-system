import { Box, ToastProps } from "..";
import { container } from "./ToastContainer.css";
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

import { Box } from "..";
import { Toast, ToastProps } from "./Toast";
import { container } from "./ToastContainer.css";

export function ToastContainer(props: ToastProps) {
  return (
    <Box className={container}>
      <Toast {...props} />
    </Box>
  );
}

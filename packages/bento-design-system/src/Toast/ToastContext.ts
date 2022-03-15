import { createContext } from "react";
import { ToastProps } from "..";

export const ToastContext = createContext({
  showToast(_props: ToastProps): void {
    throw new Error(
      "showToast not implemented, this means you did not wrap your application in a ToastProvider"
    );
  },
});

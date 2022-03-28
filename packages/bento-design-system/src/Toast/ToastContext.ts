import { createContext } from "react";
import { ToastProps } from "..";

export const ToastContext = createContext({
  showToast(
    _props: Omit<ToastProps, "onDismiss"> & {
      dismissable?: boolean;
    }
  ): void {
    throw new Error(
      "showToast not implemented, this means you did not wrap your application in a ToastProvider"
    );
  },
});

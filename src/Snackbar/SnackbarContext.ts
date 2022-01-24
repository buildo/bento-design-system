import { createContext } from "react";
import { SnackbarProps } from "../";

export const SnackbarContext = createContext({
  showSnackbar(_props: SnackbarProps): void {
    throw new Error(
      "showSnackbar not implemented, this means you did not wrap your application in a SnackbarProvider"
    );
  },
});

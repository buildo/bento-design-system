import { useContext } from "react";
import { SnackbarContext } from "./SnackbarContext";

export function useSnackbar() {
  return useContext(SnackbarContext);
}

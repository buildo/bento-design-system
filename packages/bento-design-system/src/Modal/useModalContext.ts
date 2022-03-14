import { useContext } from "react";
import { ModalContext } from "./ModalContext";

export const useModalContext = (): boolean => {
  return useContext(ModalContext);
};

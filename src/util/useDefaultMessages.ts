import { useContext } from "react";
import { DefaultMessagesContext } from "../DefaultMessagesContext";

export function useDefaultMessages() {
  const context = useContext(DefaultMessagesContext);
  if (!context) {
    throw new Error("useDefaultMessages must be used within a DefaultMessagesProvider");
  }
  return context;
}

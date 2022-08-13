import { createContext, useContext } from "react";
import * as defaultConfigs from "./util/defaultConfigs";
import { BentoConfig } from "./BentoConfig";

export const BentoConfigContext = createContext<BentoConfig>(defaultConfigs);

export function useBentoConfig() {
  return useContext(BentoConfigContext);
}

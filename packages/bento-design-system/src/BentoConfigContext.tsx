import { createContext, useContext } from "react";
import * as defaultConfigs from "./util/defaultConfigs";
import { BentoConfig, PartialBentoConfig } from "./BentoConfig";
import merge from "ts-deepmerge";
import { Children } from "./util/Children";

const BentoConfigContext = createContext<BentoConfig>(defaultConfigs);

export function useBentoConfig() {
  return useContext(BentoConfigContext);
}

export function BentoConfigProvider({
  value: config,
  children,
}: {
  value: PartialBentoConfig;
  children: Children;
}) {
  return (
    <BentoConfigContext.Provider value={merge(defaultConfigs, config)}>
      {children}
    </BentoConfigContext.Provider>
  );
}

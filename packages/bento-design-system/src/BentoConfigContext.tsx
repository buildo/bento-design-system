import { createContext, useContext } from "react";
import * as defaultConfigs from "./util/defaultConfigs";
import type { BentoConfig, PartialBentoConfig } from "./BentoConfig";
import { deepmerge } from "deepmerge-ts";
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
  // NOTE(gabro): in case we nest config providers, each nested provider should only override the
  // partial config it was given.
  // So we retrieve the parent config via useBentoConfig(), which will default to the default config
  // in case this is the top level provider.
  const parentConfig = useBentoConfig();

  return (
    <BentoConfigContext.Provider value={deepmerge(parentConfig, config) as BentoConfig}>
      {children}
    </BentoConfigContext.Provider>
  );
}

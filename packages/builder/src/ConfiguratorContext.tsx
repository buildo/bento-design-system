import {
  BentoConfig,
  Children,
  PartialBentoConfig,
  defaultConfigs,
  vars,
} from "@buildo/bento-design-system";
import { createContext, useContext, useState } from "react";
import { deepmerge } from "deepmerge-ts";

type Primitive = string | boolean | number | null | undefined;
type PartialMapLeafNodes<Obj, LeafType> = {
  [Prop in keyof Obj]?: Obj[Prop] extends Primitive
    ? LeafType
    : Obj[Prop] extends Record<string | number, any>
    ? PartialMapLeafNodes<Obj[Prop], LeafType>
    : never;
};
type PartialTheme = PartialMapLeafNodes<typeof vars, string>;

type ConfiguratorContext = {
  value: {
    config: BentoConfig;
    theme: PartialMapLeafNodes<typeof vars, string>;
  };
  mergeConfig: (config: PartialBentoConfig) => void;
  mergeTheme: (theme: PartialTheme) => void;
};

const ConfiguratorContext = createContext<ConfiguratorContext | null>(null);

export function ConfiguratorProvider({ children }: { children: Children }) {
  const [config, setConfig] = useState<BentoConfig>(defaultConfigs);
  const [theme, setTheme] = useState<PartialTheme>({});

  const mergeConfig = (config: PartialBentoConfig) => {
    setConfig((prev) => deepmerge(prev, config) as BentoConfig);
  };

  const mergeTheme = (theme: PartialTheme) => {
    setTheme((prev) => deepmerge(prev, theme));
  };

  return (
    <ConfiguratorContext.Provider value={{ value: { config, theme }, mergeConfig, mergeTheme }}>
      {children}
    </ConfiguratorContext.Provider>
  );
}

export function useConfiguratorContext() {
  const context = useContext(ConfiguratorContext);
  if (context === null) {
    throw new Error("useConfiguratorContext must be used within a ConfiguratorProvider");
  }
  return context;
}

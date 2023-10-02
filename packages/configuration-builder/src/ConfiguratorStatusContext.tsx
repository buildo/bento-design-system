import { createContext, useContext, useState } from "react";
import { defaultColorConfig } from "./ColorsSection/defaultColor";
import {
  BentoTokens,
  Children,
  defaultTokens as bentoDefaultTokens,
} from "@buildo/bento-design-system";
import { HexColor } from "./utils/colorUtils";
import { ColorConfig } from "./ColorEditor/ColorEditor";
import { MapLeafNodes } from "./utils/mapLeafNodes";

type BrandColors =
  | [ColorConfig]
  | [ColorConfig, ColorConfig]
  | [ColorConfig, ColorConfig, ColorConfig];

export type ThemeConfig = {
  colors: {
    brand: BrandColors;
    interactive: ColorConfig;
    neutral: ColorConfig;
    semantic: {
      informative: ColorConfig;
      positive: ColorConfig;
      warning: ColorConfig;
      negative: ColorConfig;
    };
    dataVisualization: {
      grey: ColorConfig;
      red: ColorConfig;
      orange: ColorConfig;
      yellow: ColorConfig;
      green: ColorConfig;
      jade: ColorConfig;
      blue: ColorConfig;
      indigo: ColorConfig;
      violet: ColorConfig;
      pink: ColorConfig;
    };
  };
  tokens: MapLeafNodes<Pick<BentoTokens, "brandColor">, { colorKey: string; alpha: number }>;
};

export type ThemeSection = "colors" | "tokens";

type ConfiguratorStatus = {
  theme: ThemeConfig;
  sections: { [key in ThemeSection]: boolean };
  completeSection: (section: ThemeSection) => void;
  setTheme: (newTheme: ThemeConfig) => void;
};

export const ConfiguratorStatusContext = createContext<ConfiguratorStatus | null>(null);

export const defaultTokens: MapLeafNodes<
  Pick<BentoTokens, "brandColor">,
  { colorKey: string; alpha: number }
> = {
  brandColor: {
    brandPrimary: { colorKey: "BrandPrimary-40", alpha: 100 },
    brandSecondary: { colorKey: "BrandPrimary-20", alpha: 100 },
    brandTertiary: { colorKey: "BrandPrimary-10", alpha: 100 },
  },
};

export function ConfiguratorStatusProvider(props: { children: Children }) {
  const [theme, setTheme] = useState<ThemeConfig>({
    colors: {
      brand: [defaultColorConfig(bentoDefaultTokens.brandColor.brandPrimary as HexColor)],
      interactive: defaultColorConfig(
        bentoDefaultTokens.interactiveBackgroundColor.primarySolidEnabledBackground as HexColor
      ),
      neutral: defaultColorConfig(bentoDefaultTokens.textColor.textPrimary as HexColor),
      semantic: {
        informative: defaultColorConfig(
          bentoDefaultTokens.foregroundColor.foregroundInformative as HexColor
        ),
        positive: defaultColorConfig(
          bentoDefaultTokens.foregroundColor.foregroundPositive as HexColor
        ),
        warning: defaultColorConfig(
          bentoDefaultTokens.foregroundColor.foregroundWarning as HexColor
        ),
        negative: defaultColorConfig(
          bentoDefaultTokens.foregroundColor.foregroundNegative as HexColor
        ),
      },
      dataVisualization: {
        grey: defaultColorConfig(bentoDefaultTokens.dataVisualizationColor.brightGrey as HexColor),
        red: defaultColorConfig(bentoDefaultTokens.dataVisualizationColor.brightRed as HexColor),
        orange: defaultColorConfig(
          bentoDefaultTokens.dataVisualizationColor.brightOrange as HexColor
        ),
        yellow: defaultColorConfig(
          bentoDefaultTokens.dataVisualizationColor.brightYellow as HexColor
        ),
        green: defaultColorConfig(
          bentoDefaultTokens.dataVisualizationColor.brightGreen as HexColor
        ),
        jade: defaultColorConfig(bentoDefaultTokens.dataVisualizationColor.brightJade as HexColor),
        blue: defaultColorConfig(bentoDefaultTokens.dataVisualizationColor.brightBlue as HexColor),
        indigo: defaultColorConfig(
          bentoDefaultTokens.dataVisualizationColor.brightIndigo as HexColor
        ),
        violet: defaultColorConfig(
          bentoDefaultTokens.dataVisualizationColor.brightViolet as HexColor
        ),
        pink: defaultColorConfig(bentoDefaultTokens.dataVisualizationColor.brightPink as HexColor),
      },
    },
    tokens: defaultTokens,
  });

  const [sections, setSections] = useState<ConfiguratorStatus["sections"]>({
    colors: false,
    tokens: false,
  });

  return (
    <ConfiguratorStatusContext.Provider
      value={{
        theme,
        setTheme: (newTheme) => setTheme(newTheme),
        sections,
        completeSection: (section) => setSections({ ...sections, [section]: true }),
      }}
    >
      {props.children}
    </ConfiguratorStatusContext.Provider>
  );
}

export function useConfiguratorStatusContext() {
  const value = useContext(ConfiguratorStatusContext);
  if (!value) {
    throw new Error("Missing ConfiguratorStatusContext.Provider");
  }
  return value;
}

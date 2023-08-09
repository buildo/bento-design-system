import { useState } from "react";
import { ColorConfig } from "../ColorEditor/ColorEditor";
import { ColorsSection } from "../ColorsSection/ColorsSection";
import { HexColor } from "../utils/colorUtils";
import { defaultTokens } from "@buildo/bento-design-system";
import { defaultColorConfig } from "../ColorsSection/defaultColor";

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
};

export function ThemeConfigurator() {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    colors: {
      brand: [defaultColorConfig(defaultTokens.brandColor.brandPrimary as HexColor)],
      interactive: defaultColorConfig(
        defaultTokens.interactiveBackgroundColor.primarySolidEnabledBackground as HexColor
      ),
      neutral: defaultColorConfig(defaultTokens.textColor.textPrimary as HexColor),
      semantic: {
        informative: defaultColorConfig(
          defaultTokens.foregroundColor.foregroundInformative as HexColor
        ),
        positive: defaultColorConfig(defaultTokens.foregroundColor.foregroundPositive as HexColor),
        warning: defaultColorConfig(defaultTokens.foregroundColor.foregroundWarning as HexColor),
        negative: defaultColorConfig(defaultTokens.foregroundColor.foregroundNegative as HexColor),
      },
      dataVisualization: {
        grey: defaultColorConfig(defaultTokens.dataVisualizationColor.brightGrey as HexColor),
        red: defaultColorConfig(defaultTokens.dataVisualizationColor.brightRed as HexColor),
        orange: defaultColorConfig(defaultTokens.dataVisualizationColor.brightOrange as HexColor),
        yellow: defaultColorConfig(defaultTokens.dataVisualizationColor.brightYellow as HexColor),
        green: defaultColorConfig(defaultTokens.dataVisualizationColor.brightGreen as HexColor),
        jade: defaultColorConfig(defaultTokens.dataVisualizationColor.brightJade as HexColor),
        blue: defaultColorConfig(defaultTokens.dataVisualizationColor.brightBlue as HexColor),
        indigo: defaultColorConfig(defaultTokens.dataVisualizationColor.brightIndigo as HexColor),
        violet: defaultColorConfig(defaultTokens.dataVisualizationColor.brightViolet as HexColor),
        pink: defaultColorConfig(defaultTokens.dataVisualizationColor.brightPink as HexColor),
      },
    },
  });

  return (
    <ColorsSection
      value={themeConfig.colors}
      onChange={(colors) => setThemeConfig({ ...themeConfig, colors })}
    />
  );
}

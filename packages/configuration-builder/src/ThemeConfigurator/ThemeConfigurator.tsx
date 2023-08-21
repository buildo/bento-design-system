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
  };
};

export function ThemeConfigurator() {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    colors: {
      brand: [defaultColorConfig(defaultTokens.brandColor.brandPrimary as HexColor)],
    },
  });

  return (
    <ColorsSection
      value={themeConfig.colors}
      onChange={(colors) => setThemeConfig({ ...themeConfig, colors })}
    />
  );
}

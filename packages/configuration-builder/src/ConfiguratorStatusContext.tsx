import { createContext, useContext, useState } from "react";
import { defaultColorConfig } from "./ColorsSection/defaultColor";
import {
  BentoTokens,
  BodyProps,
  Children,
  DisplayProps,
  HeadlineProps,
  LabelProps,
  TitleProps,
  defaultTokens as bentoDefaultTokens,
} from "@buildo/bento-design-system";
import { HexColor } from "./utils/colorUtils";
import { ColorConfig } from "./ColorEditor/ColorEditor";
import { MapLeafNodes } from "./utils/mapLeafNodes";
import { ColorToken, colorToken } from "./utils/paletteUtils";

type BrandColors =
  | [ColorConfig]
  | [ColorConfig, ColorConfig]
  | [ColorConfig, ColorConfig, ColorConfig];

type ColorsConfig = {
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

type TokensConfig = MapLeafNodes<
  Pick<
    BentoTokens,
    | "brandColor"
    | "backgroundColor"
    | "foregroundColor"
    | "textColor"
    | "interactiveBackgroundColor"
    | "interactiveForegroundColor"
    | "outlineColor"
    | "dataVisualizationColor"
  >,
  ColorToken
>;

export type ElevationConfig = {
  x: number;
  y: number;
  blur: number;
  color: ColorToken;
};

export type TypographyConfig = {
  fontFamily: string;
  typographicScale: {
    display: {
      weight: string;
      sizes: Record<DisplayProps["size"], { fontSize: number; lineHeight: number }>;
    };
    headline: {
      weight: string;
      sizes: Record<HeadlineProps["size"], { fontSize: number; lineHeight: number }>;
    };
    title: {
      weight: string;
      sizes: Record<TitleProps["size"], { fontSize: number; lineHeight: number }>;
    };
    body: {
      regularWeight: string;
      strongWeight: string;
      sizes: Record<BodyProps["size"], { fontSize: number; lineHeight: number }>;
    };
    label: {
      weight: string;
      sizes: Record<LabelProps["size"], { fontSize: number; lineHeight: number }>;
    };
  };
};

export type ThemeConfig = {
  colors: ColorsConfig;
  elevations: Record<"small" | "medium" | "large", ElevationConfig>;
  tokens: TokensConfig;
  typography: TypographyConfig;
};

export type ThemeSection = "colors" | "tokens" | "elevations" | "typography";

type ConfiguratorStatus = {
  theme: ThemeConfig;
  sections: { [key in ThemeSection]: boolean };
  completeSection: (section: ThemeSection) => void;
  setTheme: (newTheme: ThemeConfig) => void;
};

export const ConfiguratorStatusContext = createContext<ConfiguratorStatus | null>(null);

export const defaultTokens: TokensConfig = {
  brandColor: {
    brandPrimary: colorToken("BrandPrimary-40"),
    brandSecondary: colorToken("BrandPrimary-20"),
    brandTertiary: colorToken("BrandPrimary-10"),
  },
  backgroundColor: {
    backgroundPrimary: colorToken("white"),
    backgroundSecondary: colorToken("Neutral-1"),
    backgroundOverlay: colorToken("Neutral-20", 40),
    backgroundPrimaryInverse: colorToken("Neutral-90"),
    backgroundSecondaryInverse: colorToken("Neutral-80"),
    backgroundInteractive: colorToken("Interactive-40"),
    backgroundInteractiveOverlay: colorToken("Interactive-10", 40),
    backgroundInformative: colorToken("Informative-5"),
    backgroundPositive: colorToken("Positive-5"),
    backgroundWarning: colorToken("Warning-5"),
    backgroundNegative: colorToken("Negative-5"),
    backgroundLightScrim: colorToken("white", 80),
    backgroundDarkScrim: colorToken("Neutral-90", 60),
  },
  foregroundColor: {
    foregroundPrimary: colorToken("Neutral-90"),
    foregroundSecondary: colorToken("Neutral-50"),
    foregroundPrimaryInverse: colorToken("white"),
    foregroundSecondaryInverse: colorToken("Neutral-30"),
    foregroundInteractive: colorToken("Interactive-40"),
    foregroundInformative: colorToken("Informative-30"),
    foregroundPositive: colorToken("Positive-50"),
    foregroundWarning: colorToken("Warning-40"),
    foregroundNegative: colorToken("Negative-30"),
    foregroundDisabled: colorToken("Neutral-40", 30),
  },
  textColor: {
    textPrimary: colorToken("Neutral-90"),
    textSecondary: colorToken("Neutral-50"),
    textPrimaryInverse: colorToken("Neutral-1"),
    textSecondaryInverse: colorToken("Neutral-30"),
    textInteractive: colorToken("Interactive-40"),
    textInformative: colorToken("Informative-50"),
    textPositive: colorToken("Positive-70"),
    textWarning: colorToken("Warning-60"),
    textNegative: colorToken("Negative-60"),
    textDisabled: colorToken("Neutral-40", 30),
  },
  interactiveBackgroundColor: {
    primarySolidEnabledBackground: colorToken("Interactive-40"),
    primarySolidHoverBackground: colorToken("Interactive-60"),
    primarySolidFocusBackground: colorToken("Interactive-60"),
    primaryTransparentEnabledBackground: colorToken("white", 0),
    primaryTransparentHoverBackground: colorToken("Interactive-10", 40),
    primaryTransparentFocusBackground: colorToken("Interactive-10", 40),
    dangerSolidEnabledBackground: colorToken("Negative-40"),
    dangerSolidHoverBackground: colorToken("Negative-60"),
    dangerSolidFocusBackground: colorToken("Negative-60"),
    dangerTransparentEnabledBackground: colorToken("white", 0),
    dangerTransparentHoverBackground: colorToken("Negative-40", 10),
    dangerTransparentFocusBackground: colorToken("Negative-40", 10),
    secondarySolidEnabledBackground: colorToken("Neutral-5"),
    secondarySolidHoverBackground: colorToken("Neutral-20"),
    secondarySolidFocusBackground: colorToken("Neutral-20"),
    secondaryTransparentEnabledBackground: colorToken("white", 0),
    secondaryTransparentHoverBackground: colorToken("Neutral-20", 40),
    secondaryTransparentFocusBackground: colorToken("Neutral-20", 40),
    disabledSolidBackground: colorToken("Neutral-20", 20),
    disabledTransparentBackground: colorToken("white", 0),
  },
  interactiveForegroundColor: {
    primarySolidEnabledForeground: colorToken("white"),
    primarySolidHoverForeground: colorToken("white"),
    primarySolidFocusForeground: colorToken("white"),
    primaryTransparentEnabledForeground: colorToken("Interactive-40"),
    primaryTransparentHoverForeground: colorToken("Interactive-60"),
    primaryTransparentFocusForeground: colorToken("Interactive-60"),
    dangerSolidEnabledForeground: colorToken("white"),
    dangerSolidHoverForeground: colorToken("white"),
    dangerSolidFocusForeground: colorToken("white"),
    dangerTransparentEnabledForeground: colorToken("Negative-40"),
    dangerTransparentHoverForeground: colorToken("Negative-60"),
    dangerTransparentFocusForeground: colorToken("Negative-60"),
    secondarySolidEnabledForeground: colorToken("Neutral-90"),
    secondarySolidHoverForeground: colorToken("Neutral-90"),
    secondarySolidFocusForeground: colorToken("Neutral-90"),
    secondaryTransparentEnabledForeground: colorToken("Neutral-80"),
    secondaryTransparentHoverForeground: colorToken("black"),
    secondaryTransparentFocusForeground: colorToken("black"),
    disabledSolidForeground: colorToken("Neutral-40", 30),
    disabledTransparentForeground: colorToken("Neutral-40", 30),
    linkEnabled: colorToken("Interactive-40"),
    linkHover: colorToken("Interactive-60"),
    linkFocus: colorToken("Interactive-60"),
    linkDisabled: colorToken("Neutral-40", 30),
    linkEnabledInverse: colorToken("Interactive-10"),
    linkHoverInverse: colorToken("Interactive-5"),
    linkFocusInverse: colorToken("Interactive-5"),
    linkDisabledInverse: colorToken("Neutral-60"),
  },
  outlineColor: {
    outlineInteractive: colorToken("Interactive-40"),
    outlineDecorative: colorToken("Neutral-20"),
    outlineContainer: colorToken("Neutral-5"),
    outlineInputEnabled: colorToken("Neutral-40"),
    outlineInputHover: colorToken("Neutral-60"),
    outlineInputFocus: colorToken("Interactive-40"),
    outlineInputDisabled: colorToken("Neutral-40", 30),
    outlineInformative: colorToken("Informative-30"),
    outlinePositive: colorToken("Positive-50"),
    outlineWarning: colorToken("Warning-40"),
    outlineNegative: colorToken("Negative-30"),
    outlineInteractivePrimaryEnabled: colorToken("Interactive-40"),
    outlineInteractivePrimaryHover: colorToken("Interactive-60"),
    outlineInteractivePrimaryFocus: colorToken("Interactive-60"),
    outlineInteractiveSecondaryEnabled: colorToken("Neutral-80"),
    outlineInteractiveSecondaryHover: colorToken("black"),
    outlineInteractiveSecondaryFocus: colorToken("black"),
    outlineInteractiveDangerEnabled: colorToken("Negative-40"),
    outlineInteractiveDangerHover: colorToken("Negative-60"),
    outlineInteractiveDangerFocus: colorToken("Negative-60"),
    outlineInteractiveDisabled: colorToken("Neutral-40", 30),
  },
  dataVisualizationColor: {
    softIndigo: colorToken("Indigo-10"),
    softViolet: colorToken("Violet-10"),
    softPink: colorToken("Pink-10"),
    softRed: colorToken("Red-10"),
    softOrange: colorToken("Orange-10"),
    softYellow: colorToken("Yellow-10"),
    softGreen: colorToken("Green-10"),
    softJade: colorToken("Jade-10"),
    softBlue: colorToken("Blue-10"),
    softGrey: colorToken("Grey-10"),
    brightIndigo: colorToken("Indigo-30"),
    brightViolet: colorToken("Violet-30"),
    brightPink: colorToken("Pink-30"),
    brightRed: colorToken("Red-30"),
    brightOrange: colorToken("Orange-30"),
    brightYellow: colorToken("Yellow-30"),
    brightGreen: colorToken("Green-30"),
    brightJade: colorToken("Jade-30"),
    brightBlue: colorToken("Blue-30"),
    brightGrey: colorToken("Grey-30"),
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
    elevations: {
      small: {
        x: 0,
        y: 4,
        blur: 8,
        color: { colorKey: "black", alpha: 16 },
      },
      medium: {
        x: 0,
        y: 8,
        blur: 16,
        color: { colorKey: "black", alpha: 16 },
      },
      large: {
        x: 0,
        y: 16,
        blur: 32,
        color: { colorKey: "black", alpha: 16 },
      },
    },
    typography: {
      fontFamily: "Lexend",
      typographicScale: {
        body: {
          regularWeight: "400",
          strongWeight: "600",
          sizes: {
            small: { fontSize: 12, lineHeight: 18 },
            medium: { fontSize: 14, lineHeight: 20 },
            large: { fontSize: 16, lineHeight: 24 },
          },
        },
        headline: {
          weight: "600",
          sizes: {
            small: { fontSize: 32, lineHeight: 36 },
            medium: { fontSize: 36, lineHeight: 40 },
            large: { fontSize: 40, lineHeight: 44 },
          },
        },
        display: {
          weight: "600",
          sizes: {
            small: { fontSize: 44, lineHeight: 50 },
            medium: { fontSize: 52, lineHeight: 58 },
            large: { fontSize: 64, lineHeight: 72 },
          },
        },
        label: {
          weight: "500",
          sizes: {
            small: { fontSize: 12, lineHeight: 18 },
            medium: { fontSize: 14, lineHeight: 20 },
            large: { fontSize: 16, lineHeight: 24 },
          },
        },
        title: {
          weight: "600",
          sizes: {
            small: { fontSize: 14, lineHeight: 16 },
            medium: { fontSize: 16, lineHeight: 18 },
            large: { fontSize: 22, lineHeight: 24 },
          },
        },
      },
    },
  });

  const [sections, setSections] = useState<ConfiguratorStatus["sections"]>({
    colors: false,
    tokens: false,
    elevations: false,
    typography: false,
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

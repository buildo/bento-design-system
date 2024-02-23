import { match } from "ts-pattern";
import {
  ElevationConfig,
  ThemeConfig,
  TypographyConfig,
  useConfiguratorStatusContext,
} from "../ConfiguratorStatusContext";
import { ColorToken, colorTokenToValue as _colorTokenToValue } from "./paletteUtils";
import prettier from "prettier/standalone";
import parserTypescript from "prettier/parser-typescript";

function uppercase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function colorTokenToVarName(colorToken: ColorToken): string {
  const tokenPart = `${colorToken.colorKey.replace("-", "")}`;
  if (colorToken.alpha === 100) {
    return tokenPart;
  }
  return `${tokenPart}_${colorToken.alpha}`;
}

function elevationToVarName(elevation: "small" | "medium" | "large"): string {
  return match(elevation)
    .with("small", () => "elevationSmall")
    .with("medium", () => "elevationMedium")
    .with("large", () => "elevationLarge")
    .exhaustive();
}

function elevationToValue(elevation: ElevationConfig): string {
  return `${elevation.x}px ${elevation.y}px ${elevation.blur}px \${${colorTokenToVarName(
    elevation.color
  )}}`;
}

function getUsedColors(
  colors: ThemeConfig["colors"],
  tokens: Record<string, Record<string, ColorToken>>,
  elevations: ThemeConfig["elevations"]
): Record<string, string> {
  const colorTokenToValue = _colorTokenToValue(colors);

  const fromTokens = Object.entries(tokens).reduce((acc, [_, tokensSection]) => {
    return {
      ...acc,
      ...Object.entries(tokensSection).reduce((acc, [_, colorToken]) => {
        const rgba = colorTokenToValue(colorToken);
        return rgba ? { ...acc, [colorTokenToVarName(colorToken)]: rgba } : acc;
      }, {}),
    };
  }, {});

  const fromElevations = Object.entries(elevations).reduce((acc, [_, elevation]) => {
    const rgba = colorTokenToValue(elevation.color);
    return rgba ? { ...acc, [colorTokenToVarName(elevation.color)]: rgba } : acc;
  }, {});

  return { ...fromTokens, ...fromElevations };
}

function exportColorConsts(usedColors: Record<string, string>): string {
  return Object.entries(usedColors).reduce((acc, [colorKey, color]) => {
    return `${acc}const ${colorKey} = "${color}";`;
  }, "");
}

function exportColorTokens(tokens: Record<string, Record<string, ColorToken>>): string {
  const colorTokens = Object.entries(tokens).reduce((acc, [key, tokensSection]) => {
    const tokens = Object.entries(tokensSection).reduce((acc, [key, colorToken]) => {
      return `${acc}${key}: ${colorTokenToVarName(colorToken)},`;
    }, "");

    return `${acc}${key}: {${tokens}},`;
  }, "");

  return colorTokens;
}

function exportBoxShadows(
  outlineColors: ThemeConfig["tokens"]["outlineColor"],
  elevations: ThemeConfig["elevations"]
): string {
  const fromOutlineColors = Object.entries(outlineColors).reduce((acc, [key, colorToken]) => {
    const regular = `${key}: \`inset 0px 0px 0px 1px \${${colorTokenToVarName(colorToken)}}\`,`;
    const bottom =
      key === "outlineInteractive" || key === "outlineDecorative"
        ? `${key}Bottom: \`inset 0px 0px -1px 0px \${${colorTokenToVarName(colorToken)}}\`,`
        : "";
    const strong =
      key === "outlineNegative"
        ? `${key}Strong: \`inset 0px 0px 0px 2px \${${colorTokenToVarName(colorToken)}}\`,`
        : "";

    return `${acc}${regular}${bottom}${strong}`;
  }, "");

  const fromElevations = Object.entries(elevations).reduce((acc, [key, value]) => {
    return `${acc}${elevationToVarName(key as "small" | "medium" | "large")}: \`${elevationToValue(
      value
    )}\`,`;
  }, "");

  return `boxShadows: {
    ${fromOutlineColors}
    ${fromElevations}
  },`;
}

function exportTypography(typography: TypographyConfig): string {
  const fontFamily = `fontFamily: { default: "${typography.fontFamily}" }`;
  const fontSizes = Object.entries(typography.typographicScale).reduce((acc, [kind, value]) => {
    return `${acc}${Object.entries(value.sizes).reduce((acc, [size, value]) => {
      return `${acc}${kind}${uppercase(size)}: pixelToRem(${value.fontSize}),`;
    }, "")}`;
  }, "");
  const lineHeight = Object.entries(typography.typographicScale).reduce((acc, [kind, value]) => {
    return `${acc}${Object.entries(value.sizes).reduce((acc, [size, value]) => {
      return `${acc}${kind}${uppercase(size)}: pixelToRem(${value.lineHeight}),`;
    }, "")}`;
  }, "");
  const fontWeight = Object.entries(typography.typographicScale).reduce((acc, [kind, value]) => {
    return `${acc}${Object.entries(value.weights).reduce((acc, [weight, value]) => {
      return `${acc}${kind}${weight === "regular" ? "" : uppercase(weight)}: "${value}",`;
    }, "")}`;
  }, "");

  return `${fontFamily}, fontSize: {${fontSizes}}, lineHeight: {${lineHeight}}, fontWeight: {${fontWeight}},`;
}

export function useConfigGeneratorTS(): () => string {
  const { tokens, colors, elevations, typography } = useConfiguratorStatusContext().theme;

  return () => {
    const colorConsts = exportColorConsts(getUsedColors(colors, tokens, elevations));
    const colorTokens = exportColorTokens(tokens);
    const boxShadows = exportBoxShadows(tokens.outlineColor, elevations);
    const typographyConfig = exportTypography(typography);

    const themeCode = `
      import { BentoTheme } from "@buildo/bento-design-system";

      const remBaseSize = 16; const pixelToRem = (px: number) => \`\${
        px / remBaseSize
      }rem\`;

      ${colorConsts}

      export const theme = {
        ${colorTokens}
        ${boxShadows}
        ${typographyConfig}
      } satisfies BentoTheme;
    `;

    return prettier.format(themeCode, {
      parser: "typescript",
      plugins: [parserTypescript],
    });
  };
}

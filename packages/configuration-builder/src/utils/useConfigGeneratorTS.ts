import { match } from "ts-pattern";
import { ElevationConfig, useConfiguratorStatusContext } from "../ConfiguratorStatusContext";
import { ColorToken, colorTokenToValue as _colorTokenToValue } from "./paletteUtils";
import prettier from "prettier/standalone";
import parserTypescript from "prettier/parser-typescript";

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

export function useConfigGeneratorTS(): () => string {
  const { tokens, colors, elevations } = useConfiguratorStatusContext().theme;
  const colorTokenToValue = _colorTokenToValue(colors);
  function elevationToValue(elevation: ElevationConfig): string {
    return `${elevation.x}px ${elevation.y}px ${elevation.blur}px ${colorTokenToValue(
      elevation.color
    )}`;
  }
  return () => {
    const prelude = `import { BentoTheme } from "@buildo/bento-design-system";`;

    const usedColors: Record<string, string> = {};
    Object.entries(tokens).forEach(([_, tokensSection]) => {
      Object.entries(tokensSection).forEach(([_, colorToken]) => {
        const rgba = colorTokenToValue(colorToken);
        if (rgba) {
          usedColors[colorTokenToVarName(colorToken)] = rgba;
        }
      });
    });

    const colorConsts = Object.entries(usedColors)
      .reduce((acc, [colorKey, color]) => {
        return [...acc, `const ${colorKey} = "${color}";`];
      }, [] as string[])
      .join("\n");

    let themeCode = "export const theme: BentoTheme = {";
    Object.entries(tokens).forEach(([key, tokensSection]) => {
      themeCode += `${key}: {`;
      Object.entries(tokensSection).forEach(([key2, colorToken]) => {
        themeCode += `${key2}: ${colorTokenToVarName(colorToken)},`;
      });
      themeCode += "},";
    });
    themeCode += `boxShadow: {`;
    Object.entries(elevations).forEach(([key, value]) => {
      themeCode += `${elevationToVarName(key as "small" | "medium" | "large")}: "${elevationToValue(
        value
      )}",`;
    });
    themeCode += `}};`;

    return prettier.format([prelude, colorConsts, themeCode].join("\n\n"), {
      parser: "typescript",
      plugins: [parserTypescript],
    });
  };
}

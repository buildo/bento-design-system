import { useConfiguratorStatusContext } from "../ConfiguratorStatusContext";
import { ColorToken, colorTokenToRGBA as _colorTokenToRGBA } from "./paletteUtils";

function colorTokenToVarName(colorToken: ColorToken): string {
  const tokenPart = `${colorToken.colorKey.replace("-", "")}`;
  if (colorToken.alpha === 100) {
    return tokenPart;
  }
  return `${tokenPart}_${colorToken.alpha}`;
}

export function useConfigurationExporter(): () => string {
  const { tokens, colors } = useConfiguratorStatusContext().theme;
  const colorTokenToRGBA = _colorTokenToRGBA(colors);
  return () => {
    const prelude = `import { BentoTheme } from "@buildo/bento-design-system";`;

    const usedColors: Record<string, string> = {};
    Object.entries(tokens).forEach(([_, tokensSection]) => {
      Object.entries(tokensSection).forEach(([_, colorToken]) => {
        const rgba = colorTokenToRGBA(colorToken);
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

    let themeCode = "export const theme: BentoTheme = {\n";
    Object.entries(tokens).forEach(([key, tokensSection]) => {
      themeCode += `   ${key}: {\n`;
      Object.entries(tokensSection).forEach(([key2, colorToken]) => {
        themeCode += `    ${key2}: ${colorTokenToVarName(colorToken)},\n`;
      });
      themeCode += "  },\n";
    });
    themeCode += "};";

    return [prelude, colorConsts, themeCode].join("\n\n");
  };
}

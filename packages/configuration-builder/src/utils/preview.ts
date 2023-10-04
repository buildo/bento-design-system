import { BentoTheme } from "@buildo/bento-design-system";
import { useConfiguratorStatusContext } from "../ConfiguratorStatusContext";
import { ColorToken, colorTokenToRGBA as _colorTokenToRGBA } from "./paletteUtils";

export function useConfiguredTheme(): BentoTheme & object {
  const { tokens: _tokens, colors } = useConfiguratorStatusContext().theme;
  const tokens = _tokens as Record<string, Record<string, ColorToken>>;

  const colorTokenToRGBA = _colorTokenToRGBA(colors);

  return Object.keys(tokens).reduce(
    (acc, key) => ({
      ...acc,
      [key]: Object.keys(tokens[key]).reduce(
        (acc2, key2) => ({
          ...acc2,
          [key2]: colorTokenToRGBA(tokens[key][key2]),
        }),
        {}
      ),
    }),
    {}
  );
}

import { BentoTheme } from "@buildo/bento-design-system";
import { defaultTokens, useConfiguratorStatusContext } from "../ConfiguratorStatusContext";
import { colorTokenToRGBA as _colorTokenToRGBA } from "./paletteUtils";

export function useConfiguredTheme(): BentoTheme {
  const { tokens, colors } = useConfiguratorStatusContext().theme;

  const colorTokenToRGBA = _colorTokenToRGBA(colors);

  return {
    ...defaultTokens,
    brandColor: {
      brandPrimary: colorTokenToRGBA(tokens.brandColor.brandPrimary),
      brandSecondary: colorTokenToRGBA(tokens.brandColor.brandSecondary),
      brandTertiary: colorTokenToRGBA(tokens.brandColor.brandTertiary),
    },
  };
}

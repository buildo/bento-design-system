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
    backgroundColor: {
      backgroundPrimary: colorTokenToRGBA(tokens.backgroundColor.backgroundPrimary),
      backgroundSecondary: colorTokenToRGBA(tokens.backgroundColor.backgroundSecondary),
      backgroundOverlay: colorTokenToRGBA(tokens.backgroundColor.backgroundOverlay),
      backgroundPrimaryInverse: colorTokenToRGBA(tokens.backgroundColor.backgroundPrimaryInverse),
      backgroundSecondaryInverse: colorTokenToRGBA(
        tokens.backgroundColor.backgroundSecondaryInverse
      ),
      backgroundInteractive: colorTokenToRGBA(tokens.backgroundColor.backgroundInteractive),
      backgroundInteractiveOverlay: colorTokenToRGBA(
        tokens.backgroundColor.backgroundInteractiveOverlay
      ),
      backgroundInformative: colorTokenToRGBA(tokens.backgroundColor.backgroundInformative),
      backgroundPositive: colorTokenToRGBA(tokens.backgroundColor.backgroundPositive),
      backgroundWarning: colorTokenToRGBA(tokens.backgroundColor.backgroundWarning),
      backgroundNegative: colorTokenToRGBA(tokens.backgroundColor.backgroundNegative),
      backgroundLightScrim: colorTokenToRGBA(tokens.backgroundColor.backgroundLightScrim),
      backgroundDarkScrim: colorTokenToRGBA(tokens.backgroundColor.backgroundDarkScrim),
    },
    foregroundColor: {
      foregroundPrimary: colorTokenToRGBA(tokens.foregroundColor.foregroundPrimary),
      foregroundSecondary: colorTokenToRGBA(tokens.foregroundColor.foregroundSecondary),
      foregroundPrimaryInverse: colorTokenToRGBA(tokens.foregroundColor.foregroundPrimaryInverse),
      foregroundSecondaryInverse: colorTokenToRGBA(
        tokens.foregroundColor.foregroundSecondaryInverse
      ),
      foregroundInteractive: colorTokenToRGBA(tokens.foregroundColor.foregroundInteractive),
      foregroundInformative: colorTokenToRGBA(tokens.foregroundColor.foregroundInformative),
      foregroundPositive: colorTokenToRGBA(tokens.foregroundColor.foregroundPositive),
      foregroundWarning: colorTokenToRGBA(tokens.foregroundColor.foregroundWarning),
      foregroundNegative: colorTokenToRGBA(tokens.foregroundColor.foregroundNegative),
      foregroundDisabled: colorTokenToRGBA(tokens.foregroundColor.foregroundDisabled),
    },
    textColor: {
      textPrimary: colorTokenToRGBA(tokens.textColor.textPrimary),
      textSecondary: colorTokenToRGBA(tokens.textColor.textSecondary),
      textPrimaryInverse: colorTokenToRGBA(tokens.textColor.textPrimaryInverse),
      textSecondaryInverse: colorTokenToRGBA(tokens.textColor.textSecondaryInverse),
      textInteractive: colorTokenToRGBA(tokens.textColor.textInteractive),
      textInformative: colorTokenToRGBA(tokens.textColor.textInformative),
      textPositive: colorTokenToRGBA(tokens.textColor.textPositive),
      textWarning: colorTokenToRGBA(tokens.textColor.textWarning),
      textNegative: colorTokenToRGBA(tokens.textColor.textNegative),
      textDisabled: colorTokenToRGBA(tokens.textColor.textDisabled),
    },
  };
}

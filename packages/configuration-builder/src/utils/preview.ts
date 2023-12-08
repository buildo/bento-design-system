import { BentoTheme } from "@buildo/bento-design-system";
import { useConfiguratorStatusContext } from "../ConfiguratorStatusContext";
import { ColorToken, colorTokenToValue as _colorTokenToValue } from "./paletteUtils";

const remBaseSize = 16;
const pixelToRem = (px: number) => `${px / remBaseSize}rem`;

export function useConfiguredTheme(): BentoTheme & object {
  const { tokens: _tokens, colors, elevations, typography } = useConfiguratorStatusContext().theme;
  const tokens = _tokens as Record<string, Record<string, ColorToken>>;

  const colorTokenToValue = _colorTokenToValue(colors);

  const theme: BentoTheme & object = Object.keys(tokens).reduce(
    (acc, key) => ({
      ...acc,
      [key]: Object.keys(tokens[key]).reduce(
        (acc2, key2) => ({
          ...acc2,
          [key2]: colorTokenToValue(tokens[key][key2]),
        }),
        {}
      ),
    }),
    {}
  );

  return {
    ...theme,
    fontFamily: { default: typography.fontFamily },
    fontWeight: {
      body: typography.typographicScale.body.regularWeight,
      bodyStrong: typography.typographicScale.body.strongWeight,
      headline: typography.typographicScale.headline.weight,
      label: typography.typographicScale.label.weight,
      title: typography.typographicScale.title.weight,
      display: typography.typographicScale.display.weight,
    },
    fontSize: {
      bodySmall: pixelToRem(typography.typographicScale.body.sizes.small.fontSize),
      bodyMedium: pixelToRem(typography.typographicScale.body.sizes.medium.fontSize),
      bodyLarge: pixelToRem(typography.typographicScale.body.sizes.large.fontSize),
      headlineSmall: pixelToRem(typography.typographicScale.headline.sizes.small.fontSize),
      headlineMedium: pixelToRem(typography.typographicScale.headline.sizes.medium.fontSize),
      headlineLarge: pixelToRem(typography.typographicScale.headline.sizes.large.fontSize),
      labelSmall: pixelToRem(typography.typographicScale.label.sizes.small.fontSize),
      labelMedium: pixelToRem(typography.typographicScale.label.sizes.medium.fontSize),
      labelLarge: pixelToRem(typography.typographicScale.label.sizes.large.fontSize),
      titleSmall: pixelToRem(typography.typographicScale.title.sizes.small.fontSize),
      titleMedium: pixelToRem(typography.typographicScale.title.sizes.medium.fontSize),
      titleLarge: pixelToRem(typography.typographicScale.title.sizes.large.fontSize),
      displaySmall: pixelToRem(typography.typographicScale.display.sizes.small.fontSize),
      displayMedium: pixelToRem(typography.typographicScale.display.sizes.medium.fontSize),
      displayLarge: pixelToRem(typography.typographicScale.display.sizes.large.fontSize),
    },
    lineHeight: {
      bodySmall: pixelToRem(typography.typographicScale.body.sizes.small.lineHeight),
      bodyMedium: pixelToRem(typography.typographicScale.body.sizes.medium.lineHeight),
      bodyLarge: pixelToRem(typography.typographicScale.body.sizes.large.lineHeight),
      headlineSmall: pixelToRem(typography.typographicScale.headline.sizes.small.lineHeight),
      headlineMedium: pixelToRem(typography.typographicScale.headline.sizes.medium.lineHeight),
      headlineLarge: pixelToRem(typography.typographicScale.headline.sizes.large.lineHeight),
      labelSmall: pixelToRem(typography.typographicScale.label.sizes.small.lineHeight),
      labelMedium: pixelToRem(typography.typographicScale.label.sizes.medium.lineHeight),
      labelLarge: pixelToRem(typography.typographicScale.label.sizes.large.lineHeight),
      titleSmall: pixelToRem(typography.typographicScale.title.sizes.small.lineHeight),
      titleMedium: pixelToRem(typography.typographicScale.title.sizes.medium.lineHeight),
      titleLarge: pixelToRem(typography.typographicScale.title.sizes.large.lineHeight),
      displaySmall: pixelToRem(typography.typographicScale.display.sizes.small.lineHeight),
      displayMedium: pixelToRem(typography.typographicScale.display.sizes.medium.lineHeight),
      displayLarge: pixelToRem(typography.typographicScale.display.sizes.large.lineHeight),
    },
    boxShadow: {
      outlineInteractive: theme.outlineColor?.outlineInteractive
        ? `inset 0px 0px 0px 1px ${theme.outlineColor.outlineInteractive}`
        : undefined,
      outlineInteractiveBottom: theme.outlineColor?.outlineInteractive
        ? `inset 0px -1px 0px ${theme.outlineColor.outlineInteractive}`
        : undefined,
      outlineInteractivePrimaryEnabled: theme.outlineColor?.outlineInteractivePrimaryEnabled
        ? `inset 0px 0px 0px 1px ${theme.outlineColor?.outlineInteractivePrimaryEnabled}`
        : undefined,
      outlineInteractivePrimaryFocus: theme.outlineColor?.outlineInteractivePrimaryFocus
        ? `inset 0px 0px 0px 1px ${theme.outlineColor.outlineInteractivePrimaryEnabled}`
        : undefined,
      outlineInteractivePrimaryHover: theme.outlineColor?.outlineInteractivePrimaryHover
        ? `inset 0px 0px 0px 1px ${theme.outlineColor.outlineInteractivePrimaryHover}`
        : undefined,
      outlineInteractiveSecondaryEnabled: theme.outlineColor?.outlineInteractiveSecondaryEnabled
        ? `inset 0px 0px 0px 1px ${theme.outlineColor.outlineInteractiveSecondaryEnabled}`
        : undefined,
      outlineInteractiveSecondaryFocus: theme.outlineColor?.outlineInteractiveSecondaryFocus
        ? `inset 0px 0px 0px 1px ${theme.outlineColor.outlineInteractiveSecondaryFocus}`
        : undefined,
      outlineInteractiveSecondaryHover: theme.outlineColor?.outlineInteractiveSecondaryHover
        ? `inset 0px 0px 0px 1px ${theme.outlineColor.outlineInteractiveSecondaryHover}`
        : undefined,
      outlineInteractiveDangerEnabled: theme.outlineColor?.outlineInteractiveDangerEnabled
        ? `inset 0px 0px 0px 1px ${theme.outlineColor.outlineInteractiveDangerEnabled}`
        : undefined,
      outlineInteractiveDangerFocus: theme.outlineColor?.outlineInteractiveDangerFocus
        ? `inset 0px 0px 0px 1px ${theme.outlineColor.outlineInteractiveDangerFocus}`
        : undefined,
      outlineInteractiveDangerHover: theme.outlineColor?.outlineInteractiveDangerHover
        ? `inset 0px 0px 0px 1px ${theme.outlineColor?.outlineInteractiveDangerHover}`
        : undefined,
      outlineInteractiveDisabled: theme.outlineColor?.outlineInteractiveDisabled
        ? `inset 0px 0px 0px 1px ${theme.outlineColor.outlineInteractiveDisabled}`
        : undefined,
      outlineInputEnabled: theme.outlineColor?.outlineInputEnabled
        ? `inset 0px 0px 0px 1px ${theme.outlineColor.outlineInputEnabled}`
        : undefined,
      outlineInputHover: theme.outlineColor?.outlineInputHover
        ? `inset 0px 0px 0px 1px ${theme.outlineColor.outlineInputHover}`
        : undefined,
      outlineInputFocus: theme.outlineColor?.outlineInputFocus
        ? `inset 0px 0px 0px 2px ${theme.outlineColor.outlineInputFocus}`
        : undefined,
      elevationSmall: `${elevations.small.x}px ${elevations.small.y}px ${
        elevations.small.blur
      }px ${colorTokenToValue(elevations.small.color)}`,
      elevationMedium: `${elevations.medium.x}px ${elevations.medium.y}px ${
        elevations.medium.blur
      }px ${colorTokenToValue(elevations.medium.color)}`,
      elevationLarge: `${elevations.large.x}px ${elevations.large.y}px ${
        elevations.large.blur
      }px ${colorTokenToValue(elevations.large.color)}`,
    },
  };
}

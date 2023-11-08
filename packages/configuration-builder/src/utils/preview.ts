import { BentoTheme } from "@buildo/bento-design-system";
import { useConfiguratorStatusContext } from "../ConfiguratorStatusContext";
import { ColorToken, colorTokenToRGBA as _colorTokenToRGBA } from "./paletteUtils";

export function useConfiguredTheme(): BentoTheme & object {
  const { tokens: _tokens, colors } = useConfiguratorStatusContext().theme;
  const tokens = _tokens as Record<string, Record<string, ColorToken>>;

  const colorTokenToRGBA = _colorTokenToRGBA(colors);

  const theme: BentoTheme & object = Object.keys(tokens).reduce(
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

  return {
    ...theme,
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
    },
  };
}

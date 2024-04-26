import { TypographySize } from "../Typography/TypographyProps";

export type DataVisualizationPalette = "pastel" | "soft" | "bright" | "dark";
export type DataVisualizationColor =
  | "Grey"
  | "Red"
  | "Orange"
  | "Yellow"
  | "Green"
  | "Jade"
  | "Blue"
  | "Indigo"
  | "Violet"
  | "Pink";

type TypographyTokens<HasBold extends boolean> = {
  fontFamily: string;
  fontWeight: HasBold extends true ? { regular: string; strong: string } : string;
  sizes: Record<
    TypographySize,
    {
      fontSize: string;
      lineHeight: string;
    }
  >;
};

export type BentoTokens = {
  typography: {
    body: TypographyTokens<true>;
    display: TypographyTokens<false>;
    headline: TypographyTokens<false>;
    label: TypographyTokens<false>;
    title: TypographyTokens<false>;
  };
  brandColor: {
    brandPrimary: string;
    brandSecondary: string;
    brandTertiary: string;
  };
  backgroundColor: {
    backgroundPrimary: string;
    backgroundSecondary: string;
    backgroundOverlay: string;
    backgroundPrimaryInverse: string;
    backgroundSecondaryInverse: string;
    backgroundInteractive: string;
    backgroundInteractiveOverlay: string;
    backgroundInformative: string;
    backgroundPositive: string;
    backgroundWarning: string;
    backgroundNegative: string;
    backgroundLightScrim: string;
    backgroundDarkScrim: string;
  };
  foregroundColor: {
    foregroundPrimary: string;
    foregroundSecondary: string;
    foregroundPrimaryInverse: string;
    foregroundSecondaryInverse: string;
    foregroundInteractive: string;
    foregroundInformative: string;
    foregroundPositive: string;
    foregroundWarning: string;
    foregroundNegative: string;
    foregroundDisabled: string;
  };
  textColor: {
    textPrimary: string;
    textSecondary: string;
    textPrimaryInverse: string;
    textSecondaryInverse: string;
    textInteractive: string;
    textInformative: string;
    textPositive: string;
    textWarning: string;
    textNegative: string;
    textDisabled: string;
  };
  interactiveBackgroundColor: {
    primarySolidEnabledBackground: string;
    primarySolidHoverBackground: string;
    primarySolidFocusBackground: string;
    primaryTransparentEnabledBackground: string;
    primaryTransparentHoverBackground: string;
    primaryTransparentFocusBackground: string;
    secondarySolidEnabledBackground: string;
    secondarySolidHoverBackground: string;
    secondarySolidFocusBackground: string;
    secondaryTransparentEnabledBackground: string;
    secondaryTransparentHoverBackground: string;
    secondaryTransparentFocusBackground: string;
    dangerSolidEnabledBackground: string;
    dangerSolidHoverBackground: string;
    dangerSolidFocusBackground: string;
    dangerTransparentEnabledBackground: string;
    dangerTransparentHoverBackground: string;
    dangerTransparentFocusBackground: string;
    disabledSolidBackground: string;
    disabledTransparentBackground: string;
  };
  interactiveForegroundColor: {
    primarySolidEnabledForeground: string;
    primarySolidHoverForeground: string;
    primarySolidFocusForeground: string;
    primaryTransparentEnabledForeground: string;
    primaryTransparentHoverForeground: string;
    primaryTransparentFocusForeground: string;
    secondarySolidEnabledForeground: string;
    secondarySolidHoverForeground: string;
    secondarySolidFocusForeground: string;
    secondaryTransparentEnabledForeground: string;
    secondaryTransparentHoverForeground: string;
    secondaryTransparentFocusForeground: string;
    dangerSolidEnabledForeground: string;
    dangerSolidHoverForeground: string;
    dangerSolidFocusForeground: string;
    dangerTransparentEnabledForeground: string;
    dangerTransparentHoverForeground: string;
    dangerTransparentFocusForeground: string;
    disabledSolidForeground: string;
    disabledTransparentForeground: string;
    linkEnabled: string;
    linkHover: string;
    linkFocus: string;
    linkDisabled: string;
    linkEnabledInverse: string;
    linkHoverInverse: string;
    linkFocusInverse: string;
    linkDisabledInverse: string;
  };
  outlineColor: {
    outlineInteractive: string;
    outlineInteractivePrimaryEnabled: string;
    outlineInteractivePrimaryFocus: string;
    outlineInteractivePrimaryHover: string;
    outlineInteractiveSecondaryEnabled: string;
    outlineInteractiveSecondaryFocus: string;
    outlineInteractiveSecondaryHover: string;
    outlineInteractiveDangerEnabled: string;
    outlineInteractiveDangerFocus: string;
    outlineInteractiveDangerHover: string;
    outlineInteractiveDisabled: string;
    outlineDecorative: string;
    outlineContainer: string;
    outlineInputEnabled: string;
    outlineInputHover: string;
    outlineInputFocus: string;
    outlineInputDisabled: string;
    outlineInformative: string;
    outlinePositive: string;
    outlineWarning: string;
    outlineNegative: string;
  };
  dataVisualizationColor: Record<`${DataVisualizationPalette}${DataVisualizationColor}`, string>;
  elevations: {
    elevationSmall: string;
    elevationMedium: string;
    elevationLarge: string;
  };
};

export type BentoTokens = {
  fontFamily: {
    default: string;
  };
  fontWeight: {
    body: string;
    bodyStrong: string;
    display: string;
    headline: string;
    label: string;
    title: string;
  };
  fontSize: {
    bodySmall: string;
    bodyMedium: string;
    bodyLarge: string;
    displaySmall: string;
    displayMedium: string;
    displayLarge: string;
    headlineSmall: string;
    headlineMedium: string;
    headlineLarge: string;
    labelSmall: string;
    labelMedium: string;
    labelLarge: string;
    titleSmall: string;
    titleMedium: string;
    titleLarge: string;
  };
  lineHeight: {
    bodySmall: string;
    bodyMedium: string;
    bodyLarge: string;
    displaySmall: string;
    displayMedium: string;
    displayLarge: string;
    headlineSmall: string;
    headlineMedium: string;
    headlineLarge: string;
    labelSmall: string;
    labelMedium: string;
    labelLarge: string;
    titleSmall: string;
    titleMedium: string;
    titleLarge: string;
  };
  letterSpacing: {
    1: string;
    2: string;
  };
  space: {
    0: string;
    4: string;
    8: string;
    12: string;
    16: string;
    24: string;
    32: string;
    40: string;
    80: string;
  };
  negativeSpace: {
    0: string;
    // NOTE(gabro): ideally we would use "-4" and so on here, but we can't due to
    // https://github.com/Swatinem/rollup-plugin-dts/issues/201
    negative4: string;
    negative8: string;
    negative12: string;
    negative16: string;
    negative24: string;
    negative32: string;
    negative40: string;
    negative80: string;
  };
  radius: {
    4: string;
    8: string;
    16: string;
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
  dataVisualizationColor: {
    softGrey: string;
    softRed: string;
    softOrange: string;
    softYellow: string;
    softGreen: string;
    softJade: string;
    softBlue: string;
    softIndigo: string;
    softViolet: string;
    softPink: string;
    brightGrey: string;
    brightRed: string;
    brightOrange: string;
    brightYellow: string;
    brightGreen: string;
    brightJade: string;
    brightBlue: string;
    brightIndigo: string;
    brightViolet: string;
    brightPink: string;
  };
  boxShadow: {
    outlineInteractive: string;
    outlineInteractiveBottom: string;
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
    outlineDecorativeBottom: string;
    outlineContainer: string;
    outlineInputEnabled: string;
    outlineInputHover: string;
    outlineInputFocus: string;
    outlineInputDisabled: string;
    outlineInformative: string;
    outlinePositive: string;
    outlineWarning: string;
    outlineNegative: string;
    outlineNegativeStrong: string;
    elevationSmall: string;
    elevationMedium: string;
    elevationLarge: string;
  };
};

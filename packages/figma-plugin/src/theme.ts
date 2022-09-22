import { figmaRGBToHex } from "@figma-plugin/helpers";

export default function exportTheme() {
  console.log(JSON.stringify(theme(), null, 2));
  figma.closePlugin("Done! Check the console");
}

function theme() {
  return {
    brandColor: {
      brandPrimary: getStyleColor("Brand/Primary"),
      brandSecondary: getStyleColor("Brand/Secondary"),
      brandTertiary: getStyleColor("Brand/Tertiary"),
    },
    backgroundColor: {
      backgroundPrimary: getStyleColor("Background/Primary"),
      backgroundSecondary: getStyleColor("Background/Secondary"),
      backgroundOverlay: getStyleColor("Background/Overlay"),
      backgroundPrimaryInverse: getStyleColor("Background/Primary Inverse"),
      backgroundSecondaryInverse: getStyleColor("Background/Secondary Inverse"),
      backgroundInteractive: getStyleColor("Background/Interactive"),
      backgroundInteractiveOverlay: getStyleColor("Background/Interactive Overlay"),
      backgroundInformative: getStyleColor("Background/Informative"),
      backgroundPositive: getStyleColor("Background/Positive"),
      backgroundWarning: getStyleColor("Background/Warning"),
      backgroundNegative: getStyleColor("Background/Negative"),
      backgroundLightScrim: getStyleColor("Background/Light Scrim"),
      backgroundDarkScrim: getStyleColor("Background/Dark Scrim"),
    },
    foregroundColor: {
      foregroundPrimary: getStyleColor("Foreground/Primary"),
      foregroundSecondary: getStyleColor("Foreground/Secondary"),
      foregroundPrimaryInverse: getStyleColor("Foreground/Primary Inverse"),
      foregroundSecondaryInverse: getStyleColor("Foreground/Secondary Inverse"),
      foregroundInteractive: getStyleColor("Foreground/Interactive"),
      foregroundInformative: getStyleColor("Foreground/Informative"),
      foregroundPositive: getStyleColor("Foreground/Positive"),
      foregroundWarning: getStyleColor("Foreground/Warning"),
      foregroundNegative: getStyleColor("Foreground/Negative"),
      foregroundDisabled: getStyleColor("Foreground/Disabled"),
    },
    textColor: {
      textPrimary: getStyleColor("Text/Primary"),
      textSecondary: getStyleColor("Text/Secondary"),
      textPrimaryInverse: getStyleColor("Text/Primary Inverse"),
      textSecondaryInverse: getStyleColor("Text/Secondary Inverse"),
      textInteractive: getStyleColor("Text/Interactive"),
      textInformative: getStyleColor("Text/Informative"),
      textPositive: getStyleColor("Text/Positive"),
      textWarning: getStyleColor("Text/Warning"),
      textNegative: getStyleColor("Text/Negative"),
      textDisabled: getStyleColor("Text/Disabled"),
    },
    interactiveBackgroundColor: {
      // primarySolidEnabledBackground:
      // primarySolidHoverBackground:
      // primarySolidFocusBackground:
      // primaryTransparentEnabledBackground:
      // primaryTransparentHoverBackground:
      // primaryTransparentFocusBackground:
      // secondarySolidEnabledBackground:
      // secondarySolidHoverBackground:
      // secondarySolidFocusBackground:
      // secondaryTransparentEnabledBackground:
      // secondaryTransparentHoverBackground:
      // secondaryTransparentFocusBackground:
      // dangerSolidEnabledBackground:
      // dangerSolidHoverBackground:
      // dangerSolidFocusBackground:
      // dangerTransparentEnabledBackground:
      // dangerTransparentHoverBackground:
      // dangerTransparentFocusBackground:
      // disabledSolidBackground:
      // disabledTransparentBackground:
    },
    interactiveForegroundColor: {
      // primarySolidEnabledForeground:
      // primarySolidHoverForeground:
      // primarySolidFocusForeground:
      // primaryTransparentEnabledForeground:
      // primaryTransparentHoverForeground:
      // primaryTransparentFocusForeground:
      // secondarySolidEnabledForeground:
      // secondarySolidHoverForeground:
      // secondarySolidFocusForeground:
      // secondaryTransparentEnabledForeground:
      // secondaryTransparentHoverForeground:
      // secondaryTransparentFocusForeground:
      // dangerSolidEnabledForeground:
      // dangerSolidHoverForeground:
      // dangerSolidFocusForeground:
      // dangerTransparentEnabledForeground:
      // dangerTransparentHoverForeground:
      // dangerTransparentFocusForeground:
      // disabledSolidForeground:
      // disabledTransparentForeground:
      // linkEnabled:
      // linkHover:
      // linkFocus:
      // linkDisabled:
      // linkEnabledInverse:
      // linkHoverInverse:
      // linkFocusInverse:
      // linkDisabledInverse:
    },
    outlineColor: {
      outlineInteractive: getStyleColor("Outline/Interactive"),
      outlineDecorative: getStyleColor("Outline/Decorative"),
      outlineContainer: getStyleColor("Outline/Container"),
      outlineInputEnabled: getStyleColor("Outline/Input Enabled"),
      outlineInputHover: getStyleColor("Outline/Input Hover"),
      outlineInputFocus: getStyleColor("Outline/Input Focus"),
      outlineInputDisabled: getStyleColor("Outline/Input Disabled"),
      outlineInformative: getStyleColor("Outline/Informative"),
      outlinePositive: getStyleColor("Outline/Positive"),
      outlineWarning: getStyleColor("Outline/Warning"),
      outlineNegative: getStyleColor("Outline/Negative"),
    },
    dataVisualizationColor: {
      softGrey: getStyleColor("Data Visualization/Soft Grey"),
      softRed: getStyleColor("Data Visualization/Soft Red"),
      softOrange: getStyleColor("Data Visualization/Soft Orange"),
      softYellow: getStyleColor("Data Visualization/Soft Yellow"),
      softGreen: getStyleColor("Data Visualization/Soft Green"),
      softJade: getStyleColor("Data Visualization/Soft Jade"),
      softBlue: getStyleColor("Data Visualization/Soft Blue"),
      softIndigo: getStyleColor("Data Visualization/Soft Indigo"),
      softViolet: getStyleColor("Data Visualization/Soft Violet"),
      softPink: getStyleColor("Data Visualization/Soft Pink"),
      brightGrey: getStyleColor("Data Visualization/Bright Grey"),
      brightRed: getStyleColor("Data Visualization/Bright Red"),
      brightOrange: getStyleColor("Data Visualization/Bright Orange"),
      brightYellow: getStyleColor("Data Visualization/Bright Yellow"),
      brightGreen: getStyleColor("Data Visualization/Bright Green"),
      brightJade: getStyleColor("Data Visualization/Bright Jade"),
      brightBlue: getStyleColor("Data Visualization/Bright Blue"),
      brightIndigo: getStyleColor("Data Visualization/Bright Indigo"),
      brightViolet: getStyleColor("Data Visualization/Bright Violet"),
      brightPink: getStyleColor("Data Visualization/Bright Pink"),
    },
    boxShadow: {
      // outlineInteractive:
      // outlineInteractiveBottom:
      // outlineDecorative:
      // outlineDecorativeBottom:
      // outlineContainer:
      // outlineInputEnabled:
      // outlineInputHover:
      // outlineInputFocus:
      // outlineInputDisabled:
      // outlineInformative:
      // outlinePositive:
      // outlineWarning:
      // outlineNegative:
      // outlineNegativeStrong:
      elevationSmall: getEffectStyle("Elevation/Small"),
      elevationMedium: getEffectStyle("Elevation/Medium"),
      elevationLarge: getEffectStyle("Elevation/Large"),
    },
  };
}

function getStyleColor(name: string): string | undefined {
  const styles = figma.getLocalPaintStyles();
  const paint = styles.find((s) => s.name === name)?.paints[0];

  if (!paint) {
    console.warn(`No color found for name '${name}'`);
    return;
  }

  switch (paint.type) {
    case "SOLID":
      return figmaRGBToHex(paint.color).toUpperCase();
    default:
      console.warn("Unhandled paint type", paint.type);
  }
}

function getEffectStyle(name: string): string | undefined {
  const styles = figma.getLocalEffectStyles();
  const effect = styles.find((s) => s.name === name)?.effects[0];

  if (!effect) {
    console.warn(`No effect found for name '${name}'`);
    return;
  }

  switch (effect.type) {
    case "DROP_SHADOW":
    case "INNER_SHADOW":
      return figmaEffectToBoxShadow(effect);
    default:
      console.warn("Unhandled effect type", effect.type);
  }
}

function figmaEffectToBoxShadow(effect: Extract<Effect, { type: "DROP_SHADOW" | "INNER_SHADOW" }>) {
  const offset = `${effect.offset.x}px ${effect.offset.y}px`;
  const radius = `${effect.radius}px`;
  const spread = `${effect.spread ?? 0}px`;
  const color = figmaRGBToHex(effect.color);

  const prefix = effect.type === "INNER_SHADOW" ? "inset " : "";

  return prefix + [offset, radius, spread, color].join(" ");
}

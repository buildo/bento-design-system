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
      primarySolidEnabledBackground: getStyleColor("Interactive/Primary/Solid/Enabled Background"),
      primarySolidHoverBackground: getStyleColor("Interactive/Primary/Solid/Hover Background"),
      primarySolidFocusBackground: getStyleColor("Interactive/Primary/Solid/Focus Background"),
      primaryTransparentEnabledBackground: getStyleColor("Interactive/Primary/Transparent/Enabled"),
      primaryTransparentHoverBackground: getStyleColor("Interactive/Primary/Transparent/Hover Background"),
      primaryTransparentFocusBackground: getStyleColor("Interactive/Primary/Transparent/Focus Background"),
      secondarySolidEnabledBackground: getStyleColor("Interactive/Secondary/Solid/Enabled Background"),
      secondarySolidHoverBackground: getStyleColor("Interactive/Secondary/Solid/Hover Background"),
      secondarySolidFocusBackground: getStyleColor("Interactive/Secondary/Solid/Focus Background"),
      secondaryTransparentEnabledBackground: getStyleColor("Interactive/Secondary/Enabled Background"),
      secondaryTransparentHoverBackground: getStyleColor("Interactive/Secondary/Hover Background"),
      secondaryTransparentFocusBackground: getStyleColor("Interactive/Secondary/Focus Background"),
      dangerSolidEnabledBackground: getStyleColor("Interactive/Danger/Solid/Enabled Background"),
      dangerSolidHoverBackground: getStyleColor("Interactive/Danger/Solid/Hover Background"),
      dangerSolidFocusBackground: getStyleColor("Interactive/Danger/Solid/Focus Background"),
      dangerTransparentEnabledBackground: getStyleColor("Interactive/Danger/Transparent/Enabled Background"),
      dangerTransparentHoverBackground: getStyleColor("Interactive/Danger/Transparent/Hover Background"),
      dangerTransparentFocusBackground: getStyleColor("Interactive/Danger/Transparent/Focus Background"),
      disabledSolidBackground: getStyleColor("Interactive/Disabled/Solid/Disabled Background"),
      disabledTransparentBackground: getStyleColor("Interactive/Disabled/Transparent/Disabled Background"),
    },
    interactiveForegroundColor: {
      primarySolidEnabledForeground: getStyleColor("Interactive/Primary/Solid/Enabled Foreground"),
      primarySolidHoverForeground: getStyleColor("Interactive/Primary/Solid/Hover Foreground"),
      primarySolidFocusForeground: getStyleColor("Interactive/Primary/Solid/Focus Foreground"),
      primaryTransparentEnabledForeground: getStyleColor("Interactive/Primary/TranspareForeground"),
      primaryTransparentHoverForeground: getStyleColor("Interactive/Primary/Transparent/Hover Foreground"),
      primaryTransparentFocusForeground: getStyleColor("Interactive/Primary/Transparent/Focus Foreground"),
      secondarySolidEnabledForeground: getStyleColor("Interactive/Secondary/Solid/Enabled Foreground"),
      secondarySolidHoverForeground: getStyleColor("Interactive/Secondary/Solid/Hover Foreground"),
      secondarySolidFocusForeground: getStyleColor("Interactive/Secondary/Solid/Focus Foreground"),
      secondaryTransparentEnabledForeground: getStyleColor("Interactive/Secondary/Enabled Foreground"),
      secondaryTransparentHoverForeground: getStyleColor("Interactive/Secondary/Hover Foreground"),
      secondaryTransparentFocusForeground: getStyleColor("Interactive/Secondary/Focus Foreground"),
      dangerSolidEnabledForeground: getStyleColor("Interactive/Danger/Solid/Enabled Foreground"),
      dangerSolidHoverForeground: getStyleColor("Interactive/Danger/Solid/Hover Foreground"),
      dangerSolidFocusForeground: getStyleColor("Interactive/Danger/Solid/Focus Foreground"),
      dangerTransparentEnabledForeground: getStyleColor("Interactive/Danger/Transparent/Enabled Foreground"),
      dangerTransparentHoverForeground: getStyleColor("Interactive/Danger/Transparent/Hover Foreground"),
      dangerTransparentFocusForeground: getStyleColor("Interactive/Danger/Transparent/Focus Foreground"),
      disabledSolidForeground: getStyleColor("Interactive/Disabled/Solid/Disabled Foreground"),
      disabledTransparentForeground: getStyleColor("Interactive/Disabled/Transparent/Disabled Foreground"),
      linkEnabled: getStyleColor("Interactive/Link/Enabled"),
      linkHover: getStyleColor("Interactive/Link/Hover"),
      linkFocus: getStyleColor("Interactive/Link/Focus"),
      linkDisabled: getStyleColor("Interactive/Link/Disabled"),
      linkEnabledInverse: getStyleColor("Interactive/Link/Enabled Inverse"),
      linkHoverInverse: getStyleColor("Interactive/Link/Hover Inverse"),
      linkFocusInverse: getStyleColor("Interactive/Link/Focus Inverse"),
      linkDisabledInverse: getStyleColor("Interactive/Link/Disabled Inverse"),
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

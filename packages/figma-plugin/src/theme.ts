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

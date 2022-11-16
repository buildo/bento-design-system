import * as Figma from "figma-api";
import ora from "ora";
import { figmaRGBToHex, figmaRGBToWebRGB } from "@figma-plugin/helpers";
import path from "path";
import prettier from "prettier";
import { isNodeType } from "figma-api";
import chalk from "chalk";
import { Ctx } from "./util/Ctx.js";
import { writeFile } from "./util/writeFile.js";

export async function syncTheme({ ctx, outFile }: { ctx: Ctx; outFile: string }) {
  console.log(chalk.bold("🎨Theme"));

  const theme = {
    fontFamily: {
      default: getTextStyle("Body/Medium")?.fontFamily,
    },
    fontWeight: {
      body: getTextStyle("Body/Medium")?.weight?.toString(),
      bodyStrong: getTextStyle("Body/Medium Strong")?.weight?.toString(),
      display: getTextStyle("Display/Medium")?.weight?.toString(),
      headline: getTextStyle("Headline/Medium")?.weight?.toString(),
      label: getTextStyle("Label/Medium")?.weight?.toString(),
      title: getTextStyle("Title/Medium")?.weight?.toString(),
    },
    fontSize: {
      bodySmall: getTextStyle("Body/Small")?.fontSize,
      bodyMedium: getTextStyle("Body/Medium")?.fontSize,
      bodyLarge: getTextStyle("Body/Large")?.fontSize,
      displaySmall: getTextStyle("Display/Small")?.fontSize,
      displayMedium: getTextStyle("Display/Medium")?.fontSize,
      displayLarge: getTextStyle("Display/Large")?.fontSize,
      headlineSmall: getTextStyle("Headline/Small")?.fontSize,
      headlineMedium: getTextStyle("Headline/Medium")?.fontSize,
      headlineLarge: getTextStyle("Headline/Large")?.fontSize,
      labelSmall: getTextStyle("Label/Small")?.fontSize,
      labelMedium: getTextStyle("Label/Medium")?.fontSize,
      labelLarge: getTextStyle("Label/Large")?.fontSize,
      titleSmall: getTextStyle("Title/Small")?.fontSize,
      titleMedium: getTextStyle("Title/Medium")?.fontSize,
      titleLarge: getTextStyle("Title/Large")?.fontSize,
    },
    lineHeight: {
      bodySmall: getTextStyle("Body/Small")?.lineHeight,
      bodyMedium: getTextStyle("Body/Medium")?.lineHeight,
      bodyLarge: getTextStyle("Body/Large")?.lineHeight,
      displaySmall: getTextStyle("Display/Small")?.lineHeight,
      displayMedium: getTextStyle("Display/Medium")?.lineHeight,
      displayLarge: getTextStyle("Display/Large")?.lineHeight,
      headlineSmall: getTextStyle("Headline/Small")?.lineHeight,
      headlineMedium: getTextStyle("Headline/Medium")?.lineHeight,
      headlineLarge: getTextStyle("Headline/Large")?.lineHeight,
      labelSmall: getTextStyle("Label/Small")?.lineHeight,
      labelMedium: getTextStyle("Label/Medium")?.lineHeight,
      labelLarge: getTextStyle("Label/Large")?.lineHeight,
      titleSmall: getTextStyle("Title/Small")?.lineHeight,
      titleMedium: getTextStyle("Title/Medium")?.lineHeight,
      titleLarge: getTextStyle("Title/Large")?.lineHeight,
    },
    letterSpacing: {
      1: "0.01em",
      2: "0.02em",
    },
    space: {
      0: "0",
      4: "4px",
      8: "8px",
      16: "16px",
      24: "24px",
      32: "32px",
      40: "40px",
      80: "80px",
    },
    negativeSpace: {
      0: "0",
      negative4: "-4px",
      negative8: "-8px",
      negative16: "-16px",
      negative24: "-24px",
      negative32: "-32px",
      negative40: "-40px",
      negative80: "-80px",
    },
    radius: {
      4: "4px",
      8: "8px",
      16: "16px",
    },
    brandColor: {
      brandPrimary: getColorStyle("Brand/Primary"),
      brandSecondary: getColorStyle("Brand/Secondary"),
      brandTertiary: getColorStyle("Brand/Tertiary"),
    },
    backgroundColor: {
      backgroundPrimary: getColorStyle("Background/Primary"),
      backgroundSecondary: getColorStyle("Background/Secondary"),
      backgroundOverlay: getColorStyle("Background/Overlay"),
      backgroundPrimaryInverse: getColorStyle("Background/Primary Inverse"),
      backgroundSecondaryInverse: getColorStyle("Background/Secondary Inverse"),
      backgroundInteractive: getColorStyle("Background/Interactive"),
      backgroundInteractiveOverlay: getColorStyle("Background/Interactive Overlay"),
      backgroundInformative: getColorStyle("Background/Informative"),
      backgroundPositive: getColorStyle("Background/Positive"),
      backgroundWarning: getColorStyle("Background/Warning"),
      backgroundNegative: getColorStyle("Background/Negative"),
      backgroundLightScrim: getColorStyle("Background/Light Scrim"),
      backgroundDarkScrim: getColorStyle("Background/Dark Scrim"),
    },
    foregroundColor: {
      foregroundPrimary: getColorStyle("Foreground/Primary"),
      foregroundSecondary: getColorStyle("Foreground/Secondary"),
      foregroundPrimaryInverse: getColorStyle("Foreground/Primary Inverse"),
      foregroundSecondaryInverse: getColorStyle("Foreground/Secondary Inverse"),
      foregroundInteractive: getColorStyle("Foreground/Interactive"),
      foregroundInformative: getColorStyle("Foreground/Informative"),
      foregroundPositive: getColorStyle("Foreground/Positive"),
      foregroundWarning: getColorStyle("Foreground/Warning"),
      foregroundNegative: getColorStyle("Foreground/Negative"),
      foregroundDisabled: getColorStyle("Foreground/Disabled"),
    },
    textColor: {
      textPrimary: getColorStyle("Text/Primary"),
      textSecondary: getColorStyle("Text/Secondary"),
      textPrimaryInverse: getColorStyle("Text/Primary Inverse"),
      textSecondaryInverse: getColorStyle("Text/Secondary Inverse"),
      textInteractive: getColorStyle("Text/Interactive"),
      textInformative: getColorStyle("Text/Informative"),
      textPositive: getColorStyle("Text/Positive"),
      textWarning: getColorStyle("Text/Warning"),
      textNegative: getColorStyle("Text/Negative"),
      textDisabled: getColorStyle("Text/Disabled"),
    },
    interactiveBackgroundColor: {
      primarySolidEnabledBackground: getColorStyle("Interactive/Primary/Solid/Enabled Background"),
      primarySolidHoverBackground: getColorStyle("Interactive/Primary/Solid/Hover Background"),
      primarySolidFocusBackground: getColorStyle("Interactive/Primary/Solid/Focus Background"),
      primaryTransparentEnabledBackground: getColorStyle(
        "Interactive/Primary/Transparent/Enabled Background"
      ),
      primaryTransparentHoverBackground: getColorStyle(
        "Interactive/Primary/Transparent/Hover Background"
      ),
      primaryTransparentFocusBackground: getColorStyle(
        "Interactive/Primary/Transparent/Focus Background"
      ),
      secondarySolidEnabledBackground: getColorStyle(
        "Interactive/Secondary/Solid/Enabled Background"
      ),
      secondarySolidHoverBackground: getColorStyle("Interactive/Secondary/Solid/Hover Background"),
      secondarySolidFocusBackground: getColorStyle("Interactive/Secondary/Solid/Focus Background"),
      secondaryTransparentEnabledBackground: getColorStyle(
        "Interactive/Secondary/Transparent/Enabled Background"
      ),
      secondaryTransparentHoverBackground: getColorStyle(
        "Interactive/Secondary/Transparent/Hover Background"
      ),
      secondaryTransparentFocusBackground: getColorStyle(
        "Interactive/Secondary/Transparent/Focus Background"
      ),
      dangerSolidEnabledBackground: getColorStyle("Interactive/Danger/Solid/Enabled Background"),
      dangerSolidHoverBackground: getColorStyle("Interactive/Danger/Solid/Hover Background"),
      dangerSolidFocusBackground: getColorStyle("Interactive/Danger/Solid/Focus Background"),
      dangerTransparentEnabledBackground: getColorStyle(
        "Interactive/Danger/Transparent/Enabled Background"
      ),
      dangerTransparentHoverBackground: getColorStyle(
        "Interactive/Danger/Transparent/Hover Background"
      ),
      dangerTransparentFocusBackground: getColorStyle(
        "Interactive/Danger/Transparent/Focus Background"
      ),
      disabledSolidBackground: getColorStyle("Interactive/Disabled/Solid/Disabled Background"),
      disabledTransparentBackground: getColorStyle(
        "Interactive/Disabled/Transparent/Disabled Background"
      ),
    },
    interactiveForegroundColor: {
      primarySolidEnabledForeground: getColorStyle("Interactive/Primary/Solid/Enabled Foreground"),
      primarySolidHoverForeground: getColorStyle("Interactive/Primary/Solid/Hover Foreground"),
      primarySolidFocusForeground: getColorStyle("Interactive/Primary/Solid/Focus Foreground"),
      primaryTransparentEnabledForeground: getColorStyle(
        "Interactive/Primary/Transparent/Enabled Foreground"
      ),
      primaryTransparentHoverForeground: getColorStyle(
        "Interactive/Primary/Transparent/Hover Foreground"
      ),
      primaryTransparentFocusForeground: getColorStyle(
        "Interactive/Primary/Transparent/Focus Foreground"
      ),
      secondarySolidEnabledForeground: getColorStyle(
        "Interactive/Secondary/Solid/Enabled Foreground"
      ),
      secondarySolidHoverForeground: getColorStyle("Interactive/Secondary/Solid/Hover Foreground"),
      secondarySolidFocusForeground: getColorStyle("Interactive/Secondary/Solid/Focus Foreground"),
      secondaryTransparentEnabledForeground: getColorStyle(
        "Interactive/Secondary/Transparent/Enabled Foreground"
      ),
      secondaryTransparentHoverForeground: getColorStyle(
        "Interactive/Secondary/Transparent/Hover Foreground"
      ),
      secondaryTransparentFocusForeground: getColorStyle(
        "Interactive/Secondary/Transparent/Focus Foreground"
      ),
      dangerSolidEnabledForeground: getColorStyle("Interactive/Danger/Solid/Enabled Foreground"),
      dangerSolidHoverForeground: getColorStyle("Interactive/Danger/Solid/Hover Foreground"),
      dangerSolidFocusForeground: getColorStyle("Interactive/Danger/Solid/Focus Foreground"),
      dangerTransparentEnabledForeground: getColorStyle(
        "Interactive/Danger/Transparent/Enabled Foreground"
      ),
      dangerTransparentHoverForeground: getColorStyle(
        "Interactive/Danger/Transparent/Hover Foreground"
      ),
      dangerTransparentFocusForeground: getColorStyle(
        "Interactive/Danger/Transparent/Focus Foreground"
      ),
      disabledSolidForeground: getColorStyle("Interactive/Disabled/Solid/Disabled Foreground"),
      disabledTransparentForeground: getColorStyle(
        "Interactive/Disabled/Transparent/Disabled Foreground"
      ),
      linkEnabled: getColorStyle("Interactive/Link/Enabled"),
      linkHover: getColorStyle("Interactive/Link/Hover"),
      linkFocus: getColorStyle("Interactive/Link/Focus"),
      linkDisabled: getColorStyle("Interactive/Link/Disabled"),
      linkEnabledInverse: getColorStyle("Interactive/Link/Enabled Inverse"),
      linkHoverInverse: getColorStyle("Interactive/Link/Hover Inverse"),
      linkFocusInverse: getColorStyle("Interactive/Link/Focus Inverse"),
      linkDisabledInverse: getColorStyle("Interactive/Link/Disabled Inverse"),
    },
    outlineColor: {
      outlineInteractive: getColorStyle("Outline/Interactive"),
      outlineDecorative: getColorStyle("Outline/Decorative"),
      outlineContainer: getColorStyle("Outline/Container"),
      outlineInputEnabled: getColorStyle("Outline/Input Enabled"),
      outlineInputHover: getColorStyle("Outline/Input Hover"),
      outlineInputFocus: getColorStyle("Outline/Input Focus"),
      outlineInputDisabled: getColorStyle("Outline/Input Disabled"),
      outlineInformative: getColorStyle("Outline/Informative"),
      outlinePositive: getColorStyle("Outline/Positive"),
      outlineWarning: getColorStyle("Outline/Warning"),
      outlineNegative: getColorStyle("Outline/Negative"),
    },
    dataVisualizationColor: {
      softGrey: getColorStyle("Data Visualization/Soft Grey"),
      softRed: getColorStyle("Data Visualization/Soft Red"),
      softOrange: getColorStyle("Data Visualization/Soft Orange"),
      softYellow: getColorStyle("Data Visualization/Soft Yellow"),
      softGreen: getColorStyle("Data Visualization/Soft Green"),
      softJade: getColorStyle("Data Visualization/Soft Jade"),
      softBlue: getColorStyle("Data Visualization/Soft Blue"),
      softIndigo: getColorStyle("Data Visualization/Soft Indigo"),
      softViolet: getColorStyle("Data Visualization/Soft Violet"),
      softPink: getColorStyle("Data Visualization/Soft Pink"),
      brightGrey: getColorStyle("Data Visualization/Bright Grey"),
      brightRed: getColorStyle("Data Visualization/Bright Red"),
      brightOrange: getColorStyle("Data Visualization/Bright Orange"),
      brightYellow: getColorStyle("Data Visualization/Bright Yellow"),
      brightGreen: getColorStyle("Data Visualization/Bright Green"),
      brightJade: getColorStyle("Data Visualization/Bright Jade"),
      brightBlue: getColorStyle("Data Visualization/Bright Blue"),
      brightIndigo: getColorStyle("Data Visualization/Bright Indigo"),
      brightViolet: getColorStyle("Data Visualization/Bright Violet"),
      brightPink: getColorStyle("Data Visualization/Bright Pink"),
    },
    boxShadow: {
      outlineInteractive: `inset 0px 0px 0px 1px ${getColorStyle("Outline/Interactive")}`,
      outlineInteractiveBottom: `inset 0px -1px 0px ${getColorStyle("Outline/Interactive")}`,
      outlineDecorative: `inset 0px 0px 0px 1px ${getColorStyle("Outline/Decorative")}`,
      outlineDecorativeBottom: `inset 0px -1px 0px ${getColorStyle("Outline/Decorative")}`,
      outlineContainer: `inset 0px 0px 0px 1px ${getColorStyle("Outline/Container")}`,
      outlineInputEnabled: `inset 0px 0px 0px 1px ${getColorStyle("Outline/Input Enabled")}`,
      outlineInputHover: `inset 0px 0px 0px 1px ${getColorStyle("Outline/Input Hover")}`,
      outlineInputFocus: `inset 0px 0px 0px 2px ${getColorStyle("Outline/Input Focus")}`,
      outlineInputDisabled: `inset 0px 0px 0px 1px ${getColorStyle("Outline/Input Disabled")}`,
      outlineInformative: `inset 0px 0px 0px 1px ${getColorStyle("Outline/Informative")}`,
      outlinePositive: `inset 0px 0px 0px 1px ${getColorStyle("Outline/Positive")}`,
      outlineWarning: `inset 0px 0px 0px 1px ${getColorStyle("Outline/Warning")}`,
      outlineNegative: `inset 0px 0px 0px 1px ${getColorStyle("Outline/Negative")}`,
      outlineNegativeStrong: `inset 0px 0px 0px 2px ${getColorStyle("Outline/Negative")}`,
      elevationSmall: getEffectStyle("Elevation/Small"),
      elevationMedium: getEffectStyle("Elevation/Medium"),
      elevationLarge: getEffectStyle("Elevation/Large"),
    },
  };

  const themeWriteLoader = ora({
    text: `Exporting theme to ${chalk.underline(outFile)}`,
    indent: 2,
  }).start();
  const themeFileContent = prettier.format(
    `
  import { createGlobalTheme } from "@vanilla-extract/css";
  import { vars } from "@buildo/bento-design-system";

  createGlobalTheme(":root", vars, ${JSON.stringify(theme, null, 2)});
  `,
    { parser: "typescript" }
  );

  const outFilePath = path.join(process.cwd(), outFile);
  writeFile(outFilePath, themeFileContent);

  themeWriteLoader.succeed(`Exported theme to ${chalk.underline(outFile)}`);

  function getColorStyle(name: string): string | undefined {
    const paint = Object.values(ctx.styleNodes).find((s) => s!.document.name === name)?.document
      .fills[0];

    if (!paint) {
      console.warn(`No color found for name '${name}'`);
      return;
    }

    switch (paint.type) {
      case "SOLID":
        return figmaColorToColor(paint.color!, paint.opacity);
      default:
        console.warn("Unhandled paint type", paint.type);
        return;
    }
  }

  function getTextStyle(name: string) {
    const remBaseSize = 16;
    const pixelToRem = (px: number) => `${px / remBaseSize}rem`;

    const textStyles = Object.values(ctx.styleNodes)
      .filter((n) => isNodeType(n?.document, "TEXT"))
      .map((n) => n!.document as unknown as Figma.Node<"TEXT">);
    const text = textStyles.find((s) => s.name === name);

    if (!text) {
      console.warn(`No text style found for name '${name}'`);
      return;
    }

    return {
      fontFamily: text.style.fontFamily,
      fontSize: pixelToRem(text.style.fontSize),
      lineHeight: pixelToRem(text.style.lineHeightPx),
      weight: text.style.fontWeight,
    };
  }

  function getEffectStyle(name: string) {
    const effectStyles = Object.values(ctx.styleNodes).map((n) => n!.document);

    const effect = effectStyles.find((s) => s.name === name)?.effects?.[0];

    if (!effect) {
      console.warn(`No effect found for name '${name}'`);
      return;
    }

    switch (effect.type) {
      case "DROP_SHADOW":
      case "INNER_SHADOW":
        const offset = `${effect.offset!.x}px ${effect.offset!.y}px`;
        const radius = `${effect.radius}px`;
        const spread = `${effect.spread ?? 0}px`;
        const color = figmaColorToColor(effect.color!, effect.color!.a);

        const prefix = effect.type === "INNER_SHADOW" ? "inset " : "";

        return prefix + [offset, radius, spread, color].join(" ");
      default:
        console.warn("Unhandled effect type", effect.type);
        return;
    }
  }

  function figmaColorToColor(color: Figma.Color, opacity?: number): string {
    if (opacity != null && opacity < 1) {
      const [r, g, b, a] = figmaRGBToWebRGB({ ...color, a: opacity });
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    } else {
      return figmaRGBToHex(color!).toUpperCase();
    }
  }
}

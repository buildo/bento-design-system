import { match } from "ts-pattern";
import { ColorConfig, LightnessInterpolation } from "../ColorEditor/ColorEditor";
import { HSLToHex, HexColor, withAlpha } from "./colorUtils";
import { ThemeConfig } from "../ConfiguratorStatusContext";

export type PaletteName =
  | "BrandPrimary"
  | "BrandSecondary"
  | "BrandTertiary"
  | "Interactive"
  | "Neutral"
  | "Informative"
  | "Positive"
  | "Warning"
  | "Negative"
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

export const stepNames = ["1", "5", "10", "20", "30", "40", "50", "60", "70", "80", "90"] as const;

export type ColorKey = `${PaletteName}-${(typeof stepNames)[number]}` | "black" | "white";

const interpolations: Record<LightnessInterpolation, number[]> = {
  Linear: [97, 91, 82, 73, 64, 55, 46, 37, 28, 19, 10],
  EaseIn: [97, 93, 88, 82, 75, 65, 54, 43, 32, 21, 10],
  EaseOut: [97, 86, 75, 64, 53, 42, 32, 25, 19, 14, 10],
  EaseInOut: [97, 93, 87, 79, 67, 54, 41, 28, 20, 14, 10],
};

export function getPalette(props: {
  hue: number;
  saturation: number;
  lightnessInterpolation: LightnessInterpolation;
}) {
  const { hue, saturation, lightnessInterpolation } = props;
  const lightnesses = interpolations[lightnessInterpolation];

  return lightnesses.map((lightness) => {
    const color = HSLToHex({ h: hue, s: saturation, l: lightness });
    return { value: color, lightness };
  });
}

export function getPaletteKeyColor(
  name: PaletteName,
  colors: ThemeConfig["colors"]
): ColorConfig | undefined {
  return match(name)
    .with("BrandPrimary", () => colors.brand[0])
    .with("BrandSecondary", () => colors.brand[1])
    .with("BrandTertiary", () => colors.brand[2])
    .with("Interactive", () => colors.interactive)
    .with("Neutral", () => colors.neutral)
    .with("Informative", () => colors.semantic.informative)
    .with("Positive", () => colors.semantic.positive)
    .with("Warning", () => colors.semantic.warning)
    .with("Negative", () => colors.semantic.negative)
    .with("Grey", () => colors.dataVisualization.grey)
    .with("Red", () => colors.dataVisualization.red)
    .with("Orange", () => colors.dataVisualization.orange)
    .with("Yellow", () => colors.dataVisualization.yellow)
    .with("Green", () => colors.dataVisualization.green)
    .with("Jade", () => colors.dataVisualization.jade)
    .with("Blue", () => colors.dataVisualization.blue)
    .with("Indigo", () => colors.dataVisualization.indigo)
    .with("Violet", () => colors.dataVisualization.violet)
    .with("Pink", () => colors.dataVisualization.pink)
    .exhaustive();
}

export type ColorToken = {
  colorKey: ColorKey;
  alpha: number;
};

export function colorTokenToValue(colors: ThemeConfig["colors"]) {
  return (colorToken: ColorToken): string | undefined => {
    if (colorToken.colorKey === "black") {
      return withAlpha("#000000" as HexColor, colorToken.alpha);
    }
    if (colorToken.colorKey === "white") {
      return withAlpha("#ffffff" as HexColor, colorToken.alpha);
    }
    const [paletteName, step] = colorToken.colorKey.split("-");
    const keyColor = getPaletteKeyColor(paletteName as PaletteName, colors);
    if (keyColor != null) {
      if (step === "ref") {
        return withAlpha(keyColor.referenceColor, colorToken.alpha);
      }
      const stepIndex = stepNames.indexOf(step as (typeof stepNames)[number]);

      if (stepIndex != null) {
        const palette = getPalette(keyColor);
        return withAlpha(palette[stepIndex].value, colorToken.alpha);
      }
    }
  };
}

export function colorToken(colorKey: ColorKey, alpha?: number): ColorToken {
  return { colorKey, alpha: alpha ?? 100 };
}

export function getRelativeStep(colorToken: ColorToken, gap: number): ColorToken {
  if (colorToken.colorKey === "black" || colorToken.colorKey === "white") {
    return { colorKey: "black", alpha: colorToken.alpha };
  }
  const [palette, step] = colorToken.colorKey.split("-");
  const stepIndex = stepNames.indexOf(step as (typeof stepNames)[number]);
  const nextStepIndex = stepIndex + gap;
  if (stepNames[nextStepIndex] != null) {
    return {
      colorKey: `${palette}-${stepNames[nextStepIndex]}` as ColorKey,
      alpha: colorToken.alpha,
    };
  } else {
    return { colorKey: "black", alpha: colorToken.alpha };
  }
}

export function getPaletteStep(
  colorKey: ColorKey,
  step: (typeof stepNames)[number],
  alpha: number
): ColorToken {
  if (colorKey === "black" || colorKey === "white") {
    return { colorKey: "black", alpha };
  }
  const [palette] = colorKey.split("-");
  return {
    colorKey: `${palette}-${step}` as ColorKey,
    alpha,
  };
}

import { BodyConfig } from "src/Typography/Body/createBody";
import { DisplayConfig } from "src/Typography/Display/createDisplay";
import { HeadlineConfig } from "src/Typography/Headline/createHeadline";
import { LabelConfig } from "src/Typography/Label/createLabel";
import { TitleConfig } from "src/Typography/Title/createTitle";
import { createBentoBox, createLayoutComponents, createTypographyComponents } from "../src";
import { sprinkles } from "./sprinkles.css";

export { Placeholder } from "../src";

const bodyConfig: BodyConfig<typeof sprinkles> = {
  sizes: {
    small: { fontSize: 12, lineHeight: 16 },
    medium: { fontSize: 14, lineHeight: 18 },
    large: { fontSize: 16, lineHeight: 20 },
  },
  colors: {
    default: "neutral90",
    secondary: "neutral60",
    negative: "negative60",
    disabled: "neutral30",
    positive: "positive80",
    warning: "warning80",
    informative: "info80",
  },
};

const displayConfig: DisplayConfig<typeof sprinkles> = {
  color: "neutral90",
  sizes: {
    small: { fontSize: 36, lineHeight: 46 },
    medium: { fontSize: 45, lineHeight: 56 },
    large: { fontSize: 57, lineHeight: 72 },
  },
};

const headlineConfig: HeadlineConfig<typeof sprinkles> = {
  color: "neutral90",
  sizes: {
    small: { fontSize: 24, lineHeight: 30 },
    medium: { fontSize: 28, lineHeight: 36 },
    large: { fontSize: 32, lineHeight: 40 },
  },
};

const labelConfig: LabelConfig<typeof sprinkles> = {
  sizes: {
    small: { fontSize: 11, lineHeight: 14 },
    medium: { fontSize: 12, lineHeight: 16 },
    large: { fontSize: 14, lineHeight: 18 },
  },
  colors: {
    default: "neutral90",
    secondary: "neutral60",
    disabled: "neutral30",
  },
};

const titleConfig: TitleConfig<typeof sprinkles> = {
  sizes: {
    small: { fontSize: 14, lineHeight: 18 },
    medium: { fontSize: 16, lineHeight: 20 },
    large: { fontSize: 22, lineHeight: 28 },
  },
  colors: {
    default: "neutral90",
    informative: "info80",
    positive: "positive80",
    warning: "warning80",
    negative: "negative80",
  },
};

export const Box = createBentoBox(sprinkles);
export const { Stack, Column, Columns, Inline, Inset } = createLayoutComponents(sprinkles);
export const { Body, Display, Headline, Label, Title } = createTypographyComponents(
  sprinkles,
  bodyConfig,
  displayConfig,
  headlineConfig,
  labelConfig,
  titleConfig
);

import { BodyConfig } from "src/Typography/createBody";
import { createBentoBox, createLayoutComponents, createTextComponents } from "../src";
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

export const Box = createBentoBox(sprinkles);
export const { Stack, Column, Columns, Inline, Inset } = createLayoutComponents(sprinkles);
export const { Body } = createTextComponents(sprinkles, "customFontFamily", bodyConfig);

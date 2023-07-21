import { BentoSprinkles } from "../internal";

type PaddingKey =
  | "padding"
  | "paddingX"
  | "paddingY"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "paddingBottom";
type Padding = 0 | BentoSprinkles["padding"];

export type PaddingConfig = { [k in PaddingKey]?: Padding };

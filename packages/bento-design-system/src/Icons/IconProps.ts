import { BentoSprinkles } from "../internal";

export type IconProps = {
  size: Extract<BentoSprinkles["width"], 8 | 16 | 24> | 12;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "primaryInverse"
    | "secondaryInverse"
    | "brandPrimary"
    | "brandSecondary"
    | "brandTertiary"
    | "informative"
    | "positive"
    | "warning"
    | "negative"
    | "disabled"
    | "inherit"
    | "interactive"
    | "currentColor";
  className?: string;
};

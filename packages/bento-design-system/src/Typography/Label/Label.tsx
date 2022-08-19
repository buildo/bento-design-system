import { Children } from "../../util/Children";
import { Box, BoxProps } from "../..";
import { labelRecipe } from "./Label.css";
import { BentoSprinkles } from "../../internal";

type Size = "small" | "medium" | "large";
type Align = "left" | "center" | "right";
type Color =
  | "default"
  | "primary"
  | "primaryInverse"
  | "secondary"
  | "secondaryInverse"
  | "disabled"
  | "negative"
  | "positive"
  | "informative"
  | "warning"
  | "inherit";

export type LabelProps = {
  children: Children;
  size: Size;
  color?: Color;
  align?: Align;
  uppercase?: boolean;
} & Omit<BoxProps, keyof BentoSprinkles | "className" | "size">;

export function Label({
  children,
  size,
  align,
  color = "default",
  uppercase = false,
  ...boxProps
}: LabelProps) {
  return (
    <Box {...boxProps} className={labelRecipe({ size, color, uppercase })} textAlign={align}>
      {children}
    </Box>
  );
}

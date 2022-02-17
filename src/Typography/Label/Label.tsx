import { LocalizedString } from "src";
import { BoxProps } from "../../Box/createBentoBox";
import { Box, bentoSprinkles } from "../../internal";
import { labelRecipe } from "./Label.css";

type Size = "small" | "medium" | "large";
type Align = "left" | "center" | "right";
type Color = "default" | "primary" | "secondary" | "disabled" | "link";

export type LabelProps = {
  children: LocalizedString;
  size: Size;
  color?: Color;
  align?: Align;
  uppercase?: boolean;
} & Omit<
  BoxProps<typeof bentoSprinkles>,
  keyof Parameters<typeof bentoSprinkles>[0] | "className" | "size"
>;

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

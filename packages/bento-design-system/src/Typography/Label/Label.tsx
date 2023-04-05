import { Box, BoxProps } from "../..";
import { labelRecipe } from "./Label.css";
import { BentoSprinkles } from "../../internal";
import { TypographyAlign, TypographyProps } from "../TypographyProps";

type Align = Extract<TypographyAlign, "left" | "center" | "right">;

export type LabelProps = TypographyProps<Align> & {
  uppercase?: boolean;
} & Omit<BoxProps, keyof BentoSprinkles | "className" | "size">;

export function Label({
  children,
  size,
  align,
  color = "default",
  ellipsis = false,
  uppercase = false,
  ...boxProps
}: LabelProps) {
  return (
    <Box
      {...boxProps}
      className={labelRecipe({ size, color, ellipsis, uppercase })}
      textAlign={align}
    >
      {children}
    </Box>
  );
}

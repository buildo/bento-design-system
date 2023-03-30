import { Children } from "../../util/Children";
import { Box, BoxProps } from "../..";
import { labelRecipe } from "./Label.css";
import { BentoSprinkles } from "../../internal";
import { TypographyColor, TypographyProps } from "../TypographyProps";

type Color = "default" | TypographyColor | "inherit";

export type LabelProps = TypographyProps<Children, Color> & {
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

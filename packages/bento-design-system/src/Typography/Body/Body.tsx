import { Box, BoxProps } from "../../";
import { Children } from "../../util/Children";
import { TypographyColor } from "../TypographyColor";
import { bodyRecipe } from "./Body.css";

type Size = "small" | "medium" | "large";
type Align = "left" | "center" | "right" | "justify";
type Color = TypographyColor | "inherit";

type Props = {
  id?: string;
  children: Children;
  size: Size;
  weight?: "default" | "strong";
  color?: Color;
  align?: Align;
  as?: BoxProps["as"];
};

export function Body({
  children,
  size,
  weight = "default",
  color = "primary",
  align,
  as = "span",
}: Props) {
  return (
    <Box
      as={as}
      className={bodyRecipe({ weight, size, color })}
      textAlign={align}
      fontFamily="default"
    >
      {children}
    </Box>
  );
}

export type { Props as BodyProps };

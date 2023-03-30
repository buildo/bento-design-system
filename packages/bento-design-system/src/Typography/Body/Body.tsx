import { AsProp, Box } from "../../";
import { Children } from "../../util/Children";
import { TypographyAlign, TypographyColor, TypographyProps } from "../TypographyProps";
import { bodyRecipe } from "./Body.css";

type Align = TypographyAlign | "justify";
type Color = "default" | TypographyColor | "inherit";

type Props = TypographyProps<Children, Color, Align> & {
  id?: string;
  weight?: "default" | "strong";
} & AsProp;

export function Body({
  children,
  size,
  weight = "default",
  color = "primary",
  align,
  ellipsis = false,
  as = "span",
}: Props) {
  return (
    <Box
      as={as}
      className={bodyRecipe({ weight, size, color, ellipsis })}
      textAlign={align}
      fontFamily="default"
    >
      {children}
    </Box>
  );
}

export type { Props as BodyProps };

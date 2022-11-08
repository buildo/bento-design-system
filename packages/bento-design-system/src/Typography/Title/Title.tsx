import { LocalizedString, Box, AsProp } from "../..";
import { TypographyColor } from "../TypographyColor";
import { titleRecipe } from "./Title.css";

type Size = "small" | "medium" | "large";
type Align = "left" | "center" | "right";
type Color =
  | Extract<
      TypographyColor,
      | "primary"
      | "secondary"
      | "primaryInverse"
      | "secondaryInverse"
      | "informative"
      | "positive"
      | "warning"
      | "negative"
    >
  | "inherit";

type Props = {
  children: LocalizedString;
  size: Size;
  color?: Color;
  align?: Align;
} & AsProp;

export function Title({ children, size, align, color = "primary", ...boxProps }: Props) {
  return (
    <Box {...boxProps} className={titleRecipe({ size, color })} textAlign={align}>
      {children}
    </Box>
  );
}

export type { Props as TitleProps };

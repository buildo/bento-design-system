import { LocalizedString, Box, AsProp } from "../..";
import { TypographyColor, TypographyProps } from "../TypographyProps";
import { titleRecipe } from "./Title.css";

type Color =
  | "default"
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

type Props = TypographyProps<LocalizedString, Color> & AsProp;

export function Title({
  children,
  size,
  align,
  color = "primary",
  ellipsis = false,
  ...boxProps
}: Props) {
  return (
    <Box {...boxProps} className={titleRecipe({ size, color, ellipsis })} textAlign={align}>
      {children}
    </Box>
  );
}

export type { Props as TitleProps };

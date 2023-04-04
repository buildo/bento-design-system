import { LocalizedString, Box, AsProp } from "../..";
import { TypographyAlign, TypographyColor, TypographyProps } from "../TypographyProps";
import { titleRecipe } from "./Title.css";

type Align = Extract<TypographyAlign, "left" | "center" | "right">;
type Color = Extract<
  TypographyColor,
  | "default"
  | "inherit"
  | "primary"
  | "secondary"
  | "primaryInverse"
  | "secondaryInverse"
  | "informative"
  | "positive"
  | "warning"
  | "negative"
>;

type Props = TypographyProps<Align, LocalizedString, Color> & AsProp;

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

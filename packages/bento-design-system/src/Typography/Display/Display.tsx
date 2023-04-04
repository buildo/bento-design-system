import { Box, LocalizedString } from "../..";
import { TypographyAlign, TypographyColor, TypographyProps } from "../TypographyProps";
import { displayRecipe } from "./Display.css";

type Align = Extract<TypographyAlign, "left" | "center" | "right">;
type Color = Extract<
  TypographyColor,
  "primary" | "secondary" | "primaryInverse" | "secondaryInverse" | "inherit"
>;

type Props = TypographyProps<Align, LocalizedString, Color>;

export function Display({ children, size, color = "primary", align, ellipsis = false }: Props) {
  return (
    <Box as="span" className={displayRecipe({ size, color, ellipsis })} textAlign={align}>
      {children}
    </Box>
  );
}

export type { Props as DisplayProps };

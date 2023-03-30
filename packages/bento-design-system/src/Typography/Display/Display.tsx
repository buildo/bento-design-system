import { Box, LocalizedString } from "../..";
import { TypographyColor, TypographyProps } from "../TypographyProps";
import { displayRecipe } from "./Display.css";

type Color =
  | Extract<TypographyColor, "primary" | "secondary" | "primaryInverse" | "secondaryInverse">
  | "inherit";

type Props = TypographyProps<LocalizedString, Color>;

export function Display({ children, size, color = "primary", align, ellipsis = false }: Props) {
  return (
    <Box as="span" className={displayRecipe({ size, color, ellipsis })} textAlign={align}>
      {children}
    </Box>
  );
}

export type { Props as DisplayProps };

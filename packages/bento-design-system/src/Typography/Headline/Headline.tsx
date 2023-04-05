import { Box, LocalizedString } from "../..";
import { TypographyAlign, TypographyColor, TypographyProps } from "../TypographyProps";
import { headlineRecipe } from "./Headline.css";

type Align = Extract<TypographyAlign, "left" | "center" | "right">;
type Color = Extract<
  TypographyColor,
  "primary" | "secondary" | "primaryInverse" | "secondaryInverse" | "inherit"
>;

type Props = TypographyProps<Align, LocalizedString, Color>;

export function Headline({ children, size, color = "primary", align, ellipsis = false }: Props) {
  return (
    <Box as="span" className={headlineRecipe({ size, color, ellipsis })} textAlign={align}>
      {children}
    </Box>
  );
}

export type { Props as HeadlineProps };

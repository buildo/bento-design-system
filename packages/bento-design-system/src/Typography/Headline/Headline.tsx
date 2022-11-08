import { LocalizedString, Box } from "../..";
import { TypographyColor } from "../TypographyColor";
import { headlineRecipe } from "./Headline.css";

type Size = "small" | "medium" | "large";
type Align = "left" | "center" | "right";
type Color =
  | Extract<TypographyColor, "primary" | "secondary" | "primaryInverse" | "secondaryInverse">
  | "inherit";

type Props = {
  children: LocalizedString;
  size: Size;
  color?: Color;
  align?: Align;
};

export function Headline({ children, size, color = "primary", align }: Props) {
  return (
    <Box as="span" className={headlineRecipe({ size, color })} textAlign={align}>
      {children}
    </Box>
  );
}

export type { Props as HeadlineProps };

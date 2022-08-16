import { LocalizedString, Box } from "../..";
import { headlineRecipe } from "./Headline.css";

type Size = "small" | "medium" | "large";
type Align = "left" | "center" | "right";

type Props = {
  children: LocalizedString;
  size: Size;
  align?: Align;
};

export function Headline({ children, size, align }: Props) {
  return (
    <Box as="span" className={headlineRecipe({ size })} textAlign={align}>
      {children}
    </Box>
  );
}

export type { Props as HeadlineProps };

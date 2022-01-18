import { LocalizedString } from "src";
import { BoxProps } from "../../Box/createBentoBox";
import { bentoSprinkles, Box } from "../../internal";
import { titleRecipe } from "./Title.css";

type Size = "small" | "medium" | "large";
type Align = "left" | "center" | "right";
type Color = "default" | "informative" | "positive" | "warning" | "negative";

type Props = {
  children: LocalizedString;
  size: Size;
  color?: Color;
  align?: Align;
} & Pick<BoxProps<typeof bentoSprinkles>, "as">;

export function Title({ children, size, align, color = "default", ...boxProps }: Props) {
  return (
    <Box {...boxProps} className={titleRecipe({ size, color })} textAlign={align}>
      {children}
    </Box>
  );
}

import { BoxProps } from "../../Box/createBentoBox";
import { Box, bentoSprinkles } from "../../internal";
import { TextChildren, textChildrenToChildren } from "../../util/TextChildren";
import { bodyRecipe } from "./Body.css";

type Size = "small" | "medium" | "large";
type Align = "left" | "center" | "right" | "justify";
type Color =
  | "default"
  | "secondary"
  | "negative"
  | "disabled"
  | "positive"
  | "informative"
  | "warning"
  | "link"
  | "primaryInverse";

type Props = {
  id?: string;
  children: TextChildren;
  size: Size;
  weight?: "default" | "strong";
  color?: Color;
  align?: Align;
  as?: BoxProps<typeof bentoSprinkles>["as"];
};

export function Body({
  children,
  size,
  weight = "default",
  color = "default",
  align,
  as = "span",
}: Props) {
  return (
    <Box
      as={as}
      className={bodyRecipe({ weight, size, color })}
      textAlign={align}
      fontFamily="default"
    >
      {textChildrenToChildren(children)}
    </Box>
  );
}

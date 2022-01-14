import { BoxProps, BoxType } from "../Box/createBentoBox";
import { bentoSprinkles } from "../internal/sprinkles.css";
import { TextChildren, textChildrenToChildren } from "../util/TextChildren";
import { bodyRecipe } from "./Body.css";

type Size = "small" | "medium" | "large";
type Color =
  | "default"
  | "secondary"
  | "negative"
  | "disabled"
  | "positive"
  | "informative"
  | "warning";

export type BodyConfig<AtomsFn extends typeof bentoSprinkles> = {
  sizes: {
    [k in Size]: {
      fontSize: BoxProps<AtomsFn>["fontSize"];
      lineHeight: BoxProps<AtomsFn>["lineHeight"];
    };
  };
  colors: {
    [k in Color]: BoxProps<AtomsFn>["color"];
  };
};

export function createBody<AtomsFn extends typeof bentoSprinkles>(
  Box: BoxType<AtomsFn>,
  fontFamily: BoxProps<AtomsFn>["fontFamily"],
  config: BodyConfig<AtomsFn>
) {
  type Props = {
    children: TextChildren;
    size: Size;
    weight?: "regular" | "semibold";
    color?:
      | "default"
      | "secondary"
      | "negative"
      | "disabled"
      | "positive"
      | "informative"
      | "warning";
    align?: "left" | "center" | "right" | "justify";
    as?: BoxProps<AtomsFn>["as"];
  };

  return function Body({
    children,
    size,
    weight = "regular",
    color = "default",
    align,
    as = "span",
  }: Props) {
    return (
      <Box
        as={as}
        className={bodyRecipe({ weight })}
        textAlign={align}
        fontFamily={fontFamily}
        fontSize={config.sizes[size].fontSize}
        lineHeight={config.sizes[size].lineHeight}
        color={config.colors[color]}
      >
        {textChildrenToChildren(children)}
      </Box>
    );
  };
}

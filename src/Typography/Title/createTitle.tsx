import { LocalizedString } from "src";
import { BoxProps, BoxType } from "../../Box/createBentoBox";
import { bentoSprinkles } from "../../internal/sprinkles.css";
import { title } from "./Title.css";

type Size = "small" | "medium" | "large";
type Align = "left" | "center" | "right";
type Color = "default" | "informative" | "positive" | "warning" | "negative";

export type TitleConfig<AtomsFn extends typeof bentoSprinkles> = {
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

export function createTitle<AtomsFn extends typeof bentoSprinkles>(
  Box: BoxType<AtomsFn>,
  config: TitleConfig<AtomsFn>
) {
  type Props = {
    children: LocalizedString;
    size: Size;
    color?: Color;
    align?: Align;
  } & Pick<BoxProps<AtomsFn>, "as">;

  return function Title({ children, size, align, color = "default", ...boxProps }: Props) {
    return (
      <Box
        {...boxProps}
        className={title}
        textAlign={align}
        fontSize={config.sizes[size].fontSize}
        lineHeight={config.sizes[size].lineHeight}
        color={config.colors[color]}
      >
        {children}
      </Box>
    );
  };
}

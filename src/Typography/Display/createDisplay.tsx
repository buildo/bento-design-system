import { LocalizedString } from "src";
import { BoxProps, BoxType } from "../../Box/createBentoBox";
import { bentoSprinkles } from "../../internal/sprinkles.css";
import { display } from "./Display.css";

type Size = "small" | "medium" | "large";
type Align = "left" | "center" | "right";

export type DisplayConfig<AtomsFn extends typeof bentoSprinkles> = {
  color: BoxProps<AtomsFn>["color"];
  sizes: {
    [k in Size]: {
      fontSize: BoxProps<AtomsFn>["fontSize"];
      lineHeight: BoxProps<AtomsFn>["lineHeight"];
    };
  };
};

export function createDisplay<AtomsFn extends typeof bentoSprinkles>(
  Box: BoxType<AtomsFn>,
  config: DisplayConfig<AtomsFn>
) {
  type Props = {
    children: LocalizedString;
    size: Size;
    align?: Align;
  };

  return function Display({ children, size, align }: Props) {
    return (
      <Box
        as="span"
        className={display}
        textAlign={align}
        fontSize={config.sizes[size].fontSize}
        lineHeight={config.sizes[size].lineHeight}
        color={config.color}
      >
        {children}
      </Box>
    );
  };
}

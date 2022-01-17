import { LocalizedString } from "src";
import { BoxProps, BoxType } from "../../Box/createBentoBox";
import { bentoSprinkles } from "../../internal/sprinkles.css";
import { headline } from "./Headline.css";

type Size = "small" | "medium" | "large";
type Align = "left" | "center" | "right";

export type HeadlineConfig<AtomsFn extends typeof bentoSprinkles> = {
  color: BoxProps<AtomsFn>["color"];
  sizes: {
    [k in Size]: {
      fontSize: BoxProps<AtomsFn>["fontSize"];
      lineHeight: BoxProps<AtomsFn>["lineHeight"];
    };
  };
};

export function createHeadline<AtomsFn extends typeof bentoSprinkles>(
  Box: BoxType<AtomsFn>,
  config: HeadlineConfig<AtomsFn>
) {
  type Props = {
    children: LocalizedString;
    size: Size;
    align?: Align;
  };

  return function Headline({ children, size, align }: Props) {
    return (
      <Box
        as="span"
        className={headline}
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

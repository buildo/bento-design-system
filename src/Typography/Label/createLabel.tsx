import { LocalizedString } from "src";
import { BoxProps, BoxType } from "../../Box/createBentoBox";
import { bentoSprinkles } from "../../internal/sprinkles.css";
import { labelRecipe } from "./Label.css";

type Size = "small" | "medium" | "large";
type Align = "left" | "center" | "right";
type Color = "default" | "secondary" | "disabled";

export type LabelConfig<AtomsFn extends typeof bentoSprinkles> = {
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

export function createLabel<AtomsFn extends typeof bentoSprinkles>(
  Box: BoxType<AtomsFn>,
  config: LabelConfig<AtomsFn>
) {
  type Props = {
    children: LocalizedString;
    size: Size;
    color?: Color;
    align?: Align;
    uppercase?: boolean;
  } & Omit<BoxProps<AtomsFn>, keyof Parameters<AtomsFn>[0] | "className" | "size">;

  return function Label({
    children,
    size,
    align,
    color = "default",
    uppercase = false,
    ...boxProps
  }: Props) {
    return (
      <Box
        {...boxProps}
        className={labelRecipe({ size, uppercase })}
        textAlign={align}
        fontSize={config.sizes[size].fontSize}
        lineHeight={config.sizes[size].lineHeight}
        color={config.colors[color]}
        fill={config.colors[color]}
      >
        {children}
      </Box>
    );
  };
}

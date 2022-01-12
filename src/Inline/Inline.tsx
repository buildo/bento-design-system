import { ComponentProps } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { Children } from "../util/Children";
import { createBentoBox } from "../Box/Box";
import { baseSprinkles } from "../sprinkles.css";

export function createInline<AtomsFn extends typeof baseSprinkles>(sprinkles: AtomsFn) {
  const Box = createBentoBox(sprinkles);

  type BoxProps = ComponentProps<typeof Box>;

  type InlineProps = {
    space: BoxProps["gap"];
    children: Children;
  } & Pick<BoxProps, "as">;

  return function Inline({ space, children, ...boxProps }: InlineProps) {
    return (
      <Box {...boxProps} display="flex" flexWrap="wrap" gap={space}>
        {flattenChildren(children)}
      </Box>
    );
  };
}

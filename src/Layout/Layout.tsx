import { ComponentProps } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { Children } from "../util/Children";
import { createBentoBox } from "../Box/Box";
import { baseSprinkles } from "../sprinkles.css";

export function createLayoutComponents<AtomsFn extends typeof baseSprinkles>(sprinkles: AtomsFn) {
  const Box = createBentoBox(sprinkles);

  type BoxProps = ComponentProps<typeof Box>;

  type InlineProps = {
    space: NonNullable<BoxProps["atoms"]>["gap"];
    children: Children;
  } & Pick<BoxProps, "as">;

  function Inline({ space, children, ...boxProps }: InlineProps) {
    return (
      <Box {...boxProps} atoms={{ display: "flex", flexWrap: "wrap", gap: space }}>
        {flattenChildren(children) as Children}
      </Box>
    );
  }

  return {
    Inline,
  };
}

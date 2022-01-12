import { ComponentProps } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { Children } from "../util/Children";
import { createBentoBox } from "../Box/Box";
import { baseSprinkles } from "../sprinkles.css";
import {
  CollapsibleAlignmentProps,
  responsiveCollapsibleAlignmentProps,
} from "../util/collapsible";

export function createLayoutComponents<AtomsFn extends typeof baseSprinkles>(sprinkles: AtomsFn) {
  const Box = createBentoBox(sprinkles);

  type BoxProps = ComponentProps<typeof Box>;

  type InlineProps = {
    space: NonNullable<BoxProps["atoms"]>["gap"];
    children: Children;
  } & CollapsibleAlignmentProps &
    Pick<BoxProps, "as">;

  function Inline({ space, children, align, alignY, collapseBelow, ...boxProps }: InlineProps) {
    return (
      <Box
        {...boxProps}
        atoms={{
          display: "flex",
          flexWrap: "wrap",
          gap: space,
          ...responsiveCollapsibleAlignmentProps({
            align,
            alignY,
            collapseBelow,
          }),
        }}
      >
        {flattenChildren(children) as Children}
      </Box>
    );
  }

  return {
    Inline,
  };
}

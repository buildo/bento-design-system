import { ComponentProps } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { Children } from "../util/Children";
import { createBentoBox } from "../Box/Box";
import { AtomsFnBase } from "@dessert-box/core";

export function createInline<AtomsFn extends AtomsFnBase>(sprinkles: AtomsFn) {
  const Box = createBentoBox(sprinkles);

  type Space = Parameters<AtomsFn>[0]["gap"];
  type InlineProps = {
    space: Space;
    children: Children;
  } & Pick<ComponentProps<typeof Box>, "as">;

  return function Inline({ space, children, ...boxProps }: InlineProps) {
    return (
      <Box {...(boxProps as any)} display="flex" flexWrap="wrap" gap={space}>
        {flattenChildren(children)}
      </Box>
    );
  };
}

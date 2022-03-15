import flattenChildren from "react-keyed-flatten-children";
import { BoxProps, BoxType } from "../Box/createBentoBox";
import { bentoSprinkles } from "../internal/sprinkles.css";
import { Children } from "../util/Children";
import {
  CollapsibleAlignmentProps,
  responsiveCollapsibleAlignmentProps,
} from "../util/collapsible";

export function createInline<AtomsFn extends typeof bentoSprinkles>(Box: BoxType<AtomsFn>) {
  type ResponsiveSpace = BoxProps<AtomsFn>["gap"];

  type InlineProps = {
    space: ResponsiveSpace;
    children: Children;
  } & CollapsibleAlignmentProps &
    Pick<BoxProps<AtomsFn>, "as">;

  return function Inline({
    space,
    children,
    align,
    alignY,
    collapseBelow,
    reverse,
    ...boxProps
  }: InlineProps) {
    return (
      <Box
        {...boxProps}
        display="flex"
        flexWrap="wrap"
        gap={space}
        {...responsiveCollapsibleAlignmentProps({
          align,
          alignY,
          collapseBelow,
          reverse,
        })}
      >
        {flattenChildren(children)}
      </Box>
    );
  };
}

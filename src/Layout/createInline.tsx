import flattenChildren from "react-keyed-flatten-children";
import { BoxProps, BoxType } from "../Box/createBentoBox";
import { baseSprinkles } from "../sprinkles.css";
import { Children } from "../util/Children";
import {
  CollapsibleAlignmentProps,
  responsiveCollapsibleAlignmentProps,
} from "../util/collapsible";

export function createInline<AtomsFn extends typeof baseSprinkles>(Box: BoxType<AtomsFn>) {
  type ResponsiveSpace = NonNullable<BoxProps<AtomsFn>["atoms"]>["gap"];

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
    ...boxProps
  }: InlineProps) {
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
        {flattenChildren(children)}
      </Box>
    );
  };
}

import flattenChildren from "react-keyed-flatten-children";
import { BoxProps, Box } from "../Box/Box";
import { ResponsiveSpace } from "../internal";
import { Children } from "../util/Children";
import {
  CollapsibleAlignmentProps,
  responsiveCollapsibleAlignmentProps,
} from "../util/collapsible";

type InlineProps = {
  space: ResponsiveSpace;
  children: Children;
} & CollapsibleAlignmentProps &
  Pick<BoxProps, "as">;

export function Inline({
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
}

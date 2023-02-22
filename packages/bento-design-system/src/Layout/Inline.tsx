import { flattenChildren } from "../util/flattenChildren";
import { Box, AsProp } from "../Box/Box";
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
  AsProp;

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

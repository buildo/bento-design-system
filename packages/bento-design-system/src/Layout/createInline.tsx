import { Fragment } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { BoxProps, BoxType } from "../Box/createBentoBox";
import { Divider } from "../Divider/Divider";
import { bentoSprinkles } from "../internal/sprinkles.css";
import { childKey } from "../util/childKey";
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
    dividers?: boolean;
  } & CollapsibleAlignmentProps &
    Pick<BoxProps<AtomsFn>, "as">;

  return function Inline({
    space,
    children,
    align,
    alignY,
    collapseBelow,
    reverse,
    dividers,
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
        {flattenChildren(children).map((child, index) => {
          if (dividers && index > 0) {
            return (
              <Fragment key={childKey(child, index)}>
                <Divider orientation="vertical" />
                {child}
              </Fragment>
            );
          } else return child;
        })}
      </Box>
    );
  };
}

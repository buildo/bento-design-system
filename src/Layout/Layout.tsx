import { ComponentProps, Fragment } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { Children } from "../util/Children";
import { createBentoBox } from "../Box/Box";
import { baseSprinkles } from "../sprinkles.css";
import {
  CollapsibleAlignmentProps,
  responsiveCollapsibleAlignmentProps,
} from "../util/collapsible";
import { alignToFlexAlign, ResponsiveAlign } from "../util/align";
import { childKey } from "../util/childKey";
import { Divider } from "../Divider/Divider";

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
        {flattenChildren(children)}
      </Box>
    );
  }

  type StackProps = {
    space: NonNullable<BoxProps["atoms"]>["gap"];
    children: Children;
    align?: ResponsiveAlign;
    dividers?: boolean;
  } & Pick<ComponentProps<typeof Box>, "as">;

  function Stack({ space, align, children, dividers, ...boxProps }: StackProps) {
    return (
      <Box
        {...boxProps}
        atoms={{
          display: "flex",
          flexDirection: "column",
          alignItems: alignToFlexAlign(align),
          gap: space,
        }}
      >
        {flattenChildren(children).map((child, index) => {
          if (dividers && index > 0) {
            return (
              <Fragment key={childKey(child, index)}>
                <Divider />
                {child}
              </Fragment>
            );
          } else return child;
        })}
      </Box>
    );
  }

  return {
    Inline,
    Stack,
  };
}

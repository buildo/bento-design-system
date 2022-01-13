import { ComponentProps, Fragment } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { BoxType } from "../Box/Box";
import { Divider } from "../Divider/Divider";
import { baseSprinkles } from "../sprinkles.css";
import { ResponsiveAlign, alignToFlexAlign } from "../util/align";
import { childKey } from "../util/childKey";
import { Children } from "../util/Children";

export function createStack<AtomsFn extends typeof baseSprinkles>(Box: BoxType<AtomsFn>) {
  type BoxProps = ComponentProps<typeof Box>;

  type ResponsiveSpace = NonNullable<BoxProps["atoms"]>["gap"];

  type StackProps = {
    space: ResponsiveSpace;
    children: Children;
    align?: ResponsiveAlign;
    dividers?: boolean;
  } & Pick<ComponentProps<typeof Box>, "as">;

  return function Stack({ space, align, children, dividers, ...boxProps }: StackProps) {
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
  };
}

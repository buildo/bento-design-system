import { Fragment } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { Divider } from "../Divider/Divider";
import { ResponsiveAlign, alignToFlexAlign } from "../util/align";
import { childKey } from "../util/childKey";
import { Children } from "../util/Children";
import { Box, BoxProps } from "../Box/Box";
import { ResponsiveSpace } from "../internal";

type StackProps = {
  space: ResponsiveSpace;
  children: Children;
  align?: ResponsiveAlign;
  dividers?: boolean;
} & Pick<BoxProps, "as">;

export function Stack({ space, align, children, dividers, ...boxProps }: StackProps) {
  return (
    <Box
      {...boxProps}
      display="flex"
      flexDirection="column"
      alignItems={alignToFlexAlign(align)}
      gap={space}
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

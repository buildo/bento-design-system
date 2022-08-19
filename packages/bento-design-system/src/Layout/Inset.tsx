import { ComponentProps } from "react";
import { Box } from "../Box/Box";
import { ResponsiveSpace } from "../internal";

type InsetProps = {
  children: ComponentProps<typeof Box>["children"];
} & (
  | {
      space: ResponsiveSpace;
      spaceX?: never;
      spaceY?: never;
    }
  | {
      space?: never;
      spaceX: ResponsiveSpace;
      spaceY?: ResponsiveSpace;
    }
  | {
      space?: never;
      spaceX?: ResponsiveSpace;
      spaceY: ResponsiveSpace;
    }
);

export function Inset({ space, spaceX, spaceY, children }: InsetProps) {
  return (
    <Box padding={space} paddingX={spaceX} paddingY={spaceY}>
      {children}
    </Box>
  );
}

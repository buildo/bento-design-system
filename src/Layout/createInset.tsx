import { ComponentProps } from "react";
import { BoxProps, BoxType } from "../Box/createBentoBox";
import { baseSprinkles } from "../sprinkles.css";

export function createInset<AtomsFn extends typeof baseSprinkles>(Box: BoxType<AtomsFn>) {
  type ResponsiveSpace = BoxProps<AtomsFn>["gap"];

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

  return function Inset({ space, spaceX, spaceY, children }: InsetProps) {
    return (
      <Box padding={space} paddingX={spaceX} paddingY={spaceY}>
        {children}
      </Box>
    );
  };
}

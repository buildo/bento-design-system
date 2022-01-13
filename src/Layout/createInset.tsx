import { ComponentProps } from "react";
import { BoxType } from "../Box/Box";
import { baseSprinkles } from "../sprinkles.css";

export function createInset<AtomsFn extends typeof baseSprinkles>(Box: BoxType<AtomsFn>) {
  type BoxProps = ComponentProps<typeof Box>;

  type ResponsiveSpace = NonNullable<BoxProps["atoms"]>["gap"];

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
    return <Box atoms={{ padding: space, paddingX: spaceX, paddingY: spaceY }}>{children}</Box>;
  };
}

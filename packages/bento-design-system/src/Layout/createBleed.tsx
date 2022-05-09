import { BoxProps, BoxType, Children } from "..";
import { bentoSprinkles } from "../internal";

export function createBleed<AtomsFn extends typeof bentoSprinkles>(Box: BoxType<AtomsFn>) {
  type ResponsiveSpace = BoxProps<AtomsFn>["gap"];

  type BleedProps = {
    children: Children;
    space?: ResponsiveSpace;
    spaceX?: ResponsiveSpace;
    spaceY?: ResponsiveSpace;
    spaceRight?: ResponsiveSpace;
    spaceLeft?: ResponsiveSpace;
    spaceTop?: ResponsiveSpace;
    spaceBottom?: ResponsiveSpace;
  };

  type ResponsiveNegativeSpace = BoxProps<AtomsFn>["margin"];

  function negateSpace(space: ResponsiveSpace | undefined): ResponsiveNegativeSpace | undefined {
    if (typeof space === "number") {
      return `negative${space}`;
    } else if (!!space) {
      return {
        wide: space.wide ? `negative${space.wide}` : undefined,
        desktop: space.desktop ? `negative${space.desktop}` : undefined,
        tablet: space.tablet ? `negative${space.tablet}` : undefined,
        mobile: space.mobile ? `negative${space.mobile}` : undefined,
      };
    } else {
      return undefined;
    }
  }

  return function Bleed({
    space,
    spaceX,
    spaceY,
    spaceRight,
    spaceLeft,
    spaceTop,
    spaceBottom,
    children,
  }: BleedProps) {
    return (
      <Box
        margin={negateSpace(space)}
        marginX={negateSpace(spaceX)}
        marginY={negateSpace(spaceY)}
        marginRight={negateSpace(spaceRight)}
        marginLeft={negateSpace(spaceLeft)}
        marginTop={negateSpace(spaceTop)}
        marginBottom={negateSpace(spaceBottom)}
      >
        {children}
      </Box>
    );
  };
}

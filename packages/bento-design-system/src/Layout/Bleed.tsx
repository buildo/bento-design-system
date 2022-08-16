import { Children } from "..";
import { SprinklesFn } from "../util/SprinklesFn";
import { Box } from "../Box/Box";

type ResponsiveSpace = Parameters<SprinklesFn>[0]["gap"];

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

type ResponsiveNegativeSpace = Parameters<SprinklesFn>[0]["margin"];

function negateSpace(space: ResponsiveSpace | undefined): ResponsiveNegativeSpace | undefined {
  if (typeof space === "number") {
    if (space === 0) {
      return 0;
    } else {
      return `negative${space}`;
    }
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

export function Bleed({
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
}

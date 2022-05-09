import flattenChildren from "react-keyed-flatten-children";
import { Children } from "..";
import { mobileColumns, tabletColumns, desktopColumns, wideColumns } from "./Tiles.css";
import { ResponsiveAlignY, alignYToFlexAlign } from "../util/align";
import { bentoSprinkles } from "../internal";
import { BoxProps, BoxType } from "../Box/createBentoBox";
import { normalizeResponsiveValue, RequiredResponsiveValue } from "../internal/sprinkles.css";

export function createTiles<AtomsFn extends typeof bentoSprinkles>(Box: BoxType<AtomsFn>) {
  type ResponsiveSpace = BoxProps<AtomsFn>["gap"];

  type Props = {
    space: ResponsiveSpace;
    columns: RequiredResponsiveValue<1 | 2 | 3 | 4 | 5 | 6 | 7>;
    children: Children;
    alignY?: ResponsiveAlignY;
  };
  return function Tiles({ space, columns, alignY, children }: Props) {
    const { wide, desktop, tablet, mobile } = normalizeResponsiveValue(columns);
    const className = [
      wide && wideColumns[wide],
      desktop && desktopColumns[desktop],
      tablet && tabletColumns[tablet],
      mobile && mobileColumns[mobile],
    ];

    return (
      <Box className={className} display="grid" gap={space} alignItems={alignYToFlexAlign(alignY)}>
        {flattenChildren(children)}
      </Box>
    );
  };
}

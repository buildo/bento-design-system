import { flattenChildren } from "../util/flattenChildren";
import { Children } from "..";
import { mobileColumns, tabletColumns, desktopColumns, wideColumns } from "./Tiles.css";
import { ResponsiveAlignY, alignYToFlexAlign } from "../util/align";
import { normalizeResponsiveValue, RequiredResponsiveValue } from "../internal/sprinkles.css";
import { Box } from "../Box/Box";
import { ResponsiveSpace } from "../internal";

type Props = {
  space: ResponsiveSpace;
  columns: RequiredResponsiveValue<1 | 2 | 3 | 4 | 5 | 6 | 7>;
  children: Children;
  alignY?: ResponsiveAlignY;
};

export function Tiles({ space, columns, alignY, children }: Props) {
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
}

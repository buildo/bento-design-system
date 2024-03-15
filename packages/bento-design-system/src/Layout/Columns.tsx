import { ReactChild, ReactElement } from "react";
import { isLazy } from "react-is";
import { flattenChildren } from "../util/flattenChildren";
import { BoxProps, Box } from "../Box/Box";
import { ResponsiveSpace } from "../internal";
import { normalizeResponsiveValue, OptionalResponsiveValue } from "../internal/sprinkles.css";
import { childKey } from "../util/childKey";
import { Children } from "../util/Children";
import {
  CollapsibleAlignmentProps,
  responsiveCollapsibleAlignmentProps,
} from "../util/collapsible";
import {
  wideWidths,
  desktopWidths,
  tabletWidths,
  mobileWidths,
  fullWidth,
  columnsSpace,
  column,
  columnContent,
} from "./Column.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

type ColumnProps = {
  children: Children;
  width?: OptionalResponsiveValue<keyof typeof wideWidths>;
  sticky?: {
    top: BoxProps["top"];
  };
};

export function Column({ children, width, sticky }: ColumnProps) {
  const { wide, desktop, tablet, mobile } = width
    ? normalizeResponsiveValue(width)
    : { wide: undefined, desktop: undefined, tablet: undefined, mobile: undefined };

  const className =
    width == null
      ? [column, fullWidth]
      : [
          column,
          wide && wideWidths[wide],
          desktop && desktopWidths[desktop],
          tablet && tabletWidths[tablet],
          mobile && mobileWidths[mobile],
        ];

  const stickyProps = sticky ? ({ position: "sticky", top: sticky.top } as const) : {};

  return (
    <Box className={className} {...stickyProps}>
      <Box className={columnContent}>{children}</Box>
    </Box>
  );
}

type Props = {
  space: ResponsiveSpace;
  children: Children;
} & CollapsibleAlignmentProps;

export function Columns({ space, children, align, alignY, collapseBelow, reverse }: Props) {
  return (
    <Box
      display="flex"
      {...responsiveCollapsibleAlignmentProps({ align, alignY, collapseBelow, reverse })}
      style={assignInlineVars({ [columnsSpace]: `${space}px` })}
    >
      {flattenChildren(children).map((child, index) => {
        if (isColumn(child)) {
          return child;
        }
        return <Column key={childKey(child, index)}>{child as Children}</Column>;
      })}
    </Box>
  );
}

function isColumn(child: ReactChild): child is ReactElement<ColumnProps> {
  if (typeof child !== "object" || !("type" in child)) {
    return false;
  }

  // Check if it is a lazy node (RSC)
  if (isLazy(child)) {
    return !!(child.type as any)._payload?.value?.includes("Column");
  }

  return child.type === Column;
}

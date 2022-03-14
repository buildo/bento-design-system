import { ReactChild, ReactElement } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { BoxType, BoxProps } from "../Box/createBentoBox";
import {
  bentoSprinkles,
  normalizeResponsiveValue,
  OptionalResponsiveValue,
} from "../internal/sprinkles.css";
import { childKey } from "../util/childKey";
import { Children } from "../util/Children";
import {
  CollapsibleAlignmentProps,
  responsiveCollapsibleAlignmentProps,
} from "../util/collapsible";
import { desktopWidths, tabletWidths, mobileWidths, fullWidth } from "./Column.css";

export function createColumns<AtomsFn extends typeof bentoSprinkles>(Box: BoxType<AtomsFn>) {
  type ResponsiveSpace = BoxProps<AtomsFn>["gap"];

  type ColumnProps = {
    children: Children;
    width?: OptionalResponsiveValue<keyof typeof desktopWidths>;
    sticky?: {
      top: BoxProps<AtomsFn>["top"];
    };
  };

  function Column({ children, width, sticky }: ColumnProps) {
    const { desktop, tablet, mobile } = width
      ? normalizeResponsiveValue(width)
      : { desktop: undefined, tablet: undefined, mobile: undefined };

    const className =
      width == null
        ? fullWidth
        : [
            desktop && desktopWidths[desktop],
            tablet && tabletWidths[tablet],
            mobile && mobileWidths[mobile],
          ];

    const stickyProps = sticky ? ({ position: "sticky", top: sticky.top } as const) : {};

    return (
      <Box className={className} {...stickyProps}>
        {children}
      </Box>
    );
  }

  type Props = {
    space: ResponsiveSpace;
    children: Children;
  } & CollapsibleAlignmentProps;

  function Columns({ space, children, align, alignY, collapseBelow, reverse }: Props) {
    return (
      <Box
        display="flex"
        gap={space}
        {...responsiveCollapsibleAlignmentProps({ align, alignY, collapseBelow, reverse })}
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
    return typeof child === "object" && "type" in child && child.type === Column;
  }

  return { Column, Columns };
}

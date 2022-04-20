import { Fragment, ReactChild, ReactElement } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { BoxType, BoxProps } from "../Box/createBentoBox";
import { Divider } from "../Divider/Divider";
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
    dividers?: boolean;
  } & CollapsibleAlignmentProps;

  function Columns({ space, children, align, alignY, collapseBelow, reverse, dividers }: Props) {
    return (
      <Box
        display="flex"
        gap={space}
        {...responsiveCollapsibleAlignmentProps({ align, alignY, collapseBelow, reverse })}
      >
        {flattenChildren(children).map((child, index) => {
          const column = isColumn(child) ? (
            child
          ) : (
            <Column key={childKey(child, index)}>{child as Children}</Column>
          );

          if (dividers && index > 0) {
            return (
              <Fragment key={childKey(child, index)}>
                <Divider orientation="vertical" />
                {column}
              </Fragment>
            );
          }
          return column;
        })}
      </Box>
    );
  }

  function isColumn(child: ReactChild): child is ReactElement<ColumnProps> {
    return typeof child === "object" && "type" in child && child.type === Column;
  }

  return { Column, Columns };
}

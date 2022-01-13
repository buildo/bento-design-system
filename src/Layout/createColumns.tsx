import { ComponentProps, ReactChild, ReactElement } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { BoxType } from "../Box/Box";
import { baseSprinkles } from "../sprinkles.css";
import { childKey } from "../util/childKey";
import { Children } from "../util/Children";
import {
  CollapsibleAlignmentProps,
  responsiveCollapsibleAlignmentProps,
} from "../util/collapsible";
import * as columnStyles from "./Column.css";

export function createColumns<AtomsFn extends typeof baseSprinkles>(Box: BoxType<AtomsFn>) {
  type BoxProps = ComponentProps<typeof Box>;

  type ResponsiveSpace = NonNullable<BoxProps["atoms"]>["gap"];

  type ColumnProps = {
    children: Children;
    width?: keyof typeof columnStyles.width | "content";
  };

  function Column(props: ColumnProps) {
    return (
      <Box
        className={
          props.width != null && props.width !== "content"
            ? columnStyles.width[props.width]
            : undefined
        }
        atoms={{
          width: props.width !== "content" ? "full" : undefined,
          flexShrink: props.width === "content" ? 0 : undefined,
        }}
      >
        {props.children}
      </Box>
    );
  }

  type Props = {
    space: ResponsiveSpace;
    children: Children;
  } & CollapsibleAlignmentProps;

  function Columns({ space, children, align, alignY, collapseBelow }: Props) {
    return (
      <Box
        atoms={{
          display: "flex",
          gap: space,
          ...responsiveCollapsibleAlignmentProps({ align, alignY, collapseBelow }),
        }}
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

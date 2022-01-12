import { ComponentProps, Fragment, ReactChild, ReactElement } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { Children } from "../util/Children";
import { createBentoBox } from "../Box/Box";
import { baseSprinkles } from "../sprinkles.css";
import {
  CollapsibleAlignmentProps,
  responsiveCollapsibleAlignmentProps,
} from "../util/collapsible";
import { alignToFlexAlign, ResponsiveAlign } from "../util/align";
import { childKey } from "../util/childKey";
import { Divider } from "../Divider/Divider";
import * as columnStyles from "./Column.css";

export function createLayoutComponents<AtomsFn extends typeof baseSprinkles>(sprinkles: AtomsFn) {
  const Box = createBentoBox(sprinkles);

  type BoxProps = ComponentProps<typeof Box>;

  type ResponsiveSpace = NonNullable<BoxProps["atoms"]>["gap"];

  type InlineProps = {
    space: ResponsiveSpace;
    children: Children;
  } & CollapsibleAlignmentProps &
    Pick<BoxProps, "as">;

  function Inline({ space, children, align, alignY, collapseBelow, ...boxProps }: InlineProps) {
    return (
      <Box
        {...boxProps}
        atoms={{
          display: "flex",
          flexWrap: "wrap",
          gap: space,
          ...responsiveCollapsibleAlignmentProps({
            align,
            alignY,
            collapseBelow,
          }),
        }}
      >
        {flattenChildren(children)}
      </Box>
    );
  }

  type StackProps = {
    space: ResponsiveSpace;
    children: Children;
    align?: ResponsiveAlign;
    dividers?: boolean;
  } & Pick<ComponentProps<typeof Box>, "as">;

  function Stack({ space, align, children, dividers, ...boxProps }: StackProps) {
    return (
      <Box
        {...boxProps}
        atoms={{
          display: "flex",
          flexDirection: "column",
          alignItems: alignToFlexAlign(align),
          gap: space,
        }}
      >
        {flattenChildren(children).map((child, index) => {
          if (dividers && index > 0) {
            return (
              <Fragment key={childKey(child, index)}>
                <Divider />
                {child}
              </Fragment>
            );
          } else return child;
        })}
      </Box>
    );
  }

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

  function Inset({ space, spaceX, spaceY, children }: InsetProps) {
    return <Box atoms={{ padding: space, paddingX: spaceX, paddingY: spaceY }}>{children}</Box>;
  }

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

  return {
    Inline,
    Stack,
    Inset,
    Column,
    Columns,
  };
}

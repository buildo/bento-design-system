import { CellProps, Column as Column_, Row as Row_ } from "react-table";
import { useDefaultMessages } from "../util/useDefaultMessages";
import {
  LocalizedString,
  Children,
  Body,
  IconProps,
  Box,
  IconButtonProps,
  BodyProps,
  ButtonProps,
  LabelProps,
} from "..";
import { Column } from "./types";
import {
  LinkCell,
  IconCell,
  LabelCell,
  TextCell,
  ButtonCell,
  ChipCell,
  ButtonLinkCell,
  TextWithIconCell,
  IconButtonCell,
} from "./cells";
import { ComponentProps } from "react";
import { useBentoConfig } from "../BentoConfigContext";

export type { CellProps } from "react-table";

export type ColumnOptionsBase<A> = {
  accessor: A;
  headerLabel?: LocalizedString;
  missingValue?: LocalizedString;
  width?: Column_<any>["gridWidth"];
} & Omit<Column_<any>, "accessor" | "Header" | "Cell" | "sortType" | "width" | "gridWidth">;

export function custom<A extends string, V, D extends Record<string, unknown>>({
  headerLabel,
  sortType,
  missingValue,
  width,
  footer,
  ...options
}: ColumnOptionsBase<A> & {
  Cell: (props: CellProps<D, V>) => Children;
  sortType?: (valueA: V | undefined, valueB: V | undefined) => number;
}): Column<A, D, V> {
  const column = {
    ...options,
    gridWidth: width,
    Cell: (props: CellProps<D, V>) => {
      const { defaultMessages } = useDefaultMessages();
      const config = useBentoConfig().table;
      if (props.value == null) {
        const value = missingValue ?? defaultMessages.Table.missingValue;
        return (
          <Box {...config.padding.defaultCell} textAlign={options.align}>
            <Body size={config.defaultCellOptions.defaultCell.size}>{value}</Body>
          </Box>
        );
      } else {
        return options.Cell(props);
      }
    },
    Header: headerLabel,
    Footer: footer,
  } as Column<A, D, V>;

  if (sortType) {
    // NOTE(gabro): react-table makes a distinction between a missing sortType (which makes it use the default)
    // and explicitly setting undefined (which causes an error).
    column.sortType = (rowA: Row_<D>, rowB: Row_<D>, columnId: string) =>
      rowA.isGrouped || rowB.isGrouped
        ? 0
        : sortType(rowA.original[columnId] as V, rowB.original[columnId] as V);
  }

  return column;
}

export function button<A extends string>({
  size,
  ...options
}: ColumnOptionsBase<A> & Partial<Pick<ButtonProps, "size">>) {
  return custom({
    ...options,
    Cell: (props: Omit<ComponentProps<typeof ButtonCell>, "options">) => (
      <ButtonCell {...{ ...props, options: { size } }} />
    ),
    sortType: (a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""),
  });
}

export function buttonLink<A extends string>({
  size,
  ...options
}: ColumnOptionsBase<A> & Partial<Pick<ButtonProps, "size">>) {
  return custom({
    ...options,
    Cell: (props: Omit<ComponentProps<typeof ButtonLinkCell>, "options">) => (
      <ButtonLinkCell {...{ ...props, options: { size } }} />
    ),
    sortType: (a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""),
  });
}

export function chip<A extends string>(options: ColumnOptionsBase<A>) {
  return custom({
    ...options,
    Cell: ChipCell,
    sortType: (a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""),
  });
}

export function text<A extends string>({
  size,
  weight,
  color,
  ...options
}: ColumnOptionsBase<A> & Partial<Pick<BodyProps, "size" | "weight" | "color">>) {
  return custom({
    ...options,
    Cell: (props: Omit<ComponentProps<typeof TextCell>, "options">) => (
      <TextCell {...{ ...props, options: { size, weight, color } }} />
    ),
  });
}

export function textWithIcon<A extends string>({
  iconPosition,
  iconSize,
  iconColor,
  size,
  weight,
  color,
  ...options
}: ColumnOptionsBase<A> & {
  iconPosition: "left" | "right";
  iconSize?: IconProps["size"];
  iconColor?: IconProps["color"];
} & Partial<Pick<BodyProps, "size" | "weight" | "color">>) {
  return custom({
    ...options,
    Cell: ({
      value: _value,
      ...props
    }: CellProps<
      any,
      {
        icon: ((props: IconProps) => Children) | null;
        text: LocalizedString;
        tooltipContent?: Children;
      }
    >) => {
      const value = { ..._value, iconPosition };
      const textWithIconCellProps = {
        ...props,
        value,
        cell: { ...props.cell, value },
        options: { size, weight, color },
      };
      return <TextWithIconCell {...textWithIconCellProps} />;
    },
    sortType: (a, b) => (a?.text ?? "").localeCompare(b?.text ?? ""),
  });
}

export function number<A extends string>({
  valueFormatter,
  size,
  weight,
  color,
  ...options
}: ColumnOptionsBase<A> & {
  valueFormatter: (n: number) => LocalizedString;
} & Partial<Pick<BodyProps, "size" | "weight" | "color">>) {
  return custom({
    ...options,
    Cell: ({ value: numericValue, ...props }: CellProps<any, number>) => {
      const value = valueFormatter(numericValue);
      const textCellProps = {
        ...props,
        value,
        cell: { ...props.cell, value },
        options: { size, weight, color },
      };
      return <TextCell {...textCellProps} />;
    },
    sortType: (a = 0, b = 0) => a - b,
  });
}

export function numberWithIcon<A extends string>({
  valueFormatter,
  size,
  weight,
  color,
  ...options
}: ColumnOptionsBase<A> & {
  valueFormatter: (n: number) => LocalizedString;
} & Partial<Pick<BodyProps, "size" | "weight" | "color">>) {
  return custom({
    ...options,
    Cell: ({
      value: { numericValue, icon, tooltipContent },
      ...props
    }: CellProps<
      any,
      {
        icon: ((props: IconProps) => Children) | null;
        numericValue: number;
        tooltipContent?: Children;
      }
    >) => {
      const value = {
        text: valueFormatter(numericValue),
        icon,
        iconPosition: "right" as const,
        tooltipContent,
      };
      const textCellProps = {
        ...props,
        value,
        cell: { ...props.cell, value },
        options: {
          size,
          weight,
          color,
        },
      };
      return <TextWithIconCell {...textCellProps} />;
    },
    sortType: (a, b) => (a?.numericValue || 0) - (b?.numericValue || 0),
  });
}

export function label<A extends string>({
  size,
  color,
  ...options
}: ColumnOptionsBase<A> & Partial<Pick<LabelProps, "size" | "color">>) {
  return custom({
    ...options,
    Cell: (props: Omit<ComponentProps<typeof TextCell>, "options">) => (
      <LabelCell {...{ ...props, options: { size, color } }} />
    ),
  });
}

export function link<A extends string>({
  size,
  weight,
  ...options
}: ColumnOptionsBase<A> & Partial<Pick<BodyProps, "size" | "weight">>) {
  return custom({
    ...options,
    Cell: (props: Omit<ComponentProps<typeof LinkCell>, "options">) => (
      <LinkCell {...{ ...props, options: { size, weight } }} />
    ),
    sortType: (a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""),
  });
}

export function icon<A extends string>({
  size,
  color,
  ...options
}: ColumnOptionsBase<A> & Partial<Pick<IconProps, "size" | "color">>) {
  return custom({
    ...options,
    Cell: (props: Omit<ComponentProps<typeof IconCell>, "options">) => (
      <IconCell {...{ ...props, options: { size, color } }} />
    ),
    sortType: (a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""),
  });
}

export function iconButton<A extends string>({
  size,
  kind,
  hierarchy,
  ...options
}: ColumnOptionsBase<A> & Partial<Pick<IconButtonProps, "size" | "kind" | "hierarchy">>) {
  return custom({
    ...options,
    Cell: (props: Omit<ComponentProps<typeof IconButtonCell>, "options">) => (
      <IconButtonCell {...{ ...props, options: { size, kind, hierarchy } }} />
    ),
    sortType: (a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""),
  });
}

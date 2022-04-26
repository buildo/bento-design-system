import { CellProps, Column as Column_, Row as Row_ } from "react-table";
import { useDefaultMessages } from "../util/useDefaultMessages";
import { LocalizedString, Children, Body, ButtonProps, ChipProps, IconProps } from "..";
import { Box } from "../internal";
import { Column } from "./types";
import { FunctionComponent } from "react";
import { ButtonLinkProps } from "../Button/ButtonLink";
import {
  createButtonCell,
  createButtonLinkCell,
  createChipCell,
  createIconButtonCell,
  LinkCell,
  IconCell,
  LabelCell,
  TextCell,
  TextWithIconCell,
} from "./cells";
import { IconButtonProps } from "../IconButton/createIconButton";

export type { CellProps } from "react-table";

export type ColumnOptionsBase<A> = {
  accessor: A;
  headerLabel?: LocalizedString;
  missingValue?: LocalizedString;
  width?: Column_<{}>["gridWidth"];
} & Omit<Column_<{}>, "accessor" | "Header" | "Cell" | "sortType" | "width" | "gridWidth">;

export function column<A extends string, V, D extends Record<string, unknown>>({
  headerLabel,
  sortType,
  missingValue,
  width,
  ...options
}: ColumnOptionsBase<A> & {
  Cell: (props: CellProps<D, V>) => Children;
  sortType?: (valueA: V | undefined, valueB: V | undefined) => number;
}): Column<A, D, V> {
  const column = {
    ...options,
    gridWidth: width,
    Cell: (props) => {
      const { defaultMessages } = useDefaultMessages();
      if (props.value == null) {
        const value = missingValue ?? defaultMessages.Table.missingValue;
        return (
          <Box padding={16} textAlign={options.align}>
            <Body size="medium">{value}</Body>
          </Box>
        );
      } else {
        return options.Cell(props);
      }
    },
    Header: headerLabel,
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

export function createButtonColumn(Button: FunctionComponent<ButtonProps>) {
  const ButtonCell = createButtonCell(Button);
  return function buttonColumn<A extends string>(options: ColumnOptionsBase<A>) {
    return column({
      ...options,
      Cell: ButtonCell,
      sortType: (a, b) => String(a?.label ?? "").localeCompare(String(b?.label ?? "")),
    });
  };
}

export function createButtonLinkColumn(ButtonLink: FunctionComponent<ButtonLinkProps>) {
  const ButtonLinkCell = createButtonLinkCell(ButtonLink);
  return function buttonLinkColumn<A extends string>(options: ColumnOptionsBase<A>) {
    return column({
      ...options,
      Cell: ButtonLinkCell,
      sortType: (a, b) => String(a?.label ?? "").localeCompare(String(b?.label ?? "")),
    });
  };
}

export function createChipColumn<CustomColor extends string>(
  Chip: FunctionComponent<ChipProps<CustomColor>>
) {
  const ChipCell = createChipCell(Chip);
  return function chipColumn<A extends string>(options: ColumnOptionsBase<A>) {
    return column({
      ...options,
      Cell: ChipCell,
      sortType: (a, b) => String(a?.label ?? "").localeCompare(String(b?.label ?? "")),
    });
  };
}

export function textColumn<A extends string>(options: ColumnOptionsBase<A>) {
  return column({
    ...options,
    Cell: TextCell,
  });
}

export function textWithIconColumn<A extends string>({
  iconPosition,
  ...options
}: ColumnOptionsBase<A> & {
  iconPosition: "left" | "right";
}) {
  return column({
    ...options,
    Cell: ({
      value: _value,
      ...props
    }: CellProps<
      {},
      {
        icon: FunctionComponent<IconProps> | null;
        text: LocalizedString;
      }
    >) => {
      const value = { ..._value, iconPosition };
      const textWithIconCellProps = {
        ...props,
        value,
        cell: { ...props.cell, value },
      };
      return <TextWithIconCell {...textWithIconCellProps} />;
    },
    sortType: (a, b) => String(a?.text ?? "").localeCompare(String(b?.text ?? "")),
  });
}

export function numberColumn<A extends string>({
  valueFormatter,
  ...options
}: ColumnOptionsBase<A> & {
  valueFormatter: (n: number) => LocalizedString;
}) {
  return column({
    ...options,
    Cell: ({ value: numericValue, ...props }: CellProps<{}, number>) => {
      const value = valueFormatter(numericValue);
      const textCellProps = {
        ...props,
        value,
        cell: { ...props.cell, value },
      };
      return <TextCell {...textCellProps} />;
    },
    sortType: (a = 0, b = 0) => a - b,
  });
}

export function numberWithIconColumn<A extends string>({
  valueFormatter,
  ...options
}: ColumnOptionsBase<A> & {
  valueFormatter: (n: number) => LocalizedString;
}) {
  return column({
    ...options,
    Cell: ({
      value: { numericValue, icon },
      ...props
    }: CellProps<
      {},
      {
        icon: FunctionComponent<IconProps> | null;
        numericValue: number;
      }
    >) => {
      const value = { text: valueFormatter(numericValue), icon, iconPosition: "right" as const };
      const textCellProps = {
        ...props,
        value,
        cell: { ...props.cell, value },
      };
      return <TextWithIconCell {...textCellProps} />;
    },
    sortType: (a, b) => (a?.numericValue || 0) - (b?.numericValue || 0),
  });
}

export function labelColumn<A extends string>(options: ColumnOptionsBase<A>) {
  return column({
    ...options,
    Cell: LabelCell,
  });
}

export function linkColumn<A extends string>(options: ColumnOptionsBase<A>) {
  return column({
    ...options,
    Cell: LinkCell,
    sortType: (a, b) => String(a?.label ?? "").localeCompare(String(b?.label ?? "")),
  });
}

export function iconColumn<A extends string>(options: ColumnOptionsBase<A>) {
  return column({
    ...options,
    Cell: IconCell,
    sortType: (a, b) => String(a?.label ?? "").localeCompare(String(b?.label ?? "")),
  });
}

export function createIconButtonColumn(IconButton: FunctionComponent<IconButtonProps>) {
  const IconButtonCell = createIconButtonCell(IconButton);
  return function buttonColumn<A extends string>(options: ColumnOptionsBase<A>) {
    return column({
      ...options,
      Cell: IconButtonCell,
      sortType: (a, b) => String(a?.label ?? "").localeCompare(String(b?.label ?? "")),
    });
  };
}

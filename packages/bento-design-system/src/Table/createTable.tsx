import {
  useTable,
  TableCellProps,
  useSortBy,
  ColumnInstance,
  Row,
  SortByFn,
  useGridLayout,
  useGroupBy,
  Cell,
  SortingRule,
} from "react-table";
import { IconProps } from "../Icons/IconProps";
import { useDefaultMessages } from "../util/useDefaultMessages";
import {
  Children,
  Label,
  LocalizedString,
  IconChevronDown,
  IconChevronUp,
  IconMinus,
  TooltipProps,
  ButtonProps,
  ChipProps,
  FeedbackProps,
} from "..";
import { Box, Column, Columns } from "../internal";
import {
  cellContainerRecipe,
  columnHeader,
  lastLeftStickyColumn,
  sectionHeader,
  sectionHeaderContainer,
} from "./Table.css";
import { Column as ColumnType, Row as RowType } from "./types";
import {
  useLayoutEffect,
  useMemo,
  useState,
  CSSProperties,
  FunctionComponent,
  useEffect,
} from "react";
import {
  column,
  createButtonColumn,
  createButtonLinkColumn,
  createChipColumn,
  createIconButtonColumn,
  linkColumn,
  iconColumn,
  labelColumn,
  numberColumn,
  numberWithIconColumn,
  textColumn,
  textWithIconColumn,
} from "./tableColumn";
import { ButtonLinkProps } from "../Button/ButtonLink";
import { IconButtonProps } from "../IconButton/createIconButton";
import { TableConfig } from "./Config";
import { IconHelp, IconInfo } from "../Icons";

type SortFn<C extends ReadonlyArray<ColumnType<string, {}, any>>> = (
  a: Row<RowType<C>>,
  b: Row<RowType<C>>
) => number;

type SortingProps<C extends ReadonlyArray<ColumnType<string, {}, any>>> =
  | {
      /** This function must be memoized to avoid infinite re-renderings */
      customSorting?: never;
      /** This function must be memoized to avoid infinite re-renderings */
      onSort?: (sortBy: Array<SortingRule<C>>) => void;
    }
  | {
      customSorting: (rows: Row<RowType<C>>[], sortFns: SortFn<C>[]) => Row<RowType<C>>[];
      onSort?: never;
    };

type Props<C extends ReadonlyArray<ColumnType<string, {}, any>>> = {
  columns: C;
  data: ReadonlyArray<RowType<C>>;
  groupBy?: C[number]["accessor"];
  noResultsTitle?: LocalizedString;
  noResultsDescription?: LocalizedString;
  initialSorting?: Array<SortingRule<C>>;
} & SortingProps<C>;

/**
 * A component that renders a Table, with sorting capabilities
 *
 * Columns can be built using the `tableColumn` helper, which provides a type-safe API as well as
 * default implementations for commonly used columns.
 *
 * Also, when building the data to pass to the table, it's recommended to define `columns` as a
 * const, as opposed to inline, in order to get better type inference, e.g.:
 *
 * ```tsx
 * // Best
 * const columns = [tableColumn(...), tableColumn(...)] as const
 *
 * <Table columns={columns} data={data} />
 *
 * // Ok, but worse type inference
 * <Table columns={[tableColumn(...), tableColumn(...)]} data={data} />
 * ```
 */
export function createTable(
  config: TableConfig,
  {
    Tooltip,
    Feedback,
    IconButton,
  }: {
    Tooltip: FunctionComponent<TooltipProps>;
    Feedback: FunctionComponent<FeedbackProps>;
    IconButton: FunctionComponent<IconButtonProps>;
  }
) {
  return function Table<C extends ReadonlyArray<ColumnType<string, {}, any>>>({
    columns,
    data,
    groupBy,
    noResultsTitle,
    noResultsDescription,
    customSorting,
    onSort,
    initialSorting,
  }: Props<C>) {
    const customOrderByFn = useMemo(
      () =>
        customSorting
          ? (
              rows: Row<RowType<C>>[],
              sortFns: SortByFn<RowType<C>>[],
              directions: boolean[]
            ): Row<RowType<C>>[] => {
              return customSorting(
                rows,
                sortFns.map((s, i) => {
                  return (a: Row<RowType<C>>, b: Row<RowType<C>>) => {
                    /**
                     * NOTE: we use a blank string for the columnId, since it's unused internally
                     * See: https://github.com/TanStack/react-table/blob/76a4a861ee56b782404ef91987c3b5691ecf2ebc/src/plugin-hooks/useSortBy.js#L385
                     */
                    return s(a, b, "", directions[i]) * (!directions[i] ? -1 : 1);
                  };
                })
              );
            }
          : undefined,
      [customSorting]
    );

    const {
      getTableProps,
      headerGroups,
      rows,
      prepareRow,
      state: { sortBy },
    } = useTable(
      {
        columns,
        data,
        initialState: {
          sortBy: initialSorting ?? [],
          groupBy: groupBy ? [groupBy] : [],
          hiddenColumns: groupBy ? [groupBy] : [],
        },
        orderByFn: customOrderByFn,
        manualSortBy: Boolean(onSort),
      },
      useGridLayout,
      useGroupBy,
      useSortBy
    );

    const { defaultMessages } = useDefaultMessages();

    useEffect(() => {
      onSort && onSort(sortBy);
    }, [onSort, sortBy]);

    // Determine the ids of the sticky columns to the left
    const stickyLeftColumnsIds = useMemo(
      () =>
        columns
          .filter((c) => c.sticky === "left")
          .map((c) => headerGroups[0].headers.find((h) => h.id === c.accessor)?.id)
          .filter((id): id is string => id !== undefined),
      [columns, headerGroups]
    );

    // Determine the id of the last left sticky column (used to draw a visual separator in the UI)
    const lastStickyColumnIndex = columns
      .map((c) => c.accessor)
      .indexOf(stickyLeftColumnsIds[stickyLeftColumnsIds.length - 1]);

    // Keep a style object for each sticky column, which will be updated by the useLayoutEffect below
    const [stickyLeftColumnStyle, setStickyLeftColumnStyle] = useState(
      {} as Record<string, CSSProperties>
    );

    /** Get the width of each sticky column (using the header width as reference) and use it to set the `left` of each sticky column.
     *  Each sticky column must have as `left` the total width of the previous sticky columns.
     */
    useLayoutEffect(() => {
      // Make this computation only if we have any data, because headers are not rendered when there are no rows
      // and we need them to get the column width.
      if (data.length > 0) {
        const columnWidths = stickyLeftColumnsIds.map(
          (id) => document.getElementById(`header-cell-${id}`)!.clientWidth
        );

        const columnStyles = stickyLeftColumnsIds.reduce((styles, id, index) => {
          if (index > 0) {
            const totalLeftWidth = columnWidths
              .filter((_w, i) => i < index)
              .reduce((acc, w) => acc + w, 0);
            return {
              ...styles,
              [id]: { left: totalLeftWidth, zIndex: 1, position: "sticky" } as CSSProperties,
            };
          } else {
            return { ...styles, [id]: { left: 0, zIndex: 1, position: "sticky" } as CSSProperties };
          }
        }, {} as Record<string, CSSProperties>);

        setStickyLeftColumnStyle(columnStyles);
      }
    }, [data.length, stickyLeftColumnsIds]);

    if (data.length === 0) {
      return (
        <Box display="flex" paddingTop={80} justifyContent="center">
          <Feedback
            size="large"
            illustration={config.emptyIllustration}
            background
            title={noResultsTitle ?? defaultMessages.Table.noResultsTitle}
            description={noResultsDescription ?? defaultMessages.Table.noResultsDescription}
          />
        </Box>
      );
    }

    function gridWidthStyle(gridWidth: "fit-content" | "fill-available"): string {
      switch (gridWidth) {
        case "fit-content":
          return "max-content";
        case "fill-available":
          return "minmax(max-content, auto)";
      }
    }

    const gridTemplateColumns = columns
      .filter(({ accessor }) => accessor !== groupBy)
      .map(({ gridWidth = "fit-content" }) => gridWidthStyle(gridWidth))
      .join(" ");

    function renderCells<D extends Record<string, unknown>>(
      cells: Array<Cell<D>>,
      rowIndex: number
    ) {
      return cells.map((cell, index) => (
        <CellContainer
          {...cell.getCellProps()}
          index={rowIndex}
          lastLeftSticky={index === lastStickyColumnIndex}
          style={stickyLeftColumnStyle[cell.column.id]}
        >
          {cell.render("Cell")}
        </CellContainer>
      ));
    }

    return (
      <Box
        {...getTableProps()}
        alignItems="stretch"
        overflow="auto"
        style={{ ...getTableProps().style, gridTemplateColumns }}
      >
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column, index) => (
            <ColumnHeader
              column={column}
              key={column.id}
              style={stickyLeftColumnStyle[column.id]}
              lastLeftSticky={index === lastStickyColumnIndex}
            />
          ))
        )}

        {rows.flatMap((row, index) => {
          if (row.isGrouped) {
            return [
              <SectionHeader
                key={row.groupByVal}
                label={row.groupByVal}
                numberOfStickyColumns={stickyLeftColumnsIds.length}
              />,
              ...row.leafRows.map((row, index) => {
                prepareRow(row);
                return renderCells(row.cells, index);
              }),
            ];
          } else {
            prepareRow(row);
            return [renderCells(row.cells, index)];
          }
        })}
      </Box>
    );
  };

  function ColumnHeader<D extends Record<string, unknown>>({
    column,
    style,
    lastLeftSticky,
  }: {
    column: ColumnInstance<D>;
    style: CSSProperties;
    lastLeftSticky: boolean;
  }) {
    const sortIcon = ((): ((props: IconProps) => Children) | null => {
      if (!column.canSort) {
        return null;
      }
      if (column.isSorted) {
        if (column.isSortedDesc) {
          return IconChevronDown;
        } else {
          return IconChevronUp;
        }
      } else {
        return IconMinus;
      }
    })();

    const hint = column.hint ? (
      typeof column.hint === "object" ? (
        <IconButton
          icon={IconHelp}
          onPress={column.hint.onPress}
          kind="transparent"
          hierarchy="primary"
          label=""
          size={16}
        />
      ) : (
        <Tooltip
          trigger={(ref, props) => (
            <Box as="div" display="inline-block" ref={ref} {...props}>
              <IconInfo size={12} color="default" />
            </Box>
          )}
          content={column.hint}
        />
      )
    ) : null;

    return (
      <Box className={lastLeftSticky && lastLeftStickyColumn} style={style}>
        <Box
          className={columnHeader}
          {...column.getHeaderProps(column.getSortByToggleProps())}
          textAlign={column.align}
        >
          <Columns space={8} alignY="center" align={column.align}>
            {column.Header ? (
              <Column width="content">
                <Label size="large">{column.render("Header") as any}</Label>
              </Column>
            ) : null}
            {hint && <Column width="content">{hint}</Column>}
            {sortIcon && <Column width="content">{sortIcon({ size: 8 })}</Column>}
          </Columns>
        </Box>
      </Box>
    );
  }

  function SectionHeader({
    label,
    numberOfStickyColumns,
  }: {
    label: LocalizedString;
    numberOfStickyColumns: number;
  }) {
    const sectionHeaderContent = (
      <Box className={sectionHeader}>
        <Label as="span" size="small" color="primary">
          {label}
        </Label>
      </Box>
    );

    // If there are no sticky columns, we can have the section header content span the entire width
    // i.e. 1 / -1 in css grid terms.
    // If there are sticky columns, we split the header in two:
    // - one sticky part that spans the sticky columns and contains the header label
    // - one other part that scrolls

    return (
      <>
        <Box
          className={sectionHeaderContainer}
          style={{
            gridColumn: `1 / ${numberOfStickyColumns > 0 ? numberOfStickyColumns + 1 : -1}`,
          }}
        >
          <Box style={{ marginRight: 8 }} background="backgroundInteractiveOverlay">
            {sectionHeaderContent}
          </Box>
        </Box>
        {numberOfStickyColumns > 0 && (
          <Box
            background="backgroundInteractiveOverlay"
            style={{
              gridColumn: `${numberOfStickyColumns + 1} / -1`,
            }}
          />
        )}
      </>
    );
  }

  function CellContainer({
    children,
    index,
    style,
    lastLeftSticky,
    ...props
  }: {
    children: any;
    index: number;
    style: CSSProperties;
    lastLeftSticky: boolean;
  } & TableCellProps) {
    return (
      <Box className={lastLeftSticky && lastLeftStickyColumn} style={style}>
        <Box className={cellContainerRecipe({ even: index % 2 === 0 })} {...props}>
          {children}
        </Box>
      </Box>
    );
  }
}

export function createTableColumns<CustomChipColor extends string>({
  Button,
  ButtonLink,
  IconButton,
  Chip,
}: {
  Button: FunctionComponent<ButtonProps>;
  ButtonLink: FunctionComponent<ButtonLinkProps>;
  Chip: FunctionComponent<ChipProps<CustomChipColor>>;
  IconButton: FunctionComponent<IconButtonProps>;
}) {
  const buttonColumn = createButtonColumn(Button);
  const buttonLinkColumn = createButtonLinkColumn(ButtonLink);
  const chipColumn = createChipColumn(Chip);
  const iconButtonColumn = createIconButtonColumn(IconButton);
  return {
    custom: column,
    text: textColumn,
    textWithIcon: textWithIconColumn,
    number: numberColumn,
    numberWithIcon: numberWithIconColumn,
    button: buttonColumn,
    buttonLink: buttonLinkColumn,
    iconButton: iconButtonColumn,
    chip: chipColumn,
    label: labelColumn,
    link: linkColumn,
    icon: iconColumn,
  };
}

export type {
  CellProps as TableCellProps,
  Column as TableColumn,
  Row as TableRow,
} from "react-table";

export type { Column, Row } from "./types";

export type { ColumnOptionsBase } from "./tableColumn";
export type { Props as TableProps };

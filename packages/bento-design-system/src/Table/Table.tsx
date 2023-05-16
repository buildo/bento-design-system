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
  Box,
  Column,
  Columns,
  Feedback,
  IconButton,
  Tooltip,
  FeedbackProps,
  vars,
} from "..";
import {
  cellContainerRecipe,
  columnHeader,
  lastLeftStickyColumn,
  rowContainer,
  sectionHeader,
  sectionHeaderContainer,
  selectedRowBackgroundColor,
  sortIconContainer,
  stickyColumnHeader,
  table,
} from "./Table.css";
import { Column as ColumnType, GridWidth, Row as RowType } from "./types";
import { useLayoutEffect, useMemo, useState, CSSProperties, useEffect } from "react";
import { IconQuestionSolid, IconInfo } from "../Icons";
import { match, __ } from "ts-pattern";
import { useBentoConfig } from "../BentoConfigContext";
import { assignInlineVars } from "@vanilla-extract/dynamic";

type SortFn<C extends ReadonlyArray<ColumnType<string, {}, any>>> = (
  a: Row<RowType<C>>,
  b: Row<RowType<C>>
) => number;

type SortingProps<C extends ReadonlyArray<ColumnType<string, {}, any>>> =
  | {
      /**
       * `customSorting` can be used to customize the sorting logic of the table. It supports cross-columns comparison.
       *
       * The sorting is still performed by the table, in an uncontrolled fashion.
       *
       * This function must be memoized to avoid infinite re-renderings */
      customSorting?: never;
      /**
       * `onSort` can be used to implement sorting in a controlled fashion. It's typical use case is when sorting and/or filtering is performed externally, for example by a backend service.
       *
       * If `onSort` is provided the table won't perform any sorting on the rows given in input via the `data` property, as the caller is now in charge of performing the sorting.
       *
       * This function must be memoized to avoid infinite re-renderings */
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
  noResultsFeedbackSize?: FeedbackProps["size"];
  initialSorting?: Array<SortingRule<C>>;
  stickyHeaders?: boolean;
  height?: { custom: string | number };
  onRowPress?: (row: Row<RowType<C>>) => void;
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
export function Table<C extends ReadonlyArray<ColumnType<string, {}, any>>>({
  columns,
  data,
  groupBy,
  noResultsTitle,
  noResultsDescription,
  noResultsFeedbackSize = "large",
  customSorting,
  onSort,
  initialSorting,
  stickyHeaders,
  height,
  onRowPress,
}: Props<C>) {
  const config = useBentoConfig().table;
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
      autoResetSortBy: false,
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
            [id]: {
              left: totalLeftWidth,
              zIndex: zIndexes.leftStickyCell,
              position: "sticky",
            } as CSSProperties,
          };
        } else {
          return {
            ...styles,
            [id]: {
              left: 0,
              zIndex: zIndexes.leftStickyCell,
              position: "sticky",
            } as CSSProperties,
          };
        }
      }, {} as Record<string, CSSProperties>);

      setStickyLeftColumnStyle(columnStyles);
    }
  }, [data.length, stickyLeftColumnsIds]);

  if (data.length === 0) {
    return (
      <Box
        display="flex"
        paddingTop={match(noResultsFeedbackSize)
          .with("large", () => 80 as const)
          .with("medium", () => 24 as const)
          .exhaustive()}
        justifyContent="center"
      >
        <Feedback
          size={noResultsFeedbackSize}
          illustration={config.emptyIllustration}
          background
          title={noResultsTitle ?? defaultMessages.Table.noResultsTitle}
          description={noResultsDescription ?? defaultMessages.Table.noResultsDescription}
        />
      </Box>
    );
  }

  function gridWidthStyle(gridWidth: GridWidth): string {
    return match(gridWidth)
      .with("fit-content", () => "max-content")
      .with("fill-available", () => "minmax(max-content, auto)")
      .with({ custom: __.string }, ({ custom: width }) => width)
      .with({ custom: __.number }, ({ custom: width }) => `${width}px`)
      .exhaustive();
  }

  function tableHeight(height: Props<C>["height"]): string | undefined {
    return match(height)
      .with({ custom: __.string }, ({ custom: width }) => width)
      .with({ custom: __.number }, ({ custom: width }) => `${width}px`)
      .with(__.nullish, () => undefined)
      .exhaustive();
  }

  const gridTemplateColumns = columns
    .filter(({ accessor }) => accessor !== groupBy)
    .map(({ gridWidth = "fit-content" }) => gridWidthStyle(gridWidth))
    .join(" ");

  function renderCells<D extends Record<string, unknown>>(
    cells: Array<Cell<D>>,
    rowIndex: number,
    interactiveRow: boolean
  ) {
    return cells.map((cell, index) => (
      <CellContainer
        {...cell.getCellProps()}
        index={rowIndex}
        lastLeftSticky={index === lastStickyColumnIndex}
        style={stickyLeftColumnStyle[cell.column.id]}
        first={index === 0}
        last={(index + 1) % columns.length === 0}
        interactiveRow={interactiveRow}
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
      className={table}
      style={{ ...getTableProps().style, gridTemplateColumns, height: tableHeight(height) }}
    >
      {headerGroups.map((headerGroup) =>
        headerGroup.headers.map((column, index) => (
          <ColumnHeader
            column={column}
            key={column.id}
            style={stickyLeftColumnStyle[column.id]}
            lastLeftSticky={index === lastStickyColumnIndex}
            stickyHeaders={stickyHeaders}
            sticky={stickyLeftColumnsIds.includes(column.id)}
            first={index === 0}
            last={index + 1 === columns.length}
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
              return renderCells(row.cells, index, false);
            }),
          ];
        } else {
          prepareRow(row);
          return (
            <RowContainer key={index} row={row} onPress={onRowPress}>
              {renderCells(row.cells, index, onRowPress !== undefined)}
            </RowContainer>
          );
        }
      })}
    </Box>
  );
}

function RowContainer<C extends ReadonlyArray<ColumnType<string, {}, any>>>({
  row,
  children,
  onPress,
}: {
  row: Row<RowType<C>>;
  onPress: ((row: Row<RowType<C>>) => void) | undefined;
  children: Children;
}) {
  const config = useBentoConfig().table;
  return (
    <Box
      className={rowContainer}
      style={assignInlineVars({
        [selectedRowBackgroundColor]: vars.backgroundColor[config.selectedRowBackgroundColor],
      })}
      onClick={() => onPress?.(row)}
    >
      {children}
    </Box>
  );
}

function ColumnHeader<D extends Record<string, unknown>>({
  column,
  style,
  lastLeftSticky,
  stickyHeaders,
  sticky,
  first,
  last,
}: {
  column: ColumnInstance<D>;
  style: CSSProperties;
  lastLeftSticky: boolean;
  stickyHeaders?: boolean;
  sticky: boolean;
  first: boolean;
  last: boolean;
}) {
  const config = useBentoConfig().table;

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
        icon={IconQuestionSolid}
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
            <IconInfo size={12} color="currentColor" />
          </Box>
        )}
        content={column.hint}
        placement={config.hintPlacement}
      />
    )
  ) : null;

  const hasHeaderContent = column.Header || hint || sortIcon;

  return (
    <Box
      className={[lastLeftSticky && lastLeftStickyColumn, stickyHeaders && stickyColumnHeader]}
      style={{ ...style, zIndex: sticky ? zIndexes.leftStickyHeader : zIndexes.header }}
    >
      <Box
        className={columnHeader}
        background={config.headerBackgroundColor}
        color={config.headerForegroundColor}
        {...column.getHeaderProps(column.getSortByToggleProps())}
        textAlign={column.align}
        {...config.padding.header}
      >
        <Box
          paddingLeft={first ? config.boundaryPadding : undefined}
          paddingRight={last ? config.boundaryPadding : undefined}
        >
          {hasHeaderContent && (
            <Columns space={8} alignY="center" align={column.align}>
              {column.Header ? (
                <Column width="content">
                  <Label size="large">{column.render("Header") as any}</Label>
                </Column>
              ) : null}
              {hint && <Column width="content">{hint}</Column>}
              {sortIcon && (
                <Column width="content">
                  <Box className={sortIconContainer}>
                    {sortIcon({ size: 8, color: "currentColor" })}
                  </Box>
                </Column>
              )}
            </Columns>
          )}
        </Box>
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
  first,
  last,
  interactiveRow,
  ...props
}: {
  children: any;
  index: number;
  style: CSSProperties;
  lastLeftSticky: boolean;
  first: boolean;
  last: boolean;
  interactiveRow: boolean;
} & TableCellProps) {
  const tableConfig = useBentoConfig().table;

  return (
    <Box className={lastLeftSticky && lastLeftStickyColumn} style={style}>
      <Box
        background={index % 2 === 0 ? tableConfig.evenRowsBackgroundColor : "backgroundPrimary"}
        className={cellContainerRecipe({ interactiveRow })}
        paddingLeft={first ? tableConfig.boundaryPadding : undefined}
        paddingRight={last ? tableConfig.boundaryPadding : undefined}
        {...props}
      >
        {children}
      </Box>
    </Box>
  );
}

export * as tableColumn from "./tableColumn";

export type {
  CellProps as TableCellProps,
  Column as TableColumn,
  Row as TableRow,
} from "react-table";

export type { Column as ColumnType, Row as RowType } from "./types";

export type { ColumnOptionsBase } from "./tableColumn";
export type { Props as TableProps };

const zIndexes = {
  header: 1,
  leftStickyCell: 2,
  leftStickyHeader: 3,
};

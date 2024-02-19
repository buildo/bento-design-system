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
  HeaderGroup,
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
  cellColumnDivider,
  cellContainerRecipe,
  columnFooter,
  columnHeader,
  lastLeftStickyColumn,
  rowContainer,
  sectionHeader,
  sectionHeaderContainer,
  selectedRowBackgroundColor,
  sortIconContainer,
  stickyColumnFooter,
  stickyColumnHeader,
  stickyTopHeight,
  table,
} from "./Table.css";
import {
  Column as SimpleColumnType,
  GroupedColumn as GroupedColumnType,
  GridWidth,
  Row as RowType,
} from "./types";
import { useLayoutEffect, useMemo, useState, CSSProperties, useEffect, useRef } from "react";
import { IconQuestionSolid, IconInfo } from "../Icons";
import { match, __ } from "ts-pattern";
import { useBentoConfig } from "../BentoConfigContext";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useVirtualizer } from "@tanstack/react-virtual";

type SortFn<
  C extends
    | ReadonlyArray<SimpleColumnType<string, any, any>>
    | ReadonlyArray<GroupedColumnType<string, any, any>>
> = (a: Row<RowType<C>>, b: Row<RowType<C>>) => number;

type SortingProps<
  C extends
    | ReadonlyArray<SimpleColumnType<string, any, any>>
    | ReadonlyArray<GroupedColumnType<string, any, any>>
> =
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

type Props<
  C extends
    | ReadonlyArray<SimpleColumnType<string, any, any>>
    | ReadonlyArray<GroupedColumnType<string, any, any>>
> = {
  columns: C;
  data: ReadonlyArray<RowType<C>>;
  groupBy?: C extends ReadonlyArray<SimpleColumnType<string, any, any>>
    ? C[number]["accessor"]
    : C extends ReadonlyArray<GroupedColumnType<string, any, any>>
    ? C[number]["columns"][number]["accessor"]
    : never;
  noResultsTitle?: LocalizedString;
  noResultsDescription?: LocalizedString;
  noResultsFeedbackSize?: FeedbackProps["size"];
  initialSorting?: Array<SortingRule<C>>;
  stickyHeaders?: boolean;
  stickyFooters?: boolean;
  height?: { custom: string | number };
  onRowPress?: (row: Row<RowType<C>>) => void;
  virtualizeRows?: boolean | { estimateRowHeight: (index: number) => number };
  columnDividers?: boolean;
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
export function Table<
  C extends
    | ReadonlyArray<SimpleColumnType<string, any, any>>
    | ReadonlyArray<GroupedColumnType<string, any, any>>
>({
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
  stickyFooters = true,
  height,
  onRowPress,
  virtualizeRows: virtualizeRowsConfig,
  columnDividers,
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

  const flatColumns = useMemo(
    () => columns.flatMap((c) => ("columns" in c ? c.columns : [c])),
    [columns]
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
      headerGroups[0].headers
        .filter((h) => h.sticky)
        .flatMap((h) => h.columns ?? [h])
        .map((h) => h.id),
    [headerGroups]
  );
  const stickyLeftColumnGroupsIds = useMemo(
    () => headerGroups[0].headers.filter((h) => h.sticky).map((h) => h.id),
    [headerGroups]
  );

  // Determine the id of the last left sticky column (used to draw a visual separator in the UI)
  const lastStickyColumnIndex = flatColumns
    .map((c) => c.id ?? c.accessor)
    .indexOf(stickyLeftColumnsIds[stickyLeftColumnsIds.length - 1]);

  // Keep a style object for each sticky column, which will be updated by the useLayoutEffect below
  const [stickyLeftColumnStyle, setStickyLeftColumnStyle] = useState(
    {} as Record<string, CSSProperties>
  );

  // Keep a state for the height of the first row of headers, which will be updated by the useLayoutEffect below
  const [stickyHeaderHeight, setStickyHeaderHeight] = useState(0);

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const getHeaderById = (id: string) =>
    // Search header only inside the table container, to avoid selecting headers from other tables
    tableContainerRef.current!.querySelector(`[id='header-cell-${id}']`);

  /** Get the width of each sticky column (using the header width as reference) and use it to set the `left` of each sticky column.
   *  Each sticky column must have as `left` the total width of the previous sticky columns.
   */
  useLayoutEffect(() => {
    // Make this computation only if we have any data, because headers are not rendered when there are no rows
    // and we need them to get the column width.
    if (data.length > 0) {
      const columnWidths = stickyLeftColumnsIds.map((id) => getHeaderById(id)!.clientWidth);
      const columnGroupWidths = stickyLeftColumnGroupsIds.map(
        (id) => getHeaderById(id)!.clientWidth
      );
      const columnGroupHeight = Math.max(
        ...headerGroups[0].headers.map((h) => (h.columns ? getHeaderById(h.id)!.clientHeight : 0))
      );

      const styleReducer =
        (widths: number[]) =>
        (styles: Record<string, CSSProperties>, id: string, index: number) => {
          if (index > 0) {
            const totalLeftWidth = widths
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
        };

      const columnStyles = stickyLeftColumnsIds.reduce(
        styleReducer(columnWidths),
        {} as Record<string, CSSProperties>
      );
      const columnGroupStyles = stickyLeftColumnGroupsIds.reduce(
        styleReducer(columnGroupWidths),
        {} as Record<string, CSSProperties>
      );

      setStickyLeftColumnStyle({ ...columnStyles, ...columnGroupStyles });
      setStickyHeaderHeight(columnGroupHeight);
    }
  }, [data.length, headerGroups, stickyLeftColumnsIds, stickyLeftColumnGroupsIds]);

  const flatRows = rows.flatMap((row) => (row.isGrouped ? [row, ...row.leafRows] : [row]));

  const virtualizeRows =
    typeof virtualizeRowsConfig === "boolean" ? virtualizeRowsConfig : virtualizeRowsConfig != null;
  const estimateSize =
    typeof virtualizeRowsConfig === "boolean"
      ? (index: number) => (flatRows[index]?.isGrouped ? 26 : 52) // Default heights of a group row and of a medium-sized text cell
      : virtualizeRowsConfig?.estimateRowHeight ?? (() => 0);

  const rowVirtualizer = useVirtualizer({
    count: flatRows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize,
  });
  const virtualRows = rowVirtualizer.getVirtualItems();

  const virtualPaddingTop =
    virtualizeRows && virtualRows.length > 0 ? virtualRows[0]?.start ?? 0 : 0;
  const virtualPaddingBottom =
    virtualizeRows && virtualRows.length > 0
      ? rowVirtualizer.getTotalSize() - (virtualRows[virtualRows.length - 1]?.end ?? 0)
      : 0;

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
          icon={config.emptyIcon}
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

  const nonGroupedColumns = flatColumns.filter(({ accessor }) => accessor !== groupBy);

  const gridTemplateColumns = nonGroupedColumns
    .map(({ gridWidth = "fit-content" }) => gridWidthStyle(gridWidth))
    .join(" ");

  const withDividers = columnDividers ?? config.columnDividers;

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
        last={(index + 1) % flatColumns.length === 0}
        interactiveRow={interactiveRow}
        withDividers={withDividers}
      >
        {cell.render("Cell")}
      </CellContainer>
    ));
  }

  const rowsToRender = virtualizeRows
    ? virtualRows.map((virtualRow) => [flatRows[virtualRow.index], virtualRow.index] as const)
    : flatRows.map((row, index) => [row, index] as const);

  const paddingTopRow = virtualizeRows
    ? nonGroupedColumns.map((_, index) => (
        <div key={`paddingTop${index}`} style={{ marginTop: virtualPaddingTop }} />
      ))
    : [];
  const paddingBottomRow = virtualizeRows
    ? nonGroupedColumns.map((_, index) => (
        <div key={`paddingBottom${index}`} style={{ marginBottom: virtualPaddingBottom }} />
      ))
    : [];

  const renderedRows = rowsToRender.map(([row, index]) => {
    if (row.isGrouped) {
      return (
        <SectionHeader
          key={row.groupByVal}
          label={row.groupByVal}
          numberOfStickyColumns={stickyLeftColumnsIds.length}
        />
      );
    } else {
      prepareRow(row);
      return (
        <RowContainer key={index} row={row} onPress={onRowPress}>
          {renderCells(row.cells, index, onRowPress !== undefined)}
        </RowContainer>
      );
    }
  });

  const hasFooters = headerGroups.at(-1)?.headers.some((h) => h.Footer);

  return (
    <Box
      {...getTableProps()}
      alignItems="stretch"
      overflow="auto"
      className={table}
      style={{
        ...getTableProps().style,
        gridTemplateColumns,
        height: tableHeight(height),
      }}
      ref={tableContainerRef}
    >
      {headerGroups.map((headerGroup) =>
        headerGroup.headers.map((header, index) => (
          <ColumnHeader
            column={header}
            key={header.id}
            style={{
              ...stickyLeftColumnStyle[header.id],
              ...assignInlineVars({
                [stickyTopHeight]: header.columns ? "0" : `${stickyHeaderHeight}px`,
              }),
            }}
            lastLeftSticky={
              header.columns
                ? header.id === stickyLeftColumnGroupsIds.at(-1)
                : index === lastStickyColumnIndex
            }
            stickyHeaders={stickyHeaders}
            sticky={
              stickyLeftColumnsIds.includes(header.id) ||
              stickyLeftColumnGroupsIds.includes(header.id)
            }
            first={index === 0}
            last={index + 1 === flatColumns.length}
            withDividers={withDividers}
          />
        ))
      )}
      {paddingTopRow}
      {renderedRows}
      {paddingBottomRow}
      {hasFooters &&
        headerGroups.at(-1)?.headers.map((header, index) => (
          <ColumnFooter
            column={header}
            key={header.id}
            style={{
              ...stickyLeftColumnStyle[header.id],
            }}
            lastLeftSticky={
              header.columns
                ? header.id === stickyLeftColumnGroupsIds.at(-1)
                : index === lastStickyColumnIndex
            }
            stickyFooters={stickyFooters}
            sticky={stickyLeftColumnsIds.includes(header.id)}
            first={index === 0}
            last={index + 1 === flatColumns.length}
            withDividers={withDividers}
          />
        ))}
    </Box>
  );
}

function RowContainer<
  C extends
    | ReadonlyArray<SimpleColumnType<string, any, any>>
    | ReadonlyArray<GroupedColumnType<string, any, any>>
>({
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
  withDividers,
}: {
  column: ColumnInstance<D> | HeaderGroup<D>;
  style: CSSProperties;
  lastLeftSticky: boolean;
  stickyHeaders?: boolean;
  sticky: boolean;
  first: boolean;
  last: boolean;
  withDividers: boolean;
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
      style={{
        ...style,
        gridColumnEnd: column.columns ? `span ${column.columns.length}` : undefined,
        zIndex: sticky ? zIndexes.leftStickyHeader : zIndexes.header,
      }}
    >
      <Box
        className={[columnHeader({ withDividers, first, lastLeftSticky })]}
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

function ColumnFooter<D extends Record<string, unknown>>({
  column,
  style,
  lastLeftSticky,
  stickyFooters,
  sticky,
  first,
  last,
  withDividers,
}: {
  column: ColumnInstance<D> | HeaderGroup<D>;
  style: CSSProperties;
  lastLeftSticky: boolean;
  stickyFooters: boolean;
  sticky: boolean;
  first: boolean;
  last: boolean;
  withDividers: boolean;
}) {
  const config = useBentoConfig().table;

  return (
    <Box
      className={[lastLeftSticky && lastLeftStickyColumn, stickyFooters && stickyColumnFooter]}
      style={{
        ...style,
        zIndex: sticky ? zIndexes.leftStickyHeader : zIndexes.header,
      }}
    >
      <Box
        className={columnFooter({ withDividers, first, lastLeftSticky })}
        background={config.footerBackgroundColor}
        color={config.footerForegroundColor}
        {...column.getFooterProps()}
        textAlign={column.align}
        {...config.padding.footer}
      >
        {column.Footer && (
          <Box
            paddingLeft={first ? config.boundaryPadding : undefined}
            paddingRight={last ? config.boundaryPadding : undefined}
          >
            <Columns space={8} alignY="center" align={column.align}>
              <Column width="content">
                <Label size="large">{column.render("Footer") as any}</Label>
              </Column>
            </Columns>
          </Box>
        )}
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
          zIndex: numberOfStickyColumns > 0 ? 1 : undefined,
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
  withDividers,
  ...props
}: {
  children: any;
  index: number;
  style: CSSProperties;
  lastLeftSticky: boolean;
  first: boolean;
  last: boolean;
  interactiveRow: boolean;
  withDividers: boolean;
} & TableCellProps) {
  const tableConfig = useBentoConfig().table;

  return (
    <Box className={lastLeftSticky && lastLeftStickyColumn} style={style}>
      <Box
        background={index % 2 === 0 ? tableConfig.evenRowsBackgroundColor : "backgroundPrimary"}
        className={[
          cellContainerRecipe({ interactiveRow }),
          withDividers && cellColumnDivider({ first, lastLeftSticky }),
        ]}
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

export type {
  Column as SimpleColumnType,
  GroupedColumn as GroupedColumnType,
  Row as RowType,
} from "./types";

export type { ColumnOptionsBase } from "./tableColumn";
export type { Props as TableProps };

const zIndexes = {
  header: 1,
  leftStickyCell: 2,
  leftStickyHeader: 3,
};

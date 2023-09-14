import { FunctionComponent } from "react";
import { CellProps, Column as Column_ } from "react-table";
import { LocalizedString } from "..";

declare module "react-table" {
  interface TableOptions<D extends object>
    extends UseTableOptions<D>,
      UseSortByOptions<D>,
      UseGroupByOptions<D> {}

  export interface TableState<D extends object> extends UseGroupByState<D>, UseSortByState<D> {}

  interface ColumnInterface<D extends object> extends UseSortByColumnOptions<D> {
    align?: "left" | "right" | "center";
    sticky?: "left";
    gridWidth?: GridWidth;
    hint?: LocalizedString | { onPress: () => void };
  }

  interface ColumnInstance<D extends object>
    extends UseSortByColumnProps<D>,
      UseGroupByColumnProps<D> {}

  interface Row<D extends object> extends UseGroupByRowProps<D> {}
}

export type Column<A extends string, D extends object, V> = {
  accessor: A;
  Cell: (props: CellProps<D, V>) => ReturnType<FunctionComponent>;
} & Omit<Column_<D>, "accessor" | "Cell" | "width">;

export type GroupedColumn<A extends string, D extends object, V> = {
  Header: string;
  columns: Array<Column<A, D, V>>;
  align?: "left" | "right" | "center";
  sticky?: "left";
  hint?: LocalizedString | { onPress: () => void };
};

type ColumnValueByAccessor<C, K extends string> = C extends Column<K, infer _D, infer V>
  ? V
  : never;

export type Row<Columns extends ReadonlyArray<Column<string, {}, any>>> = {
  [k in Columns[number]["accessor"]]?: ColumnValueByAccessor<Columns[number], k>;
};

export type GridWidth = "fit-content" | "fill-available" | { custom: string | number };

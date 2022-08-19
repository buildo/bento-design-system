// NOTE(gabro): these are type-level tests, using @ts-expect-error to check that we get an error
// where expected

import { Table, tableColumn, unsafeLocalizedString } from "../src";

const columns = [
  tableColumn.number({
    accessor: "number",
    headerLabel: unsafeLocalizedString("Number"),
    valueFormatter: unsafeLocalizedString,
  }),
  tableColumn.text({
    accessor: "text",
    headerLabel: unsafeLocalizedString("Text"),
  }),
] as const;

<Table
  columns={columns}
  data={[
    {
      text: unsafeLocalizedString("ok"),
      // @ts-expect-error
      number: "error",
    },
  ]}
  groupBy="text"
/>;

<Table
  columns={
    [
      tableColumn.number({
        accessor: "number",
        headerLabel: unsafeLocalizedString("Number"),
        valueFormatter: unsafeLocalizedString,
      }),
      tableColumn.text({
        accessor: "text",
        headerLabel: unsafeLocalizedString("Text"),
      }),
    ] as const
  }
  data={[
    {
      text: unsafeLocalizedString("ok"),
      // @ts-expect-error
      number: "error",
    },
  ]}
  // NOTE(gabro): this should be an error, but it's not, due to type-inference limitations when
  // passing columns inline
  groupBy="error"
/>;

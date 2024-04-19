import { useCallback, useState, ComponentProps } from "react";
import {
  tableColumn,
  FormRow,
  SelectField,
  Stack,
  Table,
  TextField,
  IconInfoSolid,
  IconWarningSolid,
  NumberField,
  TableProps,
  IconX,
  withBentoConfig,
} from "..";
import orderBy from "lodash.orderby";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

const exampleColumns = [
  tableColumn.button({
    headerLabel: "Button",
    accessor: "button",
    sticky: "left",
    disableSortBy: true,
    align: "center",
  }),
  tableColumn.text({
    headerLabel: "Name",
    accessor: "name",
  }),
  tableColumn.text({
    headerLabel: "Extended address",
    accessor: "address",
    width: { custom: 200 },
  }),
  tableColumn.textWithIcon({
    headerLabel: "Country",
    accessor: "country",
    iconPosition: "right",
    hint: "This is a hint",
  }),
  tableColumn.number({
    headerLabel: "Applications",
    accessor: "applications",
    valueFormatter: (value) => Intl.NumberFormat("en").format(value),
    align: "right",
    hint: { onPress: action("hint") },
  }),
  tableColumn.numberWithIcon({
    headerLabel: "Value",
    accessor: "value",
    valueFormatter: (value) => Intl.NumberFormat("en").format(value),
    align: "right",
  }),
  tableColumn.label({
    headerLabel: "Type",
    accessor: "type",
  }),
  tableColumn.link({
    headerLabel: "Website",
    accessor: "website",
  }),
  tableColumn.icon({
    headerLabel: "Alerts",
    accessor: "alerts",
  }),
  tableColumn.chip({
    headerLabel: "Status",
    accessor: "status",
    align: "center",
  }),
  tableColumn.iconButton({
    headerLabel: "Actions",
    accessor: "deleteAction",
    align: "center",
    disableSortBy: true,
  }),
] as const;

const exampleColumnsWithFooter = [
  tableColumn.button({
    headerLabel: "Button",
    accessor: "button",
    sticky: "left",
    disableSortBy: true,
    align: "center",
  }),
  tableColumn.text({
    headerLabel: "Name",
    accessor: "name",
    footer: "-",
  }),
  tableColumn.text({
    headerLabel: "Extended address",
    accessor: "address",
    width: { custom: 200 },
    footer: "-",
  }),
  tableColumn.textWithIcon({
    headerLabel: "Country",
    accessor: "country",
    iconPosition: "right",
    hint: "This is a hint",
    footer: "-",
  }),
  tableColumn.number({
    headerLabel: "Applications",
    accessor: "applications",
    valueFormatter: (value) => Intl.NumberFormat("en").format(value),
    align: "right",
    hint: { onPress: action("hint") },
    footer: ({ rows }) =>
      Intl.NumberFormat("en").format(
        rows.reduce((acc, row) => acc + (row.values.applications ?? 0), 0)
      ),
  }),
  tableColumn.numberWithIcon({
    headerLabel: "Value",
    accessor: "value",
    valueFormatter: (value) => Intl.NumberFormat("en").format(value),
    align: "right",
  }),
  tableColumn.label({
    headerLabel: "Type",
    accessor: "type",
  }),
  tableColumn.link({
    headerLabel: "Website",
    accessor: "website",
    footer: "-",
  }),
  tableColumn.icon({
    headerLabel: "Alerts",
    accessor: "alerts",
  }),
  tableColumn.chip({
    headerLabel: "Status",
    accessor: "status",
    align: "center",
  }),
  tableColumn.iconButton({
    headerLabel: "Actions",
    accessor: "deleteAction",
    align: "center",
    disableSortBy: true,
  }),
] as const;

const exampleGroupedColumns = [
  {
    Header: "Group 1",
    sticky: "left" as const,
    hint: "This is a hint",
    columns: [
      tableColumn.button({
        headerLabel: "Button",
        accessor: "button",
        sticky: "left",
        disableSortBy: true,
        align: "center",
      }),
      tableColumn.text({
        headerLabel: "Name",
        accessor: "name",
        footer: "-",
      }),
      tableColumn.text({
        headerLabel: "Extended address",
        accessor: "address",
        width: { custom: 200 },
        footer: "-",
      }),
      tableColumn.textWithIcon({
        headerLabel: "Country",
        accessor: "country",
        iconPosition: "right",
        hint: "This is a hint",
        footer: "-",
      }),
    ],
  },
  {
    Header: "Group 2",
    columns: [
      tableColumn.number({
        headerLabel: "Applications",
        accessor: "applications",
        valueFormatter: (value) => Intl.NumberFormat("en").format(value),
        align: "right",
        hint: { onPress: action("hint") },
        footer: ({ rows }) =>
          Intl.NumberFormat("en").format(
            rows.reduce((acc, row) => acc + (row.values.applications ?? 0), 0)
          ),
      }),
      tableColumn.numberWithIcon({
        headerLabel: "Value",
        accessor: "value",
        valueFormatter: (value) => Intl.NumberFormat("en").format(value),
        align: "right",
      }),
      tableColumn.label({
        headerLabel: "Type",
        accessor: "type",
      }),
      tableColumn.link({
        headerLabel: "Website",
        accessor: "website",
      }),
    ],
  },
  {
    Header: "Group 3",
    columns: [
      tableColumn.icon({
        headerLabel: "Alerts",
        accessor: "alerts",
      }),
      tableColumn.chip({
        headerLabel: "Status",
        accessor: "status",
        align: "center",
      }),
      tableColumn.iconButton({
        headerLabel: "Actions",
        accessor: "deleteAction",
        align: "center",
        disableSortBy: true,
      }),
    ],
  },
];

const customizedColumns = [
  tableColumn.button({
    headerLabel: "Button",
    accessor: "button",
    sticky: "left",
    disableSortBy: true,
    align: "center",
    size: "large",
  }),
  tableColumn.text({
    headerLabel: "Name",
    accessor: "name",
    weight: "strong",
    size: "large",
  }),
  tableColumn.text({
    headerLabel: "Extended address",
    accessor: "address",
    width: { custom: 200 },
  }),
  tableColumn.textWithIcon({
    headerLabel: "Country",
    accessor: "country",
    iconPosition: "right",
    hint: "This is a hint",
    weight: "strong",
  }),
  tableColumn.number({
    headerLabel: "Applications",
    accessor: "applications",
    valueFormatter: (value) => Intl.NumberFormat("en").format(value),
    align: "right",
    hint: { onPress: action("hint") },
    size: "large",
    weight: "strong",
    color: "warning",
  }),
  tableColumn.numberWithIcon({
    headerLabel: "Value",
    accessor: "value",
    valueFormatter: (value) => Intl.NumberFormat("en").format(value),
    align: "right",
    weight: "strong",
    color: "negative",
  }),
  tableColumn.label({
    headerLabel: "Type",
    accessor: "type",
  }),
  tableColumn.link({
    headerLabel: "Website",
    accessor: "website",
    weight: "strong",
  }),
  tableColumn.icon({
    headerLabel: "Alerts",
    accessor: "alerts",
    size: 24,
  }),
  tableColumn.chip({
    headerLabel: "Status",
    accessor: "status",
    align: "center",
  }),
  tableColumn.iconButton({
    headerLabel: "Actions",
    accessor: "deleteAction",
    align: "center",
    disableSortBy: true,
    size: 24,
    kind: "solid",
    hierarchy: "danger",
  }),
] as const;

const deleteAction = {
  label: "Delete",
  icon: IconX,
  onPress: () => {},
};

const exampleData = [
  {
    name: "Amazon",
    address: "Theodore Lowe Ap #867-859 Sit Rd. Azusa New York 39531",
    country: {
      icon: IconInfoSolid,
      text: "US",
      tooltipContent: "United States",
    },
    button: {
      label: "Row 1",
      kind: "transparent",
      hierarchy: "primary",
      onPress: () => {},
    } as const,
    status: { label: "Active", color: "green" } as const,
    value: {
      numericValue: 100,
      icon: IconInfoSolid,
    },
    type: "Private",
    website: { href: "http://www.amazon.com", label: "Link" },
    alerts: { icon: IconWarningSolid, label: "Warning" },
    group: "Group 1",
    deleteAction,
  },
  {
    name: "Google",
    address: "Cecilia Chapman 711-2880 Nulla St.  Mankato Mississippi 96522",
    country: {
      icon: IconInfoSolid,
      text: "US",
      tooltipContent: "United States",
    },
    button: {
      label: "Row 2",
      kind: "transparent",
      hierarchy: "primary",
      onPress: () => {},
    } as const,
    applications: 10_000,
    status: { label: "Paused", color: "blue" } as const,
    value: {
      numericValue: 150,
      icon: IconInfoSolid,
    },
    type: "Private",
    website: { href: "http://www.google.com", label: "Link" },
    group: "Group 2",
    deleteAction,
  },
  {
    name: "Microsoft",
    address: "Iris Watson P.O. Box 283 8562 Fusce Rd.  Frederick Nebraska 20620",
    country: {
      icon: IconInfoSolid,
      text: "US",
      tooltipContent: "United States",
    },
    button: {
      label: "Row 3",
      kind: "transparent",
      hierarchy: "primary",
      onPress: () => {},
    } as const,
    applications: 1_000,
    status: { label: "Pending", color: "yellow" } as const,
    value: {
      numericValue: 120,
      icon: IconInfoSolid,
    },
    type: "Private",
    website: { href: "http://www.microsoft.com", label: "Link" },
    alerts: { icon: IconWarningSolid, label: "Warning" },
    group: "Group 1",
    deleteAction,
  },
  {
    name: "buildo",
    address: "Celeste Slater 606-3727 Ullamcorper. Street Roseville NH 11523",
    country: {
      icon: null,
      text: "IT",
    },
    button: {
      label: "Row 4",
      kind: "transparent",
      hierarchy: "primary",
      onPress: () => {},
    } as const,
    applications: 1_200,
    status: { label: "Active", color: "green" } as const,
    type: "Private",
    website: { href: "http://www.buildo.io", label: "Link" },
    group: "Group 2",
    deleteAction,
  },
  {
    name: "Twitter",
    address: "Theodore Lowe Ap #867-859 Sit Rd. Azusa New York 39531",
    country: {
      icon: IconInfoSolid,
      text: "US",
      tooltipContent: "United States",
    },
    button: {
      label: "Row 5",
      kind: "transparent",
      hierarchy: "primary",
      onPress: () => {},
    } as const,
    applications: 12_000,
    status: { label: "Paused", color: "blue" } as const,
    value: {
      numericValue: 137,
      icon: IconInfoSolid,
    },
    type: "Private",
    website: { href: "http://www.twitter.com", label: "Link" },
    group: "Group 1",
    deleteAction,
  },
];

const meta = {
  component: Table,
  args: {
    columns: exampleColumns,
    data: exampleData,
  },
  parameters: { actions: { argTypesRegex: "" } },
} satisfies Meta<TableProps<typeof exampleColumns, typeof exampleGroupedColumns>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple = {
  args: {
    initialSorting: [{ id: "name" }],
  },
} satisfies Story;

export const SimpleWithDividers = {
  args: {
    columns: exampleColumnsWithFooter,
    initialSorting: [{ id: "name" }],
    columnDividers: true,
  },
} satisfies Story;

export const Empty = {
  args: {
    data: [],
  },
} satisfies Story;

export const EmptyMediumSize = {
  args: {
    data: [],
    noResultsFeedbackSize: "medium",
  },
} satisfies Story;

export const WithFilter = {
  args: {},
  decorators: [
    (Story, ctx) => {
      function filterIfDefined<F>(
        filterValue: F | undefined,
        f: (filterValue: F) => boolean
      ): boolean {
        return !filterValue || f(filterValue);
      }

      const statusOptions = [
        { label: "Active", value: "Active" } as const,
        { label: "Paused", value: "Paused" } as const,
        { label: "Pending", value: "Pending" } as const,
      ];
      type Status = (typeof statusOptions)[number]["value"];

      const [nameFilter, setNameFilter] = useState("");
      const [statusFilter, setStatusFilter] = useState<Status | undefined>(undefined);

      const data = exampleData.filter(
        (row) =>
          filterIfDefined(statusFilter, (f) => row.status.label === f) &&
          filterIfDefined(nameFilter, (f) =>
            row.name.toLocaleLowerCase().includes(f.toLocaleLowerCase())
          )
      );

      return (
        <Stack space={40}>
          <FormRow>
            <TextField
              name="name"
              label="Name"
              placeholder="Search by name"
              value={nameFilter}
              onChange={setNameFilter}
            />
            <SelectField
              name="status"
              label="Status"
              placeholder="Select a status to filter"
              value={statusFilter}
              onChange={setStatusFilter}
              options={statusOptions}
            />
          </FormRow>
          <Story args={{ ...ctx.args, data }} />
        </Stack>
      );
    },
  ],
} satisfies Story;

export const WithControlledSorting = {
  args: {
    onSort: action("onSort"),
  },
  render: (args) => {
    const [, setArgs] = useArgs();

    const [numberOfRows, setNumberOfRows] = useState(2);

    const onSort: NonNullable<ComponentProps<typeof Table>["onSort"]> = useCallback(
      (sortBy) => {
        const newData = orderBy(
          args.data,
          sortBy.map((a) => {
            switch (a.id) {
              case "country":
                return "country.text";
              case "status":
                return "status.label";
              case "value":
                return "value.numericValue";
              default:
                return a.id;
            }
          }),
          sortBy.map((a) => (a.desc ? "desc" : "asc"))
        ).slice(0, numberOfRows);
        setArgs({ data: newData });
      },
      [numberOfRows, setArgs, args.data]
    );

    return (
      <Stack space={40}>
        <FormRow>
          <NumberField
            name="numberOfRows"
            label="Number of rows"
            placeholder="Number of rows"
            value={numberOfRows}
            onChange={setNumberOfRows}
          />
        </FormRow>
        {/* NOTE(gabro): no idea why TS complains on the onSort type here */}
        {/* @ts-expect-error */}
        <Table {...args} onSort={onSort} />
      </Stack>
    );
  },
} satisfies Story;

export const Grouped = {
  args: {
    columns: [
      ...exampleColumns,
      tableColumn.text({
        headerLabel: "Group",
        accessor: "group",
      }),
    ] as const,
    groupBy: "group",
  },
} satisfies Story;

export const WithFillColumn = {
  args: {
    columns: [
      tableColumn.text({
        headerLabel: "Name",
        accessor: "name",
        width: "fill-available",
      }),
      tableColumn.textWithIcon({
        headerLabel: "Country",
        accessor: "country",
        iconPosition: "right",
        hint: "This is a hint",
      }),
    ] as const,
    data: exampleData,
  },
} satisfies Story;

export const StickyHeaders = {
  args: {
    initialSorting: [{ id: "name" }],
    stickyHeaders: true,
    height: { custom: 320 },
  },
} satisfies Story;

export const CustomizedColumns = {
  args: {
    columns: customizedColumns,
  },
} satisfies Story;

export const InteractiveRow = {
  args: {
    initialSorting: [{ id: "name" }],
    onRowPress: action("onRowPress"),
  },
} satisfies Story;

export const GroupedHeaders = {
  args: {
    columns: exampleGroupedColumns,
    stickyHeaders: true,
    height: { custom: 320 },
  },
} satisfies Story;

export const GroupedHeadersWithDividers = {
  args: {
    columns: exampleGroupedColumns,
    stickyHeaders: true,
    columnDividers: true,
    height: { custom: 320 },
  },
} satisfies Story;

function repeatToLength<T>(arr: T[], n: number): T[] {
  if (arr.length <= 0) return [];
  let result: T[] = [];
  while (result.length < n) {
    result = result.concat(arr);
  }
  return result.slice(0, n);
}

export const VirtualizedRows = {
  args: {
    stickyHeaders: true,
    height: { custom: 340 },
    virtualizeRows: { estimateRowHeight: () => 92 },
    data: repeatToLength(exampleData, 1_000),
  },
} satisfies Story;

export const VirtualizedRowsGroupedHeaders = {
  args: {
    columns: exampleGroupedColumns,
    stickyHeaders: true,
    height: { custom: 340 },
    virtualizeRows: { estimateRowHeight: () => 92 },
    data: repeatToLength(exampleData, 1_000),
  },
} satisfies Story;

export const VirtualizedRowsGroupedRows = {
  args: {
    columns: [
      ...exampleColumns,
      tableColumn.text({
        headerLabel: "Group",
        accessor: "group",
      }),
    ] as const,
    groupBy: "group",
    stickyHeaders: true,
    height: { custom: 340 },
    virtualizeRows: { estimateRowHeight: () => 92 },
    data: repeatToLength(exampleData, 1_000),
  },
} satisfies Story;

const CompactTable = withBentoConfig(
  {
    table: {
      headerSize: "small",
      footerSize: "small",
      padding: {
        header: { paddingX: 8, paddingY: 8 },
        footer: { paddingX: 8, paddingY: 8 },
        textCell: { paddingX: 8, paddingY: 8 },
        buttonCell: { paddingX: 8, paddingY: 8 },
        iconButtonCell: { paddingX: 8, paddingY: 8 },
        buttonLinkCell: { paddingX: 8, paddingY: 8 },
        defaultCell: { paddingX: 8, paddingY: 8 },
        iconCell: { paddingX: 8, paddingY: 8 },
        labelCell: { paddingX: 8, paddingY: 8 },
        linkCell: { paddingX: 8, paddingY: 8 },
        textWithIconCell: { paddingX: 8, paddingY: 8 },
      },
      defaultCellOptions: {
        textCell: { size: "small" },
        buttonCell: { size: "small" },
        iconButtonCell: { size: 8 },
        buttonLinkCell: { size: "small" },
        defaultCell: { size: "small" },
        iconCell: { size: 8 },
        labelCell: { size: "small" },
        linkCell: { size: "small" },
        textWithIconCell: { size: "small", iconSize: 8 },
      },
    },
  },
  Table
);

export const Compact = {
  args: {
    initialSorting: [{ id: "name" }],
  },
  render: (args) => <CompactTable {...args} />,
} satisfies Story;

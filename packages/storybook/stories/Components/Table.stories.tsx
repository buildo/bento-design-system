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
} from "../";
import { createComponentStories } from "../util";
import orderBy from "lodash.orderby";
import { IconX } from "@buildo/bento-design-system";
import { action } from "@storybook/addon-actions";

const { defaultExport, createStory } = createComponentStories({
  component: Table,
  args: {},
  parameters: { actions: { argTypesRegex: "" } },
});

export default defaultExport;

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
];

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

export const Simple = createStory({
  columns: exampleColumns,
  data: exampleData,
  initialSorting: [{ id: "name" }],
});

export const Empty = createStory({
  columns: exampleColumns,
  data: [],
});

export const EmptyMediumSize = createStory({
  columns: exampleColumns,
  data: [],
  noResultsFeedbackSize: "medium",
});

export const WithFilter = (_args: Parameters<typeof createStory>[0]) => {
  function filterIfDefined<F>(filterValue: F | undefined, f: (filterValue: F) => boolean): boolean {
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
      <Table columns={exampleColumns} data={data} />
    </Stack>
  );
};

export const WithControlledSorting = (_args: Parameters<typeof createStory>[0]) => {
  const [data, setData] = useState(exampleData);

  const [numberOfRows, setNumberOfRows] = useState(2);

  const onSort: NonNullable<ComponentProps<typeof Table>["onSort"]> = useCallback(
    (sortBy) => {
      const newData = orderBy(
        exampleData,
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
      setData(newData);
    },
    [numberOfRows]
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
      <Table columns={exampleColumns} data={data} onSort={onSort} />
    </Stack>
  );
};

export const Grouped = createStory({
  columns: [
    ...exampleColumns,
    tableColumn.text({
      headerLabel: "Group",
      accessor: "group",
    }),
  ] as const,
  data: exampleData,
  groupBy: "group",
});

export const WithFillColumn = createStory({
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
});

export const StickyHeaders = createStory({
  columns: exampleColumns,
  data: exampleData,
  initialSorting: [{ id: "name" }],
  stickyHeaders: true,
  height: { custom: 320 },
});

export const CustomizedColumns = createStory({
  columns: customizedColumns,
  data: exampleData,
});

export const InteractiveRow = createStory({
  columns: exampleColumns,
  data: exampleData,
  initialSorting: [{ id: "name" }],
  onRowPress: action("onRowPress"),
});

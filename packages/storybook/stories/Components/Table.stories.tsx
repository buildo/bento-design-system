import { useCallback, useState, ComponentProps } from "react";
import {
  tableColumn,
  FormRow,
  SelectField,
  Stack,
  Table,
  TextField,
  IconInformative,
  IconWarning,
} from "../";
import { createComponentStories, formatMessage } from "../util";
import orderBy from "lodash.orderby";
import { IconClose } from "@buildo/bento-design-system";
import { action } from "@storybook/addon-actions";

const { defaultExport, createStory } = createComponentStories({
  component: Table,
  args: {},
  parameters: { actions: { argTypesRegex: "" } },
});

export default defaultExport;

const exampleColumns = [
  tableColumn.button({
    headerLabel: formatMessage("Button"),
    accessor: "button",
    sticky: "left",
    disableSortBy: true,
    align: "center",
  }),
  tableColumn.text({
    headerLabel: formatMessage("Name"),
    accessor: "name",
  }),
  tableColumn.text({
    headerLabel: formatMessage("Extended address"),
    accessor: "address",
    width: { custom: 200 },
  }),
  tableColumn.textWithIcon({
    headerLabel: formatMessage("Country"),
    accessor: "country",
    iconPosition: "right",
    hint: formatMessage("This is a hint"),
  }),
  tableColumn.number({
    headerLabel: formatMessage("Applications"),
    accessor: "applications",
    valueFormatter: (value) => formatMessage(Intl.NumberFormat("en").format(value)),
    align: "right",
    hint: { onPress: action("hint") },
  }),
  tableColumn.numberWithIcon({
    headerLabel: formatMessage("Value"),
    accessor: "value",
    valueFormatter: (value) => formatMessage(Intl.NumberFormat("en").format(value)),
    align: "right",
  }),
  tableColumn.label({
    headerLabel: formatMessage("Type"),
    accessor: "type",
  }),
  tableColumn.link({
    headerLabel: formatMessage("Website"),
    accessor: "website",
  }),
  tableColumn.icon({
    headerLabel: formatMessage("Alerts"),
    accessor: "alerts",
  }),
  tableColumn.chip({
    headerLabel: formatMessage("Status"),
    accessor: "status",
    align: "center",
  }),
  tableColumn.iconButton({
    headerLabel: formatMessage("Actions"),
    accessor: "deleteAction",
    align: "center",
    disableSortBy: true,
  }),
];

const deleteAction = {
  label: formatMessage("Delete"),
  icon: IconClose,
  onPress: () => {},
};

const exampleData = [
  {
    name: formatMessage("Amazon"),
    address: "Theodore Lowe Ap #867-859 Sit Rd. Azusa New York 39531",
    country: {
      icon: IconInformative,
      text: formatMessage("US"),
    },
    button: {
      label: formatMessage("Row 1"),
      kind: "transparent",
      hierarchy: "primary",
      onPress: () => {},
    } as const,
    status: { label: formatMessage("Active"), color: "green" } as const,
    value: {
      numericValue: 100,
      icon: IconInformative,
    },
    type: formatMessage("Private"),
    website: { href: "http://www.amazon.com", label: formatMessage("Link") },
    alerts: { icon: IconWarning, label: formatMessage("Warning") },
    group: formatMessage("Group 1"),
    deleteAction,
  },
  {
    name: formatMessage("Google"),
    address: "Cecilia Chapman 711-2880 Nulla St.  Mankato Mississippi 96522",
    country: {
      icon: IconInformative,
      text: formatMessage("US"),
    },
    button: {
      label: formatMessage("Row 2"),
      kind: "transparent",
      hierarchy: "primary",
      onPress: () => {},
    } as const,
    applications: 10_000,
    status: { label: formatMessage("Paused"), color: "blue" } as const,
    value: {
      numericValue: 150,
      icon: IconInformative,
    },
    type: formatMessage("Private"),
    website: { href: "http://www.google.com", label: formatMessage("Link") },
    group: formatMessage("Group 2"),
    deleteAction,
  },
  {
    name: formatMessage("Microsoft"),
    address: "Iris Watson P.O. Box 283 8562 Fusce Rd.  Frederick Nebraska 20620",
    country: {
      icon: IconInformative,
      text: formatMessage("US"),
    },
    button: {
      label: formatMessage("Row 3"),
      kind: "transparent",
      hierarchy: "primary",
      onPress: () => {},
    } as const,
    applications: 1_000,
    status: { label: formatMessage("Pending"), color: "yellow" } as const,
    value: {
      numericValue: 120,
      icon: IconInformative,
    },
    type: formatMessage("Private"),
    website: { href: "http://www.microsoft.com", label: formatMessage("Link") },
    alerts: { icon: IconWarning, label: formatMessage("Warning") },
    group: formatMessage("Group 1"),
    deleteAction,
  },
  {
    name: formatMessage("buildo"),
    address: "Celeste Slater 606-3727 Ullamcorper. Street Roseville NH 11523",
    country: {
      icon: null,
      text: formatMessage("IT"),
    },
    button: {
      label: formatMessage("Row 4"),
      kind: "transparent",
      hierarchy: "primary",
      onPress: () => {},
    } as const,
    applications: 1_200,
    status: { label: formatMessage("Active"), color: "green" } as const,
    type: formatMessage("Private"),
    website: { href: "http://www.buildo.io", label: formatMessage("Link") },
    group: formatMessage("Group 2"),
    deleteAction,
  },
  {
    name: formatMessage("Twitter"),
    address: "Theodore Lowe Ap #867-859 Sit Rd. Azusa New York 39531",
    country: {
      icon: IconInformative,
      text: formatMessage("US"),
    },
    button: {
      label: formatMessage("Row 5"),
      kind: "transparent",
      hierarchy: "primary",
      onPress: () => {},
    } as const,
    applications: 12_000,
    status: { label: formatMessage("Paused"), color: "blue" } as const,
    value: {
      numericValue: 137,
      icon: IconInformative,
    },
    type: formatMessage("Private"),
    website: { href: "http://www.twitter.com", label: formatMessage("Link") },
    group: formatMessage("Group 1"),
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

export const WithFilter = (_args: Parameters<typeof createStory>[0]) => {
  function filterIfDefined<F>(filterValue: F | undefined, f: (filterValue: F) => boolean): boolean {
    return !filterValue || f(filterValue);
  }

  const statusOptions = [
    { label: formatMessage("Active"), value: "Active" } as const,
    { label: formatMessage("Paused"), value: "Paused" } as const,
    { label: formatMessage("Pending"), value: "Pending" } as const,
  ];
  type Status = typeof statusOptions[number]["value"];

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
          onBlur={() => {}}
          label={formatMessage("Name")}
          placeholder={formatMessage("Search by name")}
          value={nameFilter}
          onChange={setNameFilter}
        />
        <SelectField
          name="status"
          onBlur={() => {}}
          label={formatMessage("Status")}
          placeholder={formatMessage("Select a status to filter")}
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

  const onSort: NonNullable<ComponentProps<typeof Table>["onSort"]> = useCallback((sortBy) => {
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
    );
    setData(newData);
  }, []);

  return <Table columns={exampleColumns} data={data} onSort={onSort} />;
};

export const Grouped = createStory({
  columns: [
    ...exampleColumns,
    tableColumn.text({
      headerLabel: formatMessage("Group"),
      accessor: "group",
    }),
  ] as const,
  data: exampleData,
  groupBy: "group",
});

export const WithFillColumn = createStory({
  columns: [
    tableColumn.text({
      headerLabel: formatMessage("Name"),
      accessor: "name",
      width: "fill-available",
    }),
    tableColumn.textWithIcon({
      headerLabel: formatMessage("Country"),
      accessor: "country",
      iconPosition: "right",
      hint: formatMessage("This is a hint"),
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

import * as React from "react";
import { IconInformative, IconWarning, Table, tableColumn, IconClose } from "..";
import { formatMessage } from "../formatMessage";

export default function TableExample() {
  return (
    <Table
      data={[
        {
          name: formatMessage("Amazon"),
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
          website: { href: "http://www.amazon.com", label: formatMessage("Link") },
          alerts: { icon: IconWarning, label: formatMessage("Warning") },
          group: formatMessage("Group 1"),
          deleteAction: {
            label: formatMessage("Delete"),
            icon: IconClose,
            onPress: () => {},
          },
        },
        {
          name: formatMessage("Google"),
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
          website: { href: "http://www.google.com", label: formatMessage("Link") },
          group: formatMessage("Group 2"),
          deleteAction: {
            label: formatMessage("Delete"),
            icon: IconClose,
            onPress: () => {},
          },
        },
      ]}
      columns={
        [
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
          tableColumn.textWithIcon({
            headerLabel: formatMessage("Country"),
            accessor: "country",
            iconPosition: "right",
          }),
          tableColumn.number({
            headerLabel: formatMessage("Applications"),
            accessor: "applications",
            valueFormatter: (value) => formatMessage(Intl.NumberFormat("en").format(value)),
            align: "right",
          }),
          tableColumn.numberWithIcon({
            headerLabel: formatMessage("Value"),
            accessor: "value",
            valueFormatter: (value) => formatMessage(Intl.NumberFormat("en").format(value)),
            align: "right",
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
        ] as const
      }
    />
  );
}

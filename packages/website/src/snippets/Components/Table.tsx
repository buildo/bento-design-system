import * as React from "react";
import { IconInfo, IconWarningSolid, Table, tableColumn, IconClose } from "..";

export default function TableExample() {
  return (
    <Table
      data={[
        {
          name: "Amazon",
          country: {
            icon: IconInfo,
            text: "US",
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
            icon: IconInfo,
          },
          website: { href: "http://www.amazon.com", label: "Link" },
          alerts: { icon: IconWarningSolid, label: "Warning" },
          group: "Group 1",
          deleteAction: {
            label: "Delete",
            icon: IconClose,
            onPress: () => {},
          },
        },
        {
          name: "Google",
          country: {
            icon: IconInformative,
            text: "US",
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
            icon: IconInformative,
          },
          website: { href: "http://www.google.com", label: "Link" },
          group: "Group 2",
          deleteAction: {
            label: "Delete",
            icon: IconClose,
            onPress: () => {},
          },
        },
      ]}
      columns={
        [
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
          tableColumn.textWithIcon({
            headerLabel: "Country",
            accessor: "country",
            iconPosition: "right",
          }),
          tableColumn.number({
            headerLabel: "Applications",
            accessor: "applications",
            valueFormatter: (value) => Intl.NumberFormat("en").format(value),
            align: "right",
          }),
          tableColumn.numberWithIcon({
            headerLabel: "Value",
            accessor: "value",
            valueFormatter: (value) => Intl.NumberFormat("en").format(value),
            align: "right",
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
        ] as const
      }
    />
  );
}

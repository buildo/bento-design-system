import * as React from "react";
import { Breadcrumb } from "..";
import { formatMessage } from "../formatMessage";

export default function BreadcrumbExample() {
  return (
    <Breadcrumb
      items={[
        {
          label: formatMessage("Root"),
          href: "https://www.example.com",
        },
        {
          label: formatMessage("1st Level"),
          href: "https://www.example.com",
        },
        {
          label: formatMessage("2nd Level"),
          href: "https://www.example.com",
        },
        {
          label: formatMessage("3rd Level"),
        },
      ]}
    />
  );
}

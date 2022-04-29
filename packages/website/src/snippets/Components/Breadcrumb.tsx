import * as React from "react";
import { Breadcrumb } from "..";

export default function BreadcrumbExample() {
  return (
    <Breadcrumb
      items={[
        {
          label: "Root",
          href: "https://www.example.com",
        },
        {
          label: "1st Level",
          href: "https://www.example.com",
        },
        {
          label: "2nd Level",
          href: "https://www.example.com",
        },
        {
          label: "3rd Level",
        },
      ]}
    />
  );
}

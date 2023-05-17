import * as React from "react";
import { IconPlaceholder, Navigation } from "..";

export default function NavigationExample() {
  return (
    <Navigation
      size="large"
      kind="icon"
      destinations={[
        {
          label: "Item 1",
          href: "http://www.example.com",
          icon: IconPlaceholder,
        },
        {
          label: "Item 2 (link)",
          href: "http://www.example.com",
          target: "_blank",
          icon: IconPlaceholder,
        },
        {
          label: "Item 3",
          href: "http://www.example.com",
          disabled: true,
          icon: IconPlaceholder,
        },
      ]}
    />
  );
}

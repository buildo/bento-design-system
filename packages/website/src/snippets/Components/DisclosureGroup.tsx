import * as React from "react";
import { Body, DisclosureGroup, Placeholder } from "..";

export default function DisclosureExample() {
  return (
    <DisclosureGroup
      items={[
        {
          title: "Item 1",
          initialIsOpen: true,
          items: [
            {
              title: "Item 1.1",
              children: <Placeholder />,
              initialIsOpen: true,
            },
            {
              title: "Item 1.2",
              children: <Placeholder />,
            },
          ],
        },
        {
          title: "Item 2",
          children: <Placeholder />,
        },
        {
          title: "Item 3",
          items: [
            {
              title: "Item 3.1",
              children: <Placeholder />,
            },
          ],
        },
      ]}
    ></DisclosureGroup>
  );
}

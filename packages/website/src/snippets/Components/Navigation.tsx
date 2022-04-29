import * as React from "react";
import { IllustrationIdea, Navigation } from "..";

export default function NavigationExample() {
  return (
    <Navigation
      size="large"
      kind="illustration"
      destinations={[
        {
          label: "Item 1",
          href: "http://www.example.com",
          illustration: IllustrationIdea,
        },
        {
          label: "Item 2 (link)",
          href: "http://www.example.com",
          target: "_blank",
          illustration: IllustrationIdea,
        },
        {
          label: "Item 3",
          href: "http://www.example.com",
          disabled: true,
          illustration: IllustrationIdea,
        },
      ]}
    />
  );
}

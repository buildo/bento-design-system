import * as React from "react";
import { IllustrationIdea, Navigation } from "..";
import { formatMessage } from "../formatMessage";

export default function NavigationExample() {
  return (
    <Navigation
      size="large"
      kind="illustration"
      destinations={[
        {
          label: formatMessage("Item 1"),
          href: "http://www.example.com",
          illustration: IllustrationIdea,
        },
        {
          label: formatMessage("Item 2 (link)"),
          href: "http://www.example.com",
          target: "_blank",
          illustration: IllustrationIdea,
        },
        {
          label: formatMessage("Item 3"),
          href: "http://www.example.com",
          disabled: true,
          illustration: IllustrationIdea,
        },
      ]}
    />
  );
}

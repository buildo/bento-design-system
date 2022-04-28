import * as React from "react";
import { IllustrationIdea, List } from "..";
import { formatMessage } from "../formatMessage";

export default function ListExample() {
  return (
    <List
      size="medium"
      dividers
      items={[
        {
          kind: "two-line",
          label: formatMessage("Item1"),
          secondLine: formatMessage("Item1 description"),
          href: "http://www.example.com",
          illustration: IllustrationIdea,
        },
        {
          kind: "two-line",
          label: formatMessage("Item2"),
          secondLine: formatMessage("Item2 description"),
          href: "http://www.example.com",
          illustration: IllustrationIdea,
        },
        {
          kind: "two-line",
          label: formatMessage("Item3"),
          secondLine: formatMessage("Item3 description"),
          href: "http://www.example.com",
          illustration: IllustrationIdea,
        },
      ]}
    />
  );
}

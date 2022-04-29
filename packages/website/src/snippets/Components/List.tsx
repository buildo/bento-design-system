import * as React from "react";
import { IllustrationIdea, List } from "..";

export default function ListExample() {
  return (
    <List
      size="medium"
      dividers
      items={[
        {
          kind: "two-line",
          label: "Item1",
          secondLine: "Item1 description",
          href: "http://www.example.com",
          illustration: IllustrationIdea,
        },
        {
          kind: "two-line",
          label: "Item2",
          secondLine: "Item2 description",
          href: "http://www.example.com",
          illustration: IllustrationIdea,
        },
        {
          kind: "two-line",
          label: "Item3",
          secondLine: "Item3 description",
          href: "http://www.example.com",
          illustration: IllustrationIdea,
        },
      ]}
    />
  );
}

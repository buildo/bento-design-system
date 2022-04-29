import * as React from "react";
import { Divider, Body, Stack, Inline } from "..";

export default function DividerExample() {
  return (
    <Stack space={8}>
      <Body size="medium">Top</Body>
      <Divider />
      <Inline space={8} alignY="stretch">
        <Body size="medium">Bottom Left</Body>
        <Divider orientation="vertical" />
        <Body size="medium">Bottom Right</Body>
      </Inline>
    </Stack>
  );
}

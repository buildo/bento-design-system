import * as React from "react";
import { Divider, Body, Stack, Inline } from "..";
import { formatMessage } from "../formatMessage";

export default function DividerExample() {
  return (
    <Stack space={8}>
      <Body size="medium">{formatMessage("Top")}</Body>
      <Divider />
      <Inline space={8} alignY="stretch">
        <Body size="medium">{formatMessage("Bottom Left")}</Body>
        <Divider orientation="vertical" />
        <Body size="medium">{formatMessage("Bottom Right")}</Body>
      </Inline>
    </Stack>
  );
}

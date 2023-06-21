import * as React from "react";
import { Body, Stack } from "..";

export default function BodyWeightsExample() {
  return (
    <Stack space={16}>
      <Body size="large">Hello, world! (Body default)</Body>
      <Body size="large" weight="strong">
        Hello, world! (Body strong)
      </Body>
    </Stack>
  );
}

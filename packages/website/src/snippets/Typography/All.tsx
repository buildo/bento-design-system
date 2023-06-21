import * as React from "react";
import { Body, Display, Headline, Label, Stack, Title } from "..";

export default function AllExample() {
  return (
    <Stack space={16}>
      <Display size="large">Hello, world! (Display)</Display>
      <Headline size="large">Hello, world! (Headline)</Headline>
      <Title size="large">Hello, world! (Title)</Title>
      <Label size="large" color="primary">
        Hello, world! (Label)
      </Label>
      <Body size="large">Hello, world! (Body)</Body>
    </Stack>
  );
}

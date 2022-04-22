import * as React from "react";
import { Stack, Placeholder } from "..";

export default function StackAlign() {
  return (
    <Stack space={32} align="center">
      <Placeholder width={200} />
      <Placeholder width={200} />
      <Placeholder width={200} />
    </Stack>
  );
}

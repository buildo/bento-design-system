import * as React from "react";
import { Stack, Placeholder } from "..";

export default function StackAlignResponsive() {
  return (
    <Stack space={32} align={{ desktop: "right", tablet: "center" }}>
      <Placeholder width={200} />
      <Placeholder width={200} />
      <Placeholder width={200} />
    </Stack>
  );
}

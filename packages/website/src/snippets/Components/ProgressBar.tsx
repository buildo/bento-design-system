import * as React from "react";
import { ProgressBar, Stack } from "..";

export default function ProgressBarExample() {
  return (
    <Stack space={16}>
      <ProgressBar kind="continuous" value={60} maxValue={100} label="Progress" />
      <ProgressBar kind="discrete" value={1} maxValue={5} label="Step" />
    </Stack>
  );
}

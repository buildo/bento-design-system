import * as React from "react";
import { ProgressBar, Stack } from "..";
import { formatMessage } from "../formatMessage";

export default function ProgressBarExample() {
  return (
    <Stack space={16}>
      <ProgressBar kind="continuous" value={60} maxValue={100} label={formatMessage("Progress")} />
      <ProgressBar kind="discrete" value={1} maxValue={5} label={formatMessage("Step")} />
    </Stack>
  );
}

import * as React from "react";
import { Chip } from "..";
import { formatMessage } from "../formatMessage";

export default function ChipExample() {
  return (
    <Chip color="blue" label={formatMessage("Label")} onDismiss={() => window.alert("Dismissed")} />
  );
}

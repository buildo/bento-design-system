import * as React from "react";
import { Chip } from "..";

export default function ChipExample() {
  return <Chip color="blue" label="Label" onDismiss={() => window.alert("Dismissed")} />;
}

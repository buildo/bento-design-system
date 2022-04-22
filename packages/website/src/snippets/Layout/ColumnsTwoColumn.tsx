import * as React from "react";
import { Columns, Placeholder } from "..";

export default function ColumnsTwoColumn() {
  return (
    <Columns space={24}>
      <Placeholder height={200} />
      <Placeholder height={200} />
    </Columns>
  );
}

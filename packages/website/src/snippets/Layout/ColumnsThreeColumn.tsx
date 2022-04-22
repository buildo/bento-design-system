import * as React from "react";
import { Column, Columns, Placeholder } from "..";

export default function ColumnsThreeColumn() {
  return (
    <Columns space={24}>
      <Column width="1/5">
        <Placeholder height={200} label="1/5" />
      </Column>
      <Placeholder height={200} />
      <Column width="1/5">
        <Placeholder height={200} label="1/5" />
      </Column>
    </Columns>
  );
}

import * as React from "react";
import { Column, Columns, Placeholder } from "..";

export default function ColumnsContentSizedColumn() {
  return (
    <Columns space={24}>
      <Column width="content">
        <Placeholder height={200} label="I'm a content-sized column" />
      </Column>
      <Column>
        <Placeholder height={200} />
      </Column>
    </Columns>
  );
}

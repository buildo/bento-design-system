import * as React from "react";
import { Columns, Placeholder } from "..";

export default function ColumnsCollapseBelow() {
  return (
    <Columns
      space={24}
      alignY="bottom"
      collapseBelow="desktop"
      align={{
        mobile: "center",
        desktop: "left",
      }}
    >
      <Placeholder height={100} />
      <Placeholder height={100} />
      <Placeholder height={100} />
    </Columns>
  );
}

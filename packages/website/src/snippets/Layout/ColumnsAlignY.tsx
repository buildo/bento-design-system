import * as React from "react";
import { Columns, Placeholder } from "..";

export default function ColumnsAlignY() {
  return (
    <Columns space={24} alignY="bottom">
      <Placeholder height={50} />
      <Placeholder height={100} />
    </Columns>
  );
}

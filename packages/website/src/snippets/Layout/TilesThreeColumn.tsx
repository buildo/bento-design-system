import * as React from "react";
import { Columns, Placeholder, Tiles } from "..";

export default function TilesThreeColumn() {
  return (
    <Tiles space={24} columns={3}>
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </Tiles>
  );
}

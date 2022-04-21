import * as React from "react";
import { Columns, Placeholder, Tiles } from "..";

export default function TilesResponsive() {
  return (
    <Tiles
      space={{ mobile: 8, tablet: 16, desktop: 32 }}
      columns={{ mobile: 1, tablet: 2, desktop: 4 }}
    >
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </Tiles>
  );
}

import * as React from "react";
import { Inline, Placeholder } from "..";

export default function InlineAlign() {
  return (
    <Inline space={24} align="center" alignY="bottom">
      <Placeholder width={200} height={50} />
      <Placeholder width={100} height={200} />
      <Placeholder width={300} height={150} />
    </Inline>
  );
}

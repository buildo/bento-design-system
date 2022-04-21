import * as React from "react";
import { Inline, Placeholder } from "..";

export default function InlineReverse() {
  return (
    <Inline space={24} reverse>
      <Placeholder label="1" width={100} />
      <Placeholder label="2" width={100} />
      <Placeholder label="3" width={100} />
    </Inline>
  );
}

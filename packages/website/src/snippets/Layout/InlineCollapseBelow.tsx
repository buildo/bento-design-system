import * as React from "react";
import { Inline, Placeholder } from "..";

export default function InlineAlign() {
  return (
    <Inline space={24} collapseBelow="tablet" align={{ mobile: "center" }}>
      <Placeholder width={100} />
      <Placeholder width={200} />
      <Placeholder width={100} />
    </Inline>
  );
}

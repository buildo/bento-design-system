import * as React from "react";
import { Inline, Placeholder } from "..";

export default function InlineBasic() {
  return (
    <Inline space={24}>
      <Placeholder width={200} />
      <Placeholder width={100} />
      <Placeholder width={300} />
    </Inline>
  );
}

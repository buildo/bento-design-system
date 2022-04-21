import * as React from "react";
import { Stack, Placeholder, ContentBlock, Columns } from "..";

export default function StackBasic() {
  return (
    <ContentBlock maxWidth={700} alignSelf="center">
      <Columns space={80}>
        <Placeholder />
        <Placeholder />
      </Columns>
    </ContentBlock>
  );
}

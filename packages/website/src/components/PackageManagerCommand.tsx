import * as React from "react";
import CodeBlock from "@theme/CodeBlock";
import TabItem from "@theme/TabItem";
import Tabs from "@theme/Tabs";

type Props = {
  command: {
    npm: string;
    yarn: string;
    pnpm: string;
  };
};

export function PackageManagerCommand({ command: { npm, yarn, pnpm } }: Props) {
  return (
    <Tabs groupId="package-manager">
      <TabItem value="pnpm">
        <CodeBlock language="bash">{`pnpm ${pnpm}`}</CodeBlock>
      </TabItem>
      <TabItem value="yarn">
        <CodeBlock language="bash">{`yarn ${yarn}`}</CodeBlock>
      </TabItem>
      <TabItem value="npm">
        <CodeBlock language="bash">{`npm ${npm}`}</CodeBlock>
      </TabItem>
    </Tabs>
  );
}

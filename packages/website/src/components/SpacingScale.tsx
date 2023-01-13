import * as React from "react";
import { Box, DesignSystemProvider, Inline, Stack, vars } from "../snippets";
import { defaultMessages } from "../snippets/defaultMessages";

const SpacePoint = ({ space }: { space: string }) => (
  <Box style={{ height: 20, width: space }} background="primarySolidEnabledBackground" />
);

export function SpacingScale() {
  return (
    <DesignSystemProvider defaultMessages={defaultMessages}>
      <Stack space={16}>
        {Object.entries(vars.space).map(([name, space]) => (
          <Inline key={name} space={16} alignY="center">
            <Box style={{ width: 32 }}>{name}</Box>
            <SpacePoint space={space} />
          </Inline>
        ))}
      </Stack>
    </DesignSystemProvider>
  );
}

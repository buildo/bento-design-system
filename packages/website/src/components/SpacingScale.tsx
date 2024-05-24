import * as React from "react";
import { Box, DesignSystemProvider, Inline, Stack, responsiveProperties } from "../snippets";
import { defaultMessages } from "@buildo/bento-design-system/lib/defaultMessages/en";

const SpacePoint = ({ space }: { space: string }) => (
  <Box style={{ height: 20, width: space }} background="primarySolidEnabledBackground" />
);

export function SpacingScale() {
  return (
    <DesignSystemProvider defaultMessages={defaultMessages}>
      <Stack space={16}>
        {Object.entries(responsiveProperties.gap).map(([name, space]) => (
          <Inline key={name} space={16} alignY="center">
            <Box style={{ width: 32 }}>{name}</Box>
            <SpacePoint space={String(space)} />
          </Inline>
        ))}
      </Stack>
    </DesignSystemProvider>
  );
}

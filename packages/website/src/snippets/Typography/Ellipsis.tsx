import * as React from "react";
import { Body, Box, Stack } from "..";

export default function EllipsisExample() {
  return (
    <Stack space={16}>
      <Box style={{ width: 200 }} background="softIndigo" padding={8}>
        <Body size="large">Very long string which will NOT be truncated.</Body>
      </Box>
      <Box style={{ width: 200 }} background="softIndigo" padding={8}>
        <Body size="large" ellipsis>
          Very long string which WILL be truncated.
        </Body>
      </Box>
    </Stack>
  );
}

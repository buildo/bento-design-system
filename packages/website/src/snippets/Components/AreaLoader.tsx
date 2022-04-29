import * as React from "react";
import { AreaLoader, Box } from "..";

export default function AreaLoaderExample() {
  return (
    <Box position="relative" style={{ height: 200 }}>
      <AreaLoader message="Loading..." />
    </Box>
  );
}

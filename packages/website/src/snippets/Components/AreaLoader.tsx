import * as React from "react";
import { AreaLoader, Box } from "..";
import { formatMessage } from "../formatMessage";

export default function AreaLoaderExample() {
  return (
    <Box position="relative" style={{ height: 200 }}>
      <AreaLoader message={formatMessage("Loading...")} />
    </Box>
  );
}

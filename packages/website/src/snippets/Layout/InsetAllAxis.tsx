import * as React from "react";
import { Box, Inset, Placeholder } from "..";

export default function InsetAllAxis() {
  return (
    <Box background="softYellow" style={{ width: "fit-content" }}>
      <Inset space={16}>
        <Placeholder width={200} />
      </Inset>
    </Box>
  );
}

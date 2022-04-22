import * as React from "react";
import { Box, Inset, Placeholder } from "..";

export default function InsetHorizontalAndVertical() {
  return (
    <Box background="softYellow" style={{ width: "fit-content" }}>
      <Inset spaceX={40} spaceY={16}>
        <Placeholder width={200} />
      </Inset>
    </Box>
  );
}

import * as React from "react";
import { Box, IconWarning, Tooltip } from "..";

export default function TooltipExample() {
  return (
    <Tooltip
      content="Tooltip message"
      trigger={(ref, props) => (
        <Box ref={ref} {...props} display="inline-block">
          <IconWarning size={16} />
        </Box>
      )}
    />
  );
}

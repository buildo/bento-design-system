import * as React from "react";
import { Box, IconWarning, Tooltip } from "..";
import { formatMessage } from "../formatMessage";

export default function TooltipExample() {
  return (
    <Tooltip
      content={formatMessage("Tooltip message")}
      trigger={(ref, props) => (
        <Box ref={ref} {...props} display="inline-block">
          <IconWarning size={16} />
        </Box>
      )}
    />
  );
}

import { useSeparator } from "@react-aria/separator";
import { vars } from "../vars.css";
import { Box } from "../internal";
import { divider } from "./Divider.css";

export function Divider() {
  const { separatorProps } = useSeparator({});

  return (
    <Box
      {...separatorProps}
      className={divider}
      color={undefined}
      style={{ background: vars.outline.decorative }}
    />
  );
}

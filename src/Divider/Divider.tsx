import { useSeparator } from "@react-aria/separator";
import { Box } from "../internal";
import { divider } from "./Divider.css";

export function Divider() {
  const { separatorProps } = useSeparator({});

  return <Box {...separatorProps} className={divider} color={undefined} />;
}

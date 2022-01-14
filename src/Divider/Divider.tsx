import { useSeparator } from "@react-aria/separator";
import { Box } from "../internal";
import { divider } from "./Divider.css";

type Props = {};

export function Divider(props: Props) {
  const { separatorProps } = useSeparator(props);

  return <Box {...separatorProps} className={divider} color={undefined} />;
}

import { useSeparator } from "@react-aria/separator";
import { Box } from "../Box/Box";
import { divider } from "./Divider.css";

type Props = {};

export function Divider(props: Props) {
  const { separatorProps } = useSeparator(props);

  return <Box {...separatorProps} className={divider} atoms={{ color: undefined }} />;
}

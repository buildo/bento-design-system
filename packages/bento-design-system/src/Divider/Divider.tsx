import { useSeparator } from "@react-aria/separator";
import { Box } from "../internal";
import { divider } from "./Divider.css";

type Props = {
  orientation?: "horizontal" | "vertical";
};
export function Divider({ orientation = "horizontal" }: Props) {
  const { separatorProps } = useSeparator({ orientation });

  return <Box {...separatorProps} className={divider({ orientation })} color={undefined} />;
}

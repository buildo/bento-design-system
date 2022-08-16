import { useSeparator } from "@react-aria/separator";
import { useBentoConfig } from "../BentoConfigProvider";
import { Box } from "../Box/Box";
import { divider } from "./Divider.css";

type Props = {
  orientation?: "horizontal" | "vertical";
};
export function Divider({ orientation = "horizontal" }: Props) {
  const { separatorProps } = useSeparator({ orientation });

  return <Box {...separatorProps} className={divider({ orientation })} />;
}

export function DecorativeDivider() {
  const config = useBentoConfig().decorativeDivider;
  const { separatorProps } = useSeparator({});

  return (
    <Box
      {...separatorProps}
      className={divider({ orientation: "horizontal" })}
      color={config.color}
      style={{ background: "currentColor", height: config.height }}
      borderRadius={config.radius || undefined}
    />
  );
}

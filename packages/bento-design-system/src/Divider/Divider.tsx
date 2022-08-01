import { useSeparator } from "@react-aria/separator";
import { BoxType } from "../Box/createBentoBox";
import { bentoSprinkles, Box } from "../internal";
import { DecorativeDividerConfig } from "./Config";
import { divider } from "./Divider.css";

type Props = {
  orientation?: "horizontal" | "vertical";
};
export function Divider({ orientation = "horizontal" }: Props) {
  const { separatorProps } = useSeparator({ orientation });

  return <Box {...separatorProps} className={divider({ orientation })} />;
}

export function createDecorativeDivider<AtomsFn extends typeof bentoSprinkles>(
  config: DecorativeDividerConfig<AtomsFn>,
  { Box }: { Box: BoxType<AtomsFn> }
) {
  return function DecorativeDivider() {
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
  };
}

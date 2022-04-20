import { useSeparator } from "@react-aria/separator";
import { Box } from "../internal";
import { verticalDivider, horizontalDivider } from "./Divider.css";

export function VerticalDivider() {
  const { separatorProps } = useSeparator({ orientation: "vertical" });

  return (
    <Box
      {...separatorProps}
      className={verticalDivider}
      color={undefined}
      background="outlineDecorative"
    />
  );
}

export function HorizontalDivider() {
  const { separatorProps } = useSeparator({});

  return (
    <Box
      {...separatorProps}
      className={horizontalDivider}
      color={undefined}
      background="outlineDecorative"
    />
  );
}

type Props = {
  kind: "horizontal" | "vertical";
};
export function Divider({ kind }: Props) {
  switch (kind) {
    case "horizontal":
      return <HorizontalDivider />;
    case "vertical":
      return <VerticalDivider />;
  }
}

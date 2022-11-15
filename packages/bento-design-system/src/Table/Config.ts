import { Placement } from "@floating-ui/core";
import { IconProps } from "../Icons";
import { IllustrationProps } from "../Illustrations";
import { BentoSprinkles } from "../internal";

export type TableConfig = {
  headerInfoIcon: (props: IconProps) => JSX.Element;
  emptyIllustration: (props: IllustrationProps) => JSX.Element;
  headerBackgroundColor: BentoSprinkles["background"];
  headerForegroundColor: BentoSprinkles["color"];
  hintPlacement: Placement;
  cellTooltipPlacement: Placement;
};

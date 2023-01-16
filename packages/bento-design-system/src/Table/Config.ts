import { TooltipPlacement } from "../Field/FieldProps";
import { IconProps } from "../Icons";
import { IllustrationProps } from "../Illustrations";
import { BentoSprinkles } from "../internal";

export type TableConfig = {
  headerInfoIcon: (props: IconProps) => JSX.Element;
  emptyIllustration: (props: IllustrationProps) => JSX.Element;
  headerBackgroundColor: BentoSprinkles["background"];
  headerForegroundColor: BentoSprinkles["color"];
  hintPlacement: TooltipPlacement;
  cellTooltipPlacement: TooltipPlacement;
  evenRowsBackgroundColor: BentoSprinkles["background"];
  paddingHeader: { paddingX: BentoSprinkles["paddingX"]; paddingY: BentoSprinkles["paddingY"] };
  paddingCell: { paddingX: BentoSprinkles["paddingX"]; paddingY: BentoSprinkles["paddingY"] };
  firstColumnExtraLeftPadding: BentoSprinkles["padding"];
  lastColumnExtraRightPadding: BentoSprinkles["padding"];
};

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
  padding: {
    header: { paddingX: BentoSprinkles["paddingX"]; paddingY: BentoSprinkles["paddingY"] };
    defaultCell: { paddingX: BentoSprinkles["paddingX"]; paddingY: BentoSprinkles["paddingY"] };
    buttonCell:
      | { paddingX: BentoSprinkles["paddingX"]; paddingY: BentoSprinkles["paddingY"] }
      | undefined;
    buttonLinkCell:
      | { paddingX: BentoSprinkles["paddingX"]; paddingY: BentoSprinkles["paddingY"] }
      | undefined;
    textCell:
      | { paddingX: BentoSprinkles["paddingX"]; paddingY: BentoSprinkles["paddingY"] }
      | undefined;
    textWithIconCell:
      | {
          paddingX: BentoSprinkles["paddingX"];
          paddingY: BentoSprinkles["paddingY"];
        }
      | undefined;
    chipCell:
      | { paddingX: BentoSprinkles["paddingX"]; paddingY: BentoSprinkles["paddingY"] }
      | undefined;
    labelCell:
      | { paddingX: BentoSprinkles["paddingX"]; paddingY: BentoSprinkles["paddingY"] }
      | undefined;
    linkCell:
      | { paddingX: BentoSprinkles["paddingX"]; paddingY: BentoSprinkles["paddingY"] }
      | undefined;
    iconCell:
      | { paddingX: BentoSprinkles["paddingX"]; paddingY: BentoSprinkles["paddingY"] }
      | undefined;
    iconButtonCell:
      | { paddingX: BentoSprinkles["paddingX"]; paddingY: BentoSprinkles["paddingY"] }
      | undefined;
  };
  boundaryPadding: BentoSprinkles["padding"];
};

import { TooltipPlacement } from "../Field/FieldProps";
import { IconProps } from "../Icons";
import { IllustrationProps } from "../Illustrations";
import { BentoSprinkles } from "../internal";

type CellPaddingConfig = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
};

export type TableConfig = {
  headerInfoIcon: (props: IconProps) => JSX.Element;
  emptyIllustration: (props: IllustrationProps) => JSX.Element;
  headerBackgroundColor: BentoSprinkles["background"];
  headerForegroundColor: BentoSprinkles["color"];
  hintPlacement: TooltipPlacement;
  cellTooltipPlacement: TooltipPlacement;
  evenRowsBackgroundColor: BentoSprinkles["background"];
  padding: {
    header: CellPaddingConfig;
    defaultCell: CellPaddingConfig;
    buttonCell: CellPaddingConfig | undefined;
    buttonLinkCell: CellPaddingConfig | undefined;
    textCell: CellPaddingConfig | undefined;
    textWithIconCell: CellPaddingConfig | undefined;
    chipCell: CellPaddingConfig | undefined;
    labelCell: CellPaddingConfig | undefined;
    linkCell: CellPaddingConfig | undefined;
    iconCell: CellPaddingConfig | undefined;
    iconButtonCell: CellPaddingConfig | undefined;
  };
  boundaryPadding: BentoSprinkles["padding"];
};

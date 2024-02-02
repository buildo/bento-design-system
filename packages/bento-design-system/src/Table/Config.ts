import { TooltipPlacement } from "../Field/FieldProps";
import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { vars } from "../vars.css";
import { LabelProps } from "../Typography/Label/Label";
import { BodyProps } from "../Typography/Body/Body";
import { ComponentProps } from "react";
import {
  ButtonCell,
  ButtonLinkCell,
  IconButtonCell,
  IconCell,
  LabelCell,
  LinkCell,
  TextCell,
  TextWithIconCell,
} from "./cells";

type CellPaddingConfig = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
};

export type TableConfig = {
  headerInfoIcon: (props: IconProps) => JSX.Element;
  emptyIcon: (props: IconProps) => JSX.Element;
  headerBackgroundColor: BentoSprinkles["background"];
  headerForegroundColor: BentoSprinkles["color"];
  headerSize: LabelProps["size"];
  footerBackgroundColor: BentoSprinkles["background"];
  footerForegroundColor: BentoSprinkles["color"];
  footerSize: LabelProps["size"];
  hintPlacement: TooltipPlacement;
  cellTooltipPlacement: TooltipPlacement;
  evenRowsBackgroundColor: BentoSprinkles["background"];
  // NOTE(gabro): not using BentoSprinkles["background"] because we only want
  // "plain" values to use directly in CSS and not conditional objects like
  // { default: ..., hover: ... }
  selectedRowBackgroundColor: keyof typeof vars.backgroundColor;
  padding: {
    header: CellPaddingConfig;
    footer: CellPaddingConfig;
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
  defaultCellOptions: {
    defaultCell: { size: BodyProps["size"] };
    buttonCell: Required<ComponentProps<typeof ButtonCell>["options"]>;
    buttonLinkCell: Required<ComponentProps<typeof ButtonLinkCell>["options"]>;
    textCell: Required<ComponentProps<typeof TextCell>["options"]>;
    textWithIconCell: Required<ComponentProps<typeof TextWithIconCell>["options"]>;
    labelCell: Required<ComponentProps<typeof LabelCell>["options"]>;
    linkCell: Required<ComponentProps<typeof LinkCell>["options"]>;
    iconCell: Required<ComponentProps<typeof IconCell>["options"]>;
    iconButtonCell: Required<ComponentProps<typeof IconButtonCell>["options"]>;
  };
  boundaryPadding: BentoSprinkles["padding"];
  columnDividers: boolean;
};

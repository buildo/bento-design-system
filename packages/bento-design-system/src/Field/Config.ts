import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { BodyProps } from "../Typography/Body/Body";
import { LabelProps } from "../Typography/Label/Label";
import { Children } from "../util/Children";
import { TooltipPlacement } from "./FieldProps";
import { statusProperties } from "../util/atoms";
import { IconButtonProps } from "../IconButton/IconButton";

export type FieldConfig = {
  label: {
    size: LabelProps["size"];
    color: "primary" | "secondary";
  };
  assistiveText: {
    size: BodyProps["size"];
    paddingLeft: BentoSprinkles["paddingX"];
  };
  internalSpacing: BentoSprinkles["gap"];
  tip: {
    icon: (props: IconProps) => Children;
    iconSize: IconProps["size"];
    placement: TooltipPlacement;
  };
};

export type InputConfig = {
  internalSpacing: BentoSprinkles["gap"];
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  radius: BentoSprinkles["borderRadius"];
  background: {
    default: BentoSprinkles["background"];
    // NOTE(gabro): not using BentoSprinkles["background"] because we only want
    // "plain" values to use directly in CSS and not conditional objects like
    // { default: ..., hover: ... }
    readOnly: keyof typeof statusProperties.background;
  };
  fontSize: BodyProps["size"];
  passwordShowIcon: (props: IconProps) => Children;
  passwordHideIcon: (props: IconProps) => Children;
  passwordIconSize: IconButtonProps["size"];
};

export type SelectionControlGroupConfig = {
  internalSpacing: {
    horizontal: BentoSprinkles["gap"];
    vertical: BentoSprinkles["gap"];
  };
};

export type SelectionControlConfig = {
  controlLabelSpacing: BentoSprinkles["gap"];
  labelPaddingTop: number;
  labelSize: BodyProps["size"];
  checkboxBorderRadius: BentoSprinkles["borderRadius"];
};

import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { BodyProps } from "../Typography/Body/Body";
import { LabelProps } from "../Typography/Label/Label";
import { Children } from "../util/Children";
import { TooltipPlacement } from "./FieldProps";

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
    readOnly: BentoSprinkles["background"] & string;
  };
  fontSize: BodyProps["size"];
  passwordShowIcon: (props: IconProps) => Children;
  passwordHideIcon: (props: IconProps) => Children;
  passwordIconSize: IconProps["size"];
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

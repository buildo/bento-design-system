import { FunctionComponent } from "react";
import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { BodyProps } from "../Typography/Body/Body";
import { LabelProps } from "../Typography/Label/Label";

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
    icon: FunctionComponent<IconProps>;
    iconSize: IconProps["size"];
  };
};

export type InputConfig = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  radius: BentoSprinkles["borderRadius"];
  fontSize: BodyProps["size"];
};

export type SelectionControlGroupConfig = {
  paddingY: BentoSprinkles["gap"];
  internalSpacing: {
    horizontal: BentoSprinkles["gap"];
    vertical: BentoSprinkles["gap"];
  };
};

export type SelectionControlConfig = {
  controlLabelSpacing: BentoSprinkles["gap"];
  labelPaddingTop: number;
  labelSize: BodyProps["size"];
};

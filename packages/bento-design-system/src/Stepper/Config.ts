import { FunctionComponent } from "react";
import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { LabelProps } from "../Typography/Label/Label";

export type StepperConfig = {
  spaceBetweenSteps: BentoSprinkles["gap"];
  internalSpacing: BentoSprinkles["gap"];
  labelSize: LabelProps["size"];
  numberSize: LabelProps["size"];
  labelUppercase: boolean;
  doneIcon: FunctionComponent<IconProps>;
};

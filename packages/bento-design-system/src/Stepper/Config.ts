import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { LabelProps } from "../Typography/Label/Label";
import { Children } from "../util/Children";

export type StepperConfig = {
  spaceBetweenSteps: BentoSprinkles["gap"];
  internalSpacing: BentoSprinkles["gap"];
  labelSize: LabelProps["size"];
  numberSize: LabelProps["size"];
  labelUppercase: boolean;
  doneIcon: (props: IconProps) => Children;
};

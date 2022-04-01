import { BentoSprinkles } from "../internal";
import { LabelProps } from "../Typography/Label/Label";

export type SliderConfig = {
  valueSize: LabelProps["size"];
  labelsSize: LabelProps["size"];
  internalSpacing: BentoSprinkles["gap"];
  trailColor: BentoSprinkles["color"];
};

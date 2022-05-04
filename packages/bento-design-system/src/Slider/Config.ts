import { BentoSprinkles } from "../internal";
import { LabelProps } from "../Typography/Label/Label";

export type SliderConfig = {
  valueSize: LabelProps["size"];
  labelsSize: LabelProps["size"];
  internalSpacing: BentoSprinkles["gap"];
  trailColor: BentoSprinkles["color"];
  trailRadius: BentoSprinkles["borderRadius"];
  trailHeight: number;
  thumbWidth: NonNullable<Exclude<BentoSprinkles["width"], "full">>;
  thumbHeight: NonNullable<Exclude<BentoSprinkles["height"], "full">>;
  thumbRadius: BentoSprinkles["borderRadius"];
  thumbInternalSpacing: BentoSprinkles["gap"];
};

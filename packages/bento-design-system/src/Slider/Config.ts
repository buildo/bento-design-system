import { BentoSprinkles } from "../internal";
import { LabelProps } from "../Typography/Label/Label";
import { BorderRadiusConfig } from "../util/BorderRadiusConfig";

export type SliderConfig = {
  valueSize: LabelProps["size"];
  labelsSize: LabelProps["size"];
  internalSpacing: BentoSprinkles["gap"];
  trailColor: BentoSprinkles["color"];
  trailRadius: BorderRadiusConfig;
  trailHeight: number;
  thumbWidth: NonNullable<Exclude<BentoSprinkles["width"], "full">>;
  thumbHeight: NonNullable<Exclude<BentoSprinkles["height"], "full">>;
  thumbRadius: BorderRadiusConfig;
  thumbInternalSpacing: BentoSprinkles["gap"];
};

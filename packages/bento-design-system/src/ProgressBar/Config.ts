import { BentoSprinkles } from "../internal";
import { BorderRadiusConfig } from "../util/BorderRadiusConfig";

export type ProgressBarConfig = {
  height: number;
  radius: BorderRadiusConfig;
  discreteInternalSpacing: BentoSprinkles["gap"];
};

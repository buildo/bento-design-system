import { BoxProps } from "../Box/createBentoBox";
import { bentoSprinkles, BentoSprinkles } from "../internal";

export type DecorativeDividerConfig<AtomsFn extends typeof bentoSprinkles> = {
  height: number;
  radius: 0 | Extract<BentoSprinkles["borderRadius"], "circledX">;
  color: BoxProps<AtomsFn>["color"];
};

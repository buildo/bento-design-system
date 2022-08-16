import { BentoSprinkles } from "../internal";

export type DecorativeDividerConfig = {
  height: number;
  radius: 0 | Extract<BentoSprinkles["borderRadius"], "circledX">;
  color: BentoSprinkles["color"];
};

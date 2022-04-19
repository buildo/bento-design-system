import { BentoSprinkles } from "../internal";

export type DividerConfig = {
  height: number;
  radius: 0 | Extract<BentoSprinkles["borderRadius"], "circledX">;
};

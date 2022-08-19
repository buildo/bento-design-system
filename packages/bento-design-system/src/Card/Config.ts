import { BentoSprinkles } from "../internal";

export type CardConfig = {
  defaultRadius: Exclude<BentoSprinkles["borderRadius"], "circled">;
};

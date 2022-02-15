import { BentoSprinkles } from "src/internal";

export type SelectionControlConfig = {
  paddingY: BentoSprinkles["gap"];
  controlLabelSpacing: BentoSprinkles["gap"];
  internalSpacing: {
    horizontal: BentoSprinkles["gap"];
    vertical: BentoSprinkles["gap"];
  };
};

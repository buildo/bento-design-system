import { ComponentProps } from "react";
import { Label } from "..";
import { BentoSprinkles } from "../internal";

export type TooltipConfig = {
  padding: BentoSprinkles["padding"];
  radius: BentoSprinkles["borderRadius"];
  labelSize: ComponentProps<typeof Label>["size"];
};

import { ComponentProps } from "react";
import { Label } from "..";
import { BentoSprinkles } from "../internal";

export type TooltipConfig = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  radius: BentoSprinkles["borderRadius"];
  labelSize: ComponentProps<typeof Label>["size"];
};

import { ComponentProps } from "react";
import { Label } from "..";
import { BentoSprinkles } from "../internal";
import { BorderRadiusConfig } from "../util/BorderRadiusConfig";

export type TooltipConfig = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  radius: BorderRadiusConfig;
  labelSize: ComponentProps<typeof Label>["size"];
};

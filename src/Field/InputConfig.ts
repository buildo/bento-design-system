import { ComponentProps } from "react";
import { Body } from "../";
import { BentoSprinkles } from "../internal";

export type InputConfig = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  radius: BentoSprinkles["borderRadius"];
  fontSize: ComponentProps<typeof Body>["size"];
};

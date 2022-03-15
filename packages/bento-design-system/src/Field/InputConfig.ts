import { ComponentProps } from "react";
import { Body } from "../";
import { BentoSprinkles } from "../internal";

export type InputConfig = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  radius: BentoSprinkles["borderRadius"];
  fontSize: ComponentProps<typeof Body>["size"];
};

export const defaultInputConfig: InputConfig = {
  radius: 4,
  paddingX: 16,
  paddingY: 16,
  fontSize: "large",
};

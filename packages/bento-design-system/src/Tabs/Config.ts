import { BentoSprinkles } from "../internal";
import { LabelProps } from "../Typography/Label/Label";

export type TabsConfig = {
  radius: BentoSprinkles["borderRadius"];
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  labelSize: LabelProps["size"];
};

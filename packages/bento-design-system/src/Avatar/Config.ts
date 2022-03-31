import { ComponentProps, FunctionComponent } from "react";
import { IconProps } from "../Icons";
import { Label } from "../Typography/Label/Label";
import { BentoSprinkles } from "../internal";

export type AvatarConfig = {
  width: BentoSprinkles["width"];
  height: BentoSprinkles["height"];
  radius: BentoSprinkles["borderRadius"];
  labelSize: ComponentProps<typeof Label>["size"];
  icon: FunctionComponent<IconProps>;
};

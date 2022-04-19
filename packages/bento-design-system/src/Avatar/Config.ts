import { ComponentProps } from "react";
import { IconProps } from "../Icons";
import { Label } from "../Typography/Label/Label";
import { BentoSprinkles } from "../internal";
import { Children } from "../util/Children";

export type AvatarConfig = {
  width: BentoSprinkles["width"];
  height: BentoSprinkles["height"];
  radius: BentoSprinkles["borderRadius"];
  labelSize: ComponentProps<typeof Label>["size"];
  icon: (props: IconProps) => Children;
  iconSize: IconProps["size"];
  outline: Extract<
    BentoSprinkles["boxShadow"],
    "none" | "outlineInteractive" | "outlineDecorative" | "outlineContainer"
  >;
};

import { ComponentProps } from "react";
import { IconProps } from "../Icons";
import { Label } from "../Typography/Label/Label";
import { BentoSprinkles } from "../internal";
import { Children } from "../util/Children";
import { BorderRadiusConfig } from "../util/BorderRadiusConfig";

export type AvatarConfig = {
  width: number;
  height: number;
  radius: BorderRadiusConfig;
  labelSize: ComponentProps<typeof Label>["size"];
  icon: (props: IconProps) => Children;
  iconSize: IconProps["size"];
  outline: Extract<
    BentoSprinkles["boxShadow"],
    "none" | "outlineInteractive" | "outlineDecorative" | "outlineContainer"
  >;
};

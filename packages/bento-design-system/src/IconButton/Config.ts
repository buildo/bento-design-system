import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { BorderRadiusConfig } from "../util/BorderRadiusConfig";

export type IconButtonConfig = {
  radius: BorderRadiusConfig;
  padding: Record<
    Exclude<IconProps["size"], 40>,
    | BentoSprinkles["padding"]
    | { paddingX: BentoSprinkles["paddingX"]; paddingY: BentoSprinkles["paddingY"] }
  >;
};

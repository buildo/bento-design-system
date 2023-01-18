import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";

export type IconButtonConfig = {
  radius: BentoSprinkles["borderRadius"];
  padding: Record<
    IconProps["size"],
    { paddingX: BentoSprinkles["paddingX"]; paddingY: BentoSprinkles["paddingY"] }
  >;
};

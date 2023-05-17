import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";

export type IconButtonConfig = {
  radius: BentoSprinkles["borderRadius"];
  padding: Record<
    Exclude<IconProps["size"], 40>,
    | BentoSprinkles["padding"]
    | { paddingX: BentoSprinkles["paddingX"]; paddingY: BentoSprinkles["paddingY"] }
  >;
};

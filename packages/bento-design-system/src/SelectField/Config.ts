import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { ListConfig } from "../List/Config";
import { Children } from "../util/Children";

export type DropdownConfig = {
  elevation: "small" | "medium" | "large";
  radius: BentoSprinkles["borderRadius"];
  list: ListConfig;
  menuPaddingY: BentoSprinkles["paddingY"];
  defaultMenuSize: "medium" | "large";
  openIndicatorIcon: (props: IconProps) => Children;
  openIndicatorIconSize: IconProps["size"];
};

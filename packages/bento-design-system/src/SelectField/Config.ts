import { ChipProps } from "../Chip/Chip";
import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { ListConfig } from "../List/Config";
import { BorderRadiusConfig } from "../util/BorderRadiusConfig";
import { Children } from "../util/Children";

export type DropdownConfig = {
  elevation: "small" | "medium" | "large";
  radius: BorderRadiusConfig;
  list: ListConfig;
  menuPaddingX: BentoSprinkles["paddingX"];
  menuPaddingY: BentoSprinkles["paddingY"];
  defaultMenuSize: "medium" | "large";
  openIndicatorIcon: (props: IconProps) => Children;
  openIndicatorIconSize: IconProps["size"];
  chipColor: ChipProps["color"];
  chipSpacing: BentoSprinkles["gap"];
};

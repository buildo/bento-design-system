import { InputConfig } from "../Field/Config";
import { IconProps } from "../Icons";
import { Children } from "../util/Children";

export type SearchBarConfig = Omit<InputConfig, "iconSize"> & {
  clearIcon: (props: IconProps) => Children;
  clearIconSize: IconProps["size"];
  searchIcon: (props: IconProps) => Children;
  searchIconSize: IconProps["size"];
};

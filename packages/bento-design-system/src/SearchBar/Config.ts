import { FunctionComponent } from "react";
import { InputConfig } from "../Field/Config";
import { IconProps } from "../Icons";

export type SearchBarConfig = Omit<InputConfig, "iconSize"> & {
  clearIcon: FunctionComponent<IconProps>;
  clearIconSize: IconProps["size"];
  searchIcon: FunctionComponent<IconProps>;
  searchIconSize: IconProps["size"];
};

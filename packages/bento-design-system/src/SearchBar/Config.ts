import { FunctionComponent } from "react";
import { InputConfig } from "../Field/Config";
import { IconProps } from "../Icons";

export type SearchBarConfig = InputConfig & {
  clearIcon: FunctionComponent<IconProps>;
  searchIcon: FunctionComponent<IconProps>;
};

import { LocalizedString } from "..";
import { IconProps } from "../Icons/IconProps";

export type IconButtonProps = {
  label: LocalizedString;
  onPress: () => void;
  size: IconProps["size"];
  tabIndex?: number;
  color?: IconProps["color"];
};

import { IconButtonProps } from "../IconButton/IconButton";
import { IconProps } from "../Icons";
import { Children } from "../util/Children";

export type ReadOnlyFieldConfig = {
  copyIcon: (props: IconProps) => Children;
  copyIconSize: IconButtonProps["size"];
};

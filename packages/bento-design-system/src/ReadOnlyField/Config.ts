import { IconProps } from "../Icons";
import { Children } from "../util/Children";

export type ReadOnlyFieldConfig = {
  copyIcon: (props: IconProps) => Children;
  copyIconSize: IconProps["size"];
};

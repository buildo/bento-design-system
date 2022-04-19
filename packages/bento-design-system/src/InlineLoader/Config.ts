import { IconProps } from "../Icons";
import { BodyProps } from "../Typography/Body/Body";
import { Children } from "../util/Children";

export type InlineLoaderConfig = {
  messageSize: BodyProps["size"];
  spinnerIcon: (props: IconProps) => Children;
  spinnerIconSize: IconProps["size"];
};

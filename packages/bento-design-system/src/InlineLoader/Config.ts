import { FunctionComponent } from "react";
import { IconProps } from "../Icons";
import { BodyProps } from "../Typography/Body/Body";

export type InlineLoaderConfig = {
  messageSize: BodyProps["size"];
  spinnerIcon: FunctionComponent<IconProps>;
  spinnerIconSize: IconProps["size"];
};

import { FunctionComponent } from "react";
import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { TitleProps } from "../Typography/Title/Title";

export type ModalConfig = {
  padding: BentoSprinkles["padding"];
  radius: BentoSprinkles["borderRadius"];
  titleSize: TitleProps["size"];
  closeIcon: FunctionComponent<IconProps>;
  closeIconSize: IconProps["size"];
};

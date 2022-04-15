import { FunctionComponent } from "react";
import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { TitleProps } from "../Typography/Title/Title";
import { ModalSize } from "./createModal";

type SizeConfig<T> = { [k in ModalSize]: T };
export type ModalConfig = {
  padding: BentoSprinkles["padding"];
  radius: BentoSprinkles["borderRadius"];
  titleSize: TitleProps["size"];
  closeIcon: FunctionComponent<IconProps>;
  closeIconSize: IconProps["size"];
  width: SizeConfig<number>;
  elevation: "none" | "small" | "medium" | "large";
};

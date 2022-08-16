import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { TitleProps } from "../Typography/Title/Title";
import { ModalKind, ModalSize } from "./Modal";
import { Children } from "../util/Children";
import { ActionsProps } from "../Actions/Actions";

type SizeConfig<T> = { [k in ModalSize]: T };
export type ModalConfig = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  radius: BentoSprinkles["borderRadius"];
  titleSize: TitleProps["size"];
  closeIcon: (props: IconProps) => Children;
  closeIconSize: IconProps["size"];
  width: SizeConfig<number>;
  elevation: "none" | "small" | "medium" | "large";
  titleIcon: { [k in Exclude<ModalKind, "normal">]: (props: IconProps) => Children };
  titleIconSize: IconProps["size"];
  defaultErrorBannerWidth: NonNullable<ActionsProps["errorBannerWidth"]>;
};

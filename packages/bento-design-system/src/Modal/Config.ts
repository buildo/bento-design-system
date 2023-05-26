import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { TitleProps } from "../Typography/Title/Title";
import { ModalKind, ModalSize } from "./Modal";
import { Children } from "../util/Children";
import { ActionsProps } from "../Actions/Actions";
import { IconButtonProps } from "../IconButton/IconButton";
import { BorderRadiusConfig } from "../util/BorderRadiusConfig";

type SizeConfig<T> = { [k in ModalSize]: T };
export type ModalConfig = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  radius: BorderRadiusConfig;
  titleSize: TitleProps["size"];
  closeIcon: (props: IconProps) => Children;
  closeIconSize: IconButtonProps["size"];
  width: SizeConfig<number>;
  elevation: "none" | "small" | "medium" | "large";
  titleIcon: { [k in Exclude<ModalKind, "normal">]: (props: IconProps) => Children };
  titleIconSize: IconProps["size"];
  defaultErrorBannerWidth: NonNullable<ActionsProps["errorBannerWidth"]>;
  actionsSize: NonNullable<ActionsProps["size"]>;
  internalSpacing: BentoSprinkles["gap"];
};

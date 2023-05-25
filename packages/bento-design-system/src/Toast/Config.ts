import { ButtonProps } from "../Button/Button";
import { IconButtonProps } from "../IconButton/IconButton";
import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { BodyProps } from "../Typography/Body/Body";
import { BorderRadiusConfig } from "../util/BorderRadiusConfig";
import { Children } from "../util/Children";

export type ToastConfig = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  radius: BorderRadiusConfig;
  messageSize: BodyProps["size"];
  closeIcon: (props: IconProps) => Children;
  closeIconSize: IconButtonProps["size"];
  outline: boolean;
  internalSpacing: BentoSprinkles["gap"];
  elevation: "none" | "small" | "medium" | "large";
  buttonKind: ButtonProps["kind"];
  buttonSize: NonNullable<ButtonProps["size"]>;
};

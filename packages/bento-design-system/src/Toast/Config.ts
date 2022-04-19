import { FunctionComponent } from "react";
import { ButtonProps } from "../Button/createButton";
import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { BodyProps } from "../Typography/Body/Body";

export type ToastConfig = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  radius: BentoSprinkles["borderRadius"];
  messageSize: BodyProps["size"];
  closeIcon: FunctionComponent<IconProps>;
  closeIconSize: IconProps["size"];
  smallButtonPaddingY: BentoSprinkles["paddingY"];
  outline: boolean;
  internalSpacing: BentoSprinkles["gap"];
  elevation: "none" | "small" | "medium" | "large";
  buttonKind: ButtonProps["kind"];
  buttonSize: NonNullable<ButtonProps["size"]>;
};

import { ButtonProps } from "../Button/Button";
import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { BodyProps } from "../Typography/Body/Body";
import { Children } from "../util/Children";

export type ToastConfig = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  radius: BentoSprinkles["borderRadius"];
  messageSize: BodyProps["size"];
  closeIcon: (props: IconProps) => Children;
  closeIconSize: IconProps["size"];
  outline: boolean;
  internalSpacing: BentoSprinkles["gap"];
  elevation: "none" | "small" | "medium" | "large";
  buttonKind: ButtonProps["kind"];
  buttonSize: NonNullable<ButtonProps["size"]>;
};

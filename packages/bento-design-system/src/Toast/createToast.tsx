import { ComponentProps, FunctionComponent } from "react";
import { BentoSprinkles } from "../internal";
import { Body, ButtonProps, IconButtonProps, IconClose, IconProps, TextChildren } from "..";
import { createToastInternal } from "./createToastInternal";
import { createToastContainer } from "./createToastContainer";
import { createToastProvider } from "./createToastProvider";

export type ToastConfig = {
  paddingX?: BentoSprinkles["paddingX"];
  paddingY?: BentoSprinkles["paddingY"];
  radius?: BentoSprinkles["borderRadius"];
  messageSize?: ComponentProps<typeof Body>["size"];
  closeIcon?: FunctionComponent<IconProps>;
  closeIconSize?: IconProps["size"];
  smallButtonPaddingY: BentoSprinkles["paddingY"];
};

export type ToastProps = {
  kind: "informative" | "positive" | "warning" | "negative" | "secondary";
  message: TextChildren;
  action?: Pick<ButtonProps, "onPress" | "label">;
  onDismiss?: () => void;
};

export function createToast(
  Button: FunctionComponent<ButtonProps>,
  IconButton: FunctionComponent<IconButtonProps>,
  {
    paddingX = 16,
    paddingY = 16,
    radius = 8,
    messageSize = "medium",
    closeIcon = IconClose,
    closeIconSize = 12,
    smallButtonPaddingY,
  }: ToastConfig
) {
  const Toast = createToastInternal(Button, IconButton, {
    paddingX,
    paddingY,
    radius,
    messageSize,
    smallButtonPaddingY,
    closeIcon,
    closeIconSize,
  });
  const ToastContainer = createToastContainer(Toast);
  const ToastProvider = createToastProvider(ToastContainer);

  return { Toast, ToastProvider };
}

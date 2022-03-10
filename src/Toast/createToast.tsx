import { ComponentProps, FunctionComponent } from "react";
import { BentoSprinkles } from "../internal";
import { Body, ButtonProps, TextChildren } from "..";
import { createToastInternal } from "./createToastInternal";
import { createToastContainer } from "./createToastContainer";
import { createToastProvider } from "./createToastProvider";

export type ToastConfig = {
  paddingX?: BentoSprinkles["paddingX"];
  paddingY?: BentoSprinkles["paddingY"];
  radius?: BentoSprinkles["borderRadius"];
  messageSize?: ComponentProps<typeof Body>["size"];
  mediumButtonPaddingX: BentoSprinkles["paddingY"];
};

export type ToastProps = {
  kind: "informative" | "positive" | "warning" | "negative" | "secondary";
  message: TextChildren;
  action?: Pick<ButtonProps, "onPress" | "label">;
};

export function createToast(
  Button: FunctionComponent<ButtonProps>,
  {
    paddingX = 16,
    paddingY = 16,
    radius = 8,
    messageSize = "medium",
    mediumButtonPaddingX,
  }: ToastConfig
) {
  const Toast = createToastInternal(Button, {
    paddingX,
    paddingY,
    mediumButtonPaddingX,
    radius,
    messageSize,
  });
  const ToastContainer = createToastContainer(Toast);
  const ToastProvider = createToastProvider(ToastContainer);

  return { Toast, ToastProvider };
}

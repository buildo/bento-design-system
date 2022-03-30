import { ComponentProps, FunctionComponent } from "react";
import { BentoSprinkles } from "../internal";
import {
  Body,
  ButtonProps,
  defaultButtonConfig,
  IconButtonProps,
  IconClose,
  IconProps,
  TextChildren,
} from "..";
import { createToastInternal } from "./createToastInternal";
import { createToastContainer } from "./createToastContainer";
import { createToastProvider } from "./createToastProvider";

export type ToastConfig = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  radius: BentoSprinkles["borderRadius"];
  messageSize: ComponentProps<typeof Body>["size"];
  closeIcon: FunctionComponent<IconProps>;
  closeIconSize: IconProps["size"];
  smallButtonPaddingY: BentoSprinkles["paddingY"];
};
export const defaultToastConfig: ToastConfig = {
  paddingX: 16,
  paddingY: 16,
  radius: 8,
  messageSize: "medium",
  closeIcon: IconClose,
  closeIconSize: 12,
  smallButtonPaddingY: defaultButtonConfig.paddingY.small,
};

type Props = {
  kind: "informative" | "positive" | "warning" | "negative" | "secondary";
  message: TextChildren;
  action?: Pick<ButtonProps, "onPress" | "label">;
  onDismiss?: () => void;
};

export function createToast(
  config: ToastConfig,
  components: {
    Button: FunctionComponent<ButtonProps>;
    IconButton: FunctionComponent<IconButtonProps>;
  }
) {
  const Toast = createToastInternal(config, components);
  const ToastContainer = createToastContainer(Toast);
  const ToastProvider = createToastProvider(ToastContainer);

  return { Toast, ToastProvider };
}

export type { Props as ToastProps };

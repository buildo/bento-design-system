import { FunctionComponent } from "react";
import { ButtonProps, IconButtonProps, Children } from "..";
import { createToastInternal } from "./createToastInternal";
import { createToastContainer } from "./createToastContainer";
import { createToastProvider } from "./createToastProvider";
import { ToastConfig } from "./Config";

type Props = {
  kind: "informative" | "positive" | "warning" | "negative" | "secondary";
  message: Children;
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

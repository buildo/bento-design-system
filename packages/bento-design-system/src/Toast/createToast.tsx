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

/**
 * Toasts are used to show temporary bits of information to the user in a non-obtrusive way.
 *
 * Toasts are created using the `useToast` hook, which returns a `showToast` function, which is
 * normally invoked inside an event handler.
 *
 * Toasts automatically disappear after a timeout, which can be configured globally in `BentoProvider`.
 */
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

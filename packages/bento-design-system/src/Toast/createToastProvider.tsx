import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { Children } from "../util/Children";
import { ToastProps } from "..";
import { ToastContext } from "./ToastContext";

type Props = {
  children?: Children;
  dismissAfterMs: number;
};
export type { Props as ToastProviderProps };

export function createToastProvider(ToastContainer: FunctionComponent<ToastProps>) {
  return function ToastProvider({ children, dismissAfterMs }: Props) {
    const [toastProps, setToastProps] = useState<ToastProps | null>(null);
    const timeoutRef = useRef<number | undefined>(undefined);
    useEffect(() => {
      return () => {
        clearTimeout(timeoutRef.current);
      };
    }, []);

    const hideToast = () => {
      clearTimeout(timeoutRef.current);
      setToastProps(null);
    };

    return (
      <ToastContext.Provider
        value={{
          showToast: useCallback(
            ({ dismissable, ...props }) => {
              setToastProps({ ...props, onDismiss: dismissable ? hideToast : undefined });
              clearTimeout(timeoutRef.current);
              timeoutRef.current = window.setTimeout(() => setToastProps(null), dismissAfterMs);
            },
            [dismissAfterMs]
          ),
        }}
      >
        {children}
        {toastProps && <ToastContainer {...toastProps} />}
      </ToastContext.Provider>
    );
  };
}

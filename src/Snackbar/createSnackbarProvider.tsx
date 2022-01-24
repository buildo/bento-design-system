import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { Children } from "../util/Children";
import { SnackbarProps } from "..";
import { SnackbarContext } from "./SnackbarContext";

type Props = {
  children?: Children;
  dismissAfterMs: number;
};

export function createSnackbarProvider(SnackbarContainer: FunctionComponent<SnackbarProps>) {
  return function SnackbarProvider({ children, dismissAfterMs }: Props) {
    const [snackbarProps, setSnackbarProps] = useState<SnackbarProps | null>(null);
    const timeoutRef = useRef<number | undefined>(undefined);
    useEffect(() => {
      return () => {
        clearTimeout(timeoutRef.current);
      };
    }, []);

    return (
      <SnackbarContext.Provider
        value={{
          showSnackbar: useCallback(
            (props) => {
              setSnackbarProps(props);
              clearTimeout(timeoutRef.current);
              timeoutRef.current = window.setTimeout(() => setSnackbarProps(null), dismissAfterMs);
            },
            [dismissAfterMs]
          ),
        }}
      >
        {children}
        {snackbarProps && <SnackbarContainer {...snackbarProps} />}
      </SnackbarContext.Provider>
    );
  };
}

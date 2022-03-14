import { FunctionComponent } from "react";
import { Box, Column, Columns, Bleed } from "../internal";
import { Body, ButtonProps, ToastProps } from "..";
import { toastRecipe } from "./Toast.css";
import { ToastConfig } from "./createToast";

/**
 * This component is not meant to be used directly: you should use the `showToast` function
 * provided by `useToast` instead.
 */
export function createToastInternal(
  Button: FunctionComponent<ButtonProps>,
  config: { [P in keyof ToastConfig]-?: ToastConfig[P] }
) {
  return function Toast({ kind, message, action }: ToastProps) {
    return (
      <Box
        as="aside"
        aria-live="polite"
        className={toastRecipe({ kind })}
        borderRadius={config.radius}
        paddingY={config.paddingY}
        paddingX={config.paddingX}
      >
        <Columns space={16} alignY="center">
          <Body size={config.messageSize} color={kind === "secondary" ? "default" : kind}>
            {message}
          </Body>
          {action && (
            <Column width="content">
              <Bleed spaceRight={config.mediumButtonPaddingX}>
                <Button size="medium" kind="transparent" hierarchy="secondary" {...action} />
              </Bleed>
            </Column>
          )}
        </Columns>
      </Box>
    );
  };
}

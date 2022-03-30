import { FunctionComponent } from "react";
import { Bleed, Box, Column, Columns } from "../internal";
import { Body, ButtonProps, IconButtonProps, ToastProps, useDefaultMessages } from "..";
import { toastRecipe } from "./Toast.css";
import { ToastConfig } from "./createToast";

/**
 * This component is not meant to be used directly: you should use the `showToast` function
 * provided by `useToast` instead.
 */
export function createToastInternal(
  config: { [P in keyof ToastConfig]-?: ToastConfig[P] },
  {
    Button,
    IconButton,
  }: {
    Button: FunctionComponent<ButtonProps>;
    IconButton: FunctionComponent<IconButtonProps>;
  }
) {
  return function Toast({ kind, message, action, onDismiss }: ToastProps) {
    const { defaultMessages } = useDefaultMessages();
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
              <Bleed spaceY={config.smallButtonPaddingY}>
                <Button size="small" kind="transparent" hierarchy="secondary" {...action} />
              </Bleed>
            </Column>
          )}
          {onDismiss && (
            <Column width="content">
              <IconButton
                label={defaultMessages.Banner.dismissButtonLabel}
                onPress={onDismiss}
                size={config.closeIconSize}
                kind="transparent"
                hierarchy="secondary"
                icon={config.closeIcon}
              />
            </Column>
          )}
        </Columns>
      </Box>
    );
  };
}

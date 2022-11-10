import {
  Bleed,
  Box,
  Column,
  Columns,
  Body,
  useDefaultMessages,
  Button,
  IconButton,
  Children,
  ButtonProps,
} from "..";
import { toastRecipe } from "./Toast.css";
import { useBentoConfig } from "../BentoConfigContext";

type Props = {
  kind: "informative" | "positive" | "warning" | "negative" | "secondary";
  message: Children;
  action?: Pick<ButtonProps, "onPress" | "label">;
  onDismiss?: () => void;
};

/**
 * This component is not meant to be used directly: you should use the `showToast` function
 * provided by `useToast` instead.
 */
export function Toast({ kind, message, action, onDismiss }: Props) {
  const config = useBentoConfig().toast;
  const buttonConfig = useBentoConfig().button;
  const { defaultMessages } = useDefaultMessages();
  return (
    <Box
      as="aside"
      aria-live="polite"
      className={toastRecipe({ kind, hasOutline: config.outline, elevation: config.elevation })}
      borderRadius={config.radius}
      paddingY={config.paddingY}
      paddingX={config.paddingX}
    >
      <Columns space={config.internalSpacing} alignY="center">
        <Body size={config.messageSize} color={kind === "secondary" ? "primary" : kind}>
          {message}
        </Body>
        {action && (
          <Column width="content">
            <Bleed spaceY={buttonConfig.paddingY[config.buttonSize]}>
              <Button
                size={config.buttonSize}
                kind={config.buttonKind}
                hierarchy="secondary"
                {...action}
              />
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
}

export type { Props as ToastProps };

import { FunctionComponent } from "react";
import { Box, Column, Columns } from "../internal";
import { Body, ButtonProps, SnackbarProps } from "..";
import { snackbarRecipe } from "./Snackbar.css";
import { SnackbarConfig } from "./createSnackbar";

/**
 * This component is not meant to be used directly: you should use the `showSnackbar` function
 * provided by `useSnackbar` instead.
 */
export function createSnackbarInternal(
  Button: FunctionComponent<ButtonProps>,
  config: { [P in keyof SnackbarConfig]-?: SnackbarConfig[P] }
) {
  return function Snackbar({ kind, message, action }: SnackbarProps) {
    return (
      <Box
        as="aside"
        aria-live="polite"
        className={snackbarRecipe({ kind })}
        borderRadius={config.radius}
        paddingY={config.paddingY}
        paddingLeft={config.paddingX.withoutAction}
        paddingRight={!!action ? config.paddingX.withAction : config.paddingX.withoutAction}
      >
        <Columns space="16" alignY="center">
          <Body size={config.messageSize} color={kind === "secondary" ? "default" : kind}>
            {message}
          </Body>
          {action && (
            <Column width="content">
              <Button kind="ghostPrimary" size="small" {...action} />
            </Column>
          )}
        </Columns>
      </Box>
    );
  };
}

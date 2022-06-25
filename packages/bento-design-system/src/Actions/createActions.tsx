import { FunctionComponent } from "react";
import { BannerProps, LocalizedString } from "../";
import { Column, Columns, Inline } from "../internal";
import { ButtonProps } from "../Button/createButton";
import { ActionsConfig } from "./Config";
import { InlineLoaderProps } from "../InlineLoader/InlineLoader";
import { actionsMachine } from "./actionsMachine";
import { useMachine } from "@xstate/react";

type ActionProps = Omit<ButtonProps, "kind" | "size" | "hierarchy">;
export type ActionsProps = {
  size?: ButtonProps["size"];
  primaryAction?: ActionProps & {
    isDestructive?: boolean;
  };
  secondaryAction?: ActionProps;
  loadingMessage?: LocalizedString;
  error?: LocalizedString;
};

export function createActions(
  config: ActionsConfig,
  {
    Button,
    Banner,
    InlineLoader,
  }: {
    Button: FunctionComponent<ButtonProps>;
    Banner: FunctionComponent<BannerProps>;
    InlineLoader: FunctionComponent<InlineLoaderProps>;
  }
) {
  return function Actions({
    primaryAction,
    secondaryAction,
    size = config.defaultSize,
    loadingMessage,
    error,
  }: ActionsProps) {
    const [state, send] = useMachine(actionsMachine, {
      services: {
        onPressCallback: () => Promise.resolve(primaryAction?.onPress()),
      },
    });
    const isLoading = state.matches("loading");

    const primaryActionButton = primaryAction && (
      <Button
        key="primary"
        {...primaryAction}
        label={primaryAction.label}
        kind={config.primaryActionButtonKind}
        hierarchy={primaryAction.isDestructive ? "danger" : "primary"}
        size={size}
        onPress={() => send("onPress")}
      />
    );
    const secondaryActionButton = secondaryAction && (
      <Button
        key="secondary"
        {...secondaryAction}
        kind={config.secondaryActionButtonKind}
        hierarchy="secondary"
        size={size}
      />
    );
    const buttons: [JSX.Element | undefined, JSX.Element | undefined] =
      config.primaryPosition === "left"
        ? [primaryActionButton, secondaryActionButton]
        : [secondaryActionButton, primaryActionButton];

    switch (config.buttonsAlignment) {
      case "right":
        return (
          <Columns space={config.spaceBetweenButtons} alignY="center" collapseBelow="tablet">
            {isLoading && (
              <Column width="content">
                <InlineLoader message={loadingMessage} />
              </Column>
            )}
            {error && !isLoading && (
              <Column width="1/2">
                <Banner kind="negative" description={error} />
              </Column>
            )}
            <Inline
              space={config.spaceBetweenButtons}
              align="right"
              alignY="center"
              collapseBelow="tablet"
              reverse={{ mobile: true }}
            >
              {buttons}
            </Inline>
          </Columns>
        );
      case "left":
        return (
          <Columns
            space={config.spaceBetweenButtons}
            alignY="center"
            collapseBelow="tablet"
            reverse={{ mobile: true }}
          >
            <Inline space={config.spaceBetweenButtons} alignY="center" collapseBelow="tablet">
              {buttons}
            </Inline>
            {isLoading && (
              <Column width="content">
                <Inline space={0} align="right" alignY="center">
                  <InlineLoader message={loadingMessage} />
                </Inline>
              </Column>
            )}
            {error && !isLoading && (
              <Column width="1/2">
                <Banner kind="negative" description={error} />
              </Column>
            )}
          </Columns>
        );
      case "spaceBetween":
        return (
          <Columns space={config.spaceBetweenButtons} alignY="center" collapseBelow="tablet">
            {buttons[0]}
            <Column width="content">
              {isLoading ? (
                <Inline space={0} align="center" alignY="center">
                  <InlineLoader message={loadingMessage} />
                </Inline>
              ) : (
                error && <Banner kind="negative" description={error} />
              )}
            </Column>
            <Inline space={0} align={{ wide: "right", mobile: "left" }} alignY="center">
              {buttons[1]}
            </Inline>
          </Columns>
        );
    }
  };
}

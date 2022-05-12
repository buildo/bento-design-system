import { FunctionComponent, useState } from "react";
import { BannerProps, LocalizedString } from "../";
import { Column, Columns, Inline, Stack } from "../internal";
import { ButtonProps } from "../Button/createButton";
import { ActionsConfig } from "./Config";
import { InlineLoaderProps } from "../InlineLoader/InlineLoader";

type ActionProps = Omit<ButtonProps, "kind" | "size" | "hierarchy">;
type Props = {
  size?: ButtonProps["size"];
  primaryAction?: ActionProps & {
    isDestructive?: boolean;
  };
  secondaryAction?: ActionProps;
  loadingMessage?: LocalizedString;
  error?: LocalizedString;
  errorBannerResizing: "hug" | "fill";
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
    errorBannerResizing,
  }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const primaryActionButton = primaryAction && (
      <Button
        key="primary"
        {...primaryAction}
        kind={config.primaryActionButtonKind}
        hierarchy={primaryAction.isDestructive ? "danger" : "primary"}
        size={size}
        onPress={() => {
          setIsLoading(true);
          Promise.resolve(primaryAction.onPress()).then(() => setIsLoading(false));
        }}
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

    const errorBanner = !!error && !isLoading && <Banner kind="negative" description={error} />;

    function renderErrorBanner() {
      if (errorBanner) {
        switch (errorBannerResizing) {
          case "fill":
            return errorBanner;
          case "hug":
            return (
              <Inline
                space={0}
                align={
                  config.buttonsAlignment === "spaceBetween"
                    ? config.primaryPosition
                    : config.buttonsAlignment
                }
              >
                <Banner kind="negative" description={error} />
              </Inline>
            );
        }
      } else {
        return null;
      }
    }

    function renderButtonsWithLoading() {
      switch (config.buttonsAlignment) {
        case "right":
          return (
            <Inline align="right" alignY="center" space={config.spaceBetweenButtons}>
              {isLoading && <InlineLoader message={loadingMessage} />}
              {buttons}
            </Inline>
          );
        case "left":
          return (
            <Inline
              align={config.buttonsAlignment}
              alignY="center"
              space={config.spaceBetweenButtons}
            >
              {buttons}
              {isLoading && <InlineLoader message={loadingMessage} />}
            </Inline>
          );
        case "spaceBetween":
          if (config.primaryPosition === "left") {
            return (
              <Columns space={0} alignY="center">
                <Column width="content">
                  <Columns space={config.spaceBetweenButtons} alignY="center">
                    <Column width="content">{buttons[0]}</Column>
                    {isLoading && <InlineLoader message={loadingMessage} />}
                  </Columns>
                </Column>
                <Inline space={0} align="right" alignY="center">
                  {buttons[1]}
                </Inline>
              </Columns>
            );
          } else {
            return (
              <Columns space={0} alignY="center">
                {buttons[0]}
                <Column width="content">
                  <Columns space={config.spaceBetweenButtons} alignY="center">
                    {isLoading && <InlineLoader message={loadingMessage} />}
                    <Column width="content">{buttons[1]}</Column>
                  </Columns>
                </Column>
              </Columns>
            );
          }
      }
    }

    return (
      <Stack space={8}>
        {renderErrorBanner()}
        {renderButtonsWithLoading()}
      </Stack>
    );
  };
}

export type { Props as ActionsProps };

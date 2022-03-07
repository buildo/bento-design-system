import { FunctionComponent, useState } from "react";
import { BannerProps, BoxProps, InlineLoader, LocalizedString } from "../";
import { bentoSprinkles, Column, Columns, Inline } from "../internal";
import { ButtonProps } from "../Button/createButton";

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

type ActionsConfig = {
  primaryPosition: "left" | "right";
  defaultSize: ButtonProps["size"];
  buttonsAlignment: "left" | "right" | "spaceBetween";
  spaceBetweenButtons: BoxProps<typeof bentoSprinkles>["gap"];
};

export function createActions(
  Button: FunctionComponent<ButtonProps>,
  Banner: FunctionComponent<BannerProps>,
  config: ActionsConfig = {
    buttonsAlignment: "right",
    primaryPosition: "right",
    spaceBetweenButtons: 16,
    defaultSize: "medium",
  }
) {
  return function Actions({
    primaryAction,
    secondaryAction,
    size = config.defaultSize,
    loadingMessage,
    error,
  }: ActionsProps) {
    const [isLoading, setIsLoading] = useState(false);

    const primaryActionButton = primaryAction && (
      <Button
        key="primary"
        {...primaryAction}
        kind="solid"
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
        kind="transparent"
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
            <Column width="1/2">
              {isLoading ? (
                <InlineLoader message={loadingMessage} />
              ) : (
                error && <Banner kind="negative" description={error} />
              )}
            </Column>
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
            <Column width="1/2">
              {isLoading ? (
                <Inline space={0} align="right" alignY="center">
                  <InlineLoader message={loadingMessage} />
                </Inline>
              ) : (
                <Column>{error && <Banner kind="negative" description={error} />}</Column>
              )}
            </Column>
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
            <Inline space={0} align={{ desktop: "right", mobile: "left" }} alignY="center">
              {buttons[1]}
            </Inline>
          </Columns>
        );
    }
  };
}

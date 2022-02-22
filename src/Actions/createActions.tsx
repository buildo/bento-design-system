import { FunctionComponent, useState } from "react";
import { BoxProps, InlineLoader, LocalizedString } from "../";
import { bentoSprinkles, Column, Columns, Inline } from "../internal";
import { ButtonProps } from "../Button/createButton";

type ActionProps = Omit<ButtonProps, "kind" | "size" | "hierarchy">;

export type ActionsProps = {
  size?: ButtonProps["size"];
  primaryAction?: ActionProps & {
    isDestructive?: boolean;
  };
  secondaryAction?: ActionProps;
  loadingMessage: LocalizedString;
};

type ActionsConfig = {
  primaryPosition: "left" | "right";
  defaultSize: ButtonProps["size"];
  buttonsAlignment: "left" | "right" | "spaceBetween";
  spaceBetweenButtons: BoxProps<typeof bentoSprinkles>["gap"];
};

export function createActions(
  Button: FunctionComponent<ButtonProps>,
  config: ActionsConfig = {
    primaryPosition: "left",
    buttonsAlignment: "spaceBetween",
    spaceBetweenButtons: 16,
    defaultSize: "medium",
  }
) {
  return function Actions({
    primaryAction,
    secondaryAction,
    size = config.defaultSize,
    loadingMessage,
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
          <Columns space={0} alignY="center" collapseBelow="tablet">
            {isLoading ? <InlineLoader message={loadingMessage} /> : <Column>{null}</Column>}
            <Column width="content">
              <Inline space={config.spaceBetweenButtons} alignY="center">
                {buttons}
              </Inline>
            </Column>
          </Columns>
        );
      case "left":
        return (
          <Columns space={0} alignY="center" collapseBelow="tablet">
            <Inline space={config.spaceBetweenButtons} alignY="center">
              {buttons}
            </Inline>
            <Column width="content">
              {isLoading ? <InlineLoader message={loadingMessage} /> : <Column>{null}</Column>}
            </Column>
          </Columns>
        );
      case "spaceBetween":
        return (
          <Columns space={0} alignY="center">
            {buttons[0] || <Column>{null}</Column>}

            <Column width="content">
              <Inline space={config.spaceBetweenButtons} alignY="center">
                {isLoading && <InlineLoader message={loadingMessage} />}
                {buttons[1]}
              </Inline>
            </Column>
          </Columns>
        );
    }
  };
}

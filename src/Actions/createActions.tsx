import { FunctionComponent } from "react";
import { BoxProps } from "../";
import { bentoSprinkles, Column, Columns, Inline } from "../internal";
import { ButtonProps } from "../Button/createButton";

type ActionProps = Omit<ButtonProps, "kind" | "size" | "hierarchy">;

export type ActionsProps = {
  size?: ButtonProps["size"];
  primaryAction?: ActionProps & {
    isDestructive?: boolean;
  };
  secondaryAction?: ActionProps;
};

type ActionsConfig = {
  primaryPosition: "left" | "right";
  defaultSize: ButtonProps["size"];
} & (
  | {
      buttonsAlignment: "left" | "right";
      spaceBetweenButtons: BoxProps<typeof bentoSprinkles>["gap"];
    }
  | {
      buttonsAlignment: "spaceBetween";
      spaceBetweenButtons?: never;
    }
);

export function createActions(
  Button: FunctionComponent<ButtonProps>,
  config: ActionsConfig = {
    primaryPosition: "right",
    buttonsAlignment: "right",
    spaceBetweenButtons: 16,
    defaultSize: "medium",
  }
) {
  return function Actions({
    primaryAction,
    secondaryAction,
    size = config.defaultSize,
  }: ActionsProps) {
    const primaryActionButton = primaryAction && (
      <Button
        key="primary"
        {...primaryAction}
        kind="solid"
        hierarchy={primaryAction.isDestructive ? "danger" : "primary"}
        size={size}
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

    return config.buttonsAlignment === "spaceBetween" ? (
      <Columns space={0}>
        {buttons[0] || <Column>{null}</Column>}
        <Column width="content">{buttons[1]}</Column>
      </Columns>
    ) : (
      <Inline
        space={config.spaceBetweenButtons}
        align={config.buttonsAlignment}
        alignY="center"
        collapseBelow="tablet"
      >
        {buttons}
      </Inline>
    );
  };
}

import { FunctionComponent } from "react";
import { BoxProps } from "../";
import { bentoSprinkles, Column, Columns, Inline } from "../internal";
import { ButtonProps } from "../Button/createButton";

type ActionProps = Omit<ButtonProps, "kind" | "size">;

export type ActionsProps = {
  primaryAction?: ActionProps & {
    isDestructive?: boolean;
  };
  secondaryAction?: ActionProps;
};

type ActionsConfig = {
  primaryPosition: "left" | "right";
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
    spaceBetweenButtons: "16",
  }
) {
  return function Actions({ primaryAction, secondaryAction }: ActionsProps) {
    const primaryActionButton = primaryAction && (
      <Button
        key="primary"
        {...primaryAction}
        kind={primaryAction.isDestructive ? "danger" : "primary"}
      />
    );
    const secondaryActionButton = secondaryAction && (
      <Button key="secondary" {...secondaryAction} kind="transparentPrimary" />
    );
    const buttons: [JSX.Element | undefined, JSX.Element | undefined] =
      config.primaryPosition === "left"
        ? [primaryActionButton, secondaryActionButton]
        : [secondaryActionButton, primaryActionButton];

    return config.buttonsAlignment === "spaceBetween" ? (
      <Columns space="0">
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

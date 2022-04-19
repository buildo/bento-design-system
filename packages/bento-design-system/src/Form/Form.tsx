import { FunctionComponent } from "react";
import {
  ActionsProps,
  Body,
  ButtonProps,
  Children,
  ContentBlock,
  Display,
  LocalizedString,
} from "..";

import { Box, Stack } from "../internal";
import { Headline } from "../Typography/Headline/Headline";
import { FormConfig } from "./Config";

type Props = {
  children: Children;
  title?: LocalizedString;
  description?: Children;
  submitButton?: Omit<ButtonProps, "kind" | "hierarchy">;
  secondaryButton?: Omit<ButtonProps, "kind" | "hierarchy">;
  error?: LocalizedString;
  actionsSize?: ButtonProps["size"];
};

export function createForm(
  config: FormConfig,
  {
    Actions,
  }: {
    Actions: FunctionComponent<ActionsProps>;
  }
) {
  return function Form({
    title,
    description,
    children,
    submitButton,
    secondaryButton,
    error,
    actionsSize = config.defaultActionsSize,
  }: Props) {
    return (
      <Box as="form" onSubmit={(e) => e.preventDefault()}>
        <ContentBlock maxWidth={700}>
          <Stack space={config.formSpacing}>
            {(title || description) && (
              <Stack space={config.headerSpacing}>
                {title &&
                  (config.headerTitle.kind === "display" ? (
                    <Display size={config.headerTitle.size}>{title}</Display>
                  ) : (
                    <Headline size={config.headerTitle.size}>{title}</Headline>
                  ))}
                {description && <Body size={config.headerDescriptionSize}>{description}</Body>}
              </Stack>
            )}
            {children}
            {(submitButton || secondaryButton) && (
              <Actions
                size={actionsSize}
                primaryAction={submitButton}
                secondaryAction={secondaryButton}
                error={error}
              />
            )}
          </Stack>
        </ContentBlock>
      </Box>
    );
  };
}

export type { Props as FormProps };

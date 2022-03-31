import { FunctionComponent } from "react";
import {
  ActionsProps,
  Body,
  ButtonProps,
  Children,
  ContentBlock,
  Display,
  LocalizedString,
  TextChildren,
} from "..";

import { Box, Stack } from "../internal";
import { FormConfig } from "./Config";

type Props = {
  children: Children;
  title?: LocalizedString;
  description?: TextChildren;
  submitButton?: Omit<ButtonProps, "kind" | "hierarchy">;
  secondaryButton?: Omit<ButtonProps, "kind" | "hierarchy">;
  error?: LocalizedString;
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
  }: Props) {
    return (
      <Box as="form" onSubmit={(e) => e.preventDefault()}>
        <ContentBlock maxWidth={700}>
          <Stack space={config.formSpacing}>
            {(title || description) && (
              <Stack space={config.headerSpacing}>
                {title && <Display size={config.headerTitleSize}>{title}</Display>}
                {description && <Body size={config.headerDescriptionSize}>{description}</Body>}
              </Stack>
            )}
            {children}
            {(submitButton || secondaryButton) && (
              <Actions
                size={config.actionsSize}
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

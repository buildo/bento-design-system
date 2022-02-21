import { ComponentProps, FunctionComponent } from "react";
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

import { BentoSprinkles, Box, Stack } from "../internal";

type Props = {
  children: Children;
  title?: LocalizedString;
  description?: TextChildren;
  submitButton?: Omit<ButtonProps, "kind">;
  secondaryButton?: Omit<ButtonProps, "kind">;
};

export type FormConfig = {
  headerTitleSize: ComponentProps<typeof Display>["size"];
  headerDescriptionSize: ComponentProps<typeof Body>["size"];
  formSpacing: BentoSprinkles["gap"];
  headerSpacing: BentoSprinkles["gap"];
  actionsSize: ActionsProps["size"];
};

export function createForm(Actions: FunctionComponent<ActionsProps>, config: FormConfig) {
  return function Form({ title, description, children, submitButton, secondaryButton }: Props) {
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
              />
            )}
          </Stack>
        </ContentBlock>
      </Box>
    );
  };
}

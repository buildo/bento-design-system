import {
  ActionsProps,
  Body,
  ButtonProps,
  Children,
  ContentBlock,
  Display,
  LocalizedString,
  Box,
  Stack,
  Actions,
} from "..";

import { Headline } from "../Typography/Headline/Headline";
import { FocusScope } from "@react-aria/focus";
import { useBentoConfig } from "../BentoConfigContext";

type Props = {
  children: Children;
  title?: LocalizedString;
  description?: Children;
  submitButton?: Omit<ButtonProps, "kind" | "hierarchy">;
  secondaryButton?: Omit<ButtonProps, "kind" | "hierarchy">;
  error?: LocalizedString;
  errorBannerWidth?: ActionsProps["errorBannerWidth"];
  actionsSize?: ButtonProps["size"];
  autoFocus?: boolean;
};

export function Form({
  title,
  description,
  children,
  submitButton,
  secondaryButton,
  error,
  errorBannerWidth: errorBannerWidth_,
  actionsSize: actionsSize_,
  autoFocus,
}: Props) {
  const config = useBentoConfig().formLayout.form;
  const errorBannerWidth = errorBannerWidth_ ?? config.defaultErrorBannerWidth;
  const actionsSize = actionsSize_ ?? config.defaultActionsSize;

  return (
    <FocusScope autoFocus={autoFocus}>
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
                errorBannerWidth={errorBannerWidth}
              />
            )}
          </Stack>
        </ContentBlock>
      </Box>
    </FocusScope>
  );
}

export type { Props as FormProps };

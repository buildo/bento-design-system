import { Body, Children, LocalizedString, Title, Stack } from "..";
import { FormSectionConfig } from "./Config";

type Props = {
  title?: LocalizedString;
  description?: Children;
  children: Children;
};

export function createFormSection(config: FormSectionConfig) {
  return function FormSection({ title, description, children }: Props) {
    return (
      <Stack space={config.sectionSpacing} as="section">
        {(title || description) && (
          <Stack space={config.sectionHeaderSpacing}>
            {title && <Title size={config.sectionTitleSize}>{title}</Title>}
            {description && <Body size={config.sectionDescriptionSize}>{description}</Body>}
          </Stack>
        )}
        {children}
      </Stack>
    );
  };
}

export type { Props as FormSectionProps };

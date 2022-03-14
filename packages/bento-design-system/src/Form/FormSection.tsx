import { ComponentProps } from "react";
import { Body, Children, LocalizedString, TextChildren, Title } from "..";
import { BentoSprinkles, Stack } from "../internal";

export type Props = {
  title?: LocalizedString;
  description?: TextChildren;
  children: Children;
};

export type FormSectionConfig = {
  sectionTitleSize: ComponentProps<typeof Title>["size"];
  sectionDescriptionSize: ComponentProps<typeof Body>["size"];
  sectionHeaderSpacing: BentoSprinkles["gap"];
  sectionSpacing: BentoSprinkles["gap"];
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

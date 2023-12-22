import { ButtonLink, Feedback, Inline, LocalizedString, Stack } from "@buildo/bento-design-system";
import { useTranslation } from "react-i18next";
import { IconConfetti } from "../PhosphorIcons";

type Props = {
  sectionTitle: string;
  nextSection?: {
    label: LocalizedString;
    href: string;
  };
};

export function SectionCompleted(props: Props) {
  const { t } = useTranslation();
  return (
    <Stack space={40} align="center">
      <Feedback
        size="large"
        title={t("ConfiguratorSection.completed", { title: props.sectionTitle })}
        icon={IconConfetti}
      />
      <Inline space={16}>
        <ButtonLink
          size="large"
          kind="solid"
          hierarchy="secondary"
          label={t("ConfiguratorSection.returnToMyTheme")}
          href="/theme"
        />
        {props.nextSection && (
          <ButtonLink
            size="large"
            kind="solid"
            hierarchy="primary"
            label={props.nextSection.label}
            href={props.nextSection.href}
          />
        )}
      </Inline>
    </Stack>
  );
}

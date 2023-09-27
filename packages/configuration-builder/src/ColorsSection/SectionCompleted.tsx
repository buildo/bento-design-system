import { ButtonLink, Feedback, Inline, Stack } from "@buildo/bento-design-system";
import { useTranslation } from "react-i18next";
import { IconConfetti } from "../PhosphorIcons";

export function SectionCompleted() {
  const { t } = useTranslation();
  return (
    <Stack space={40} align="center">
      <Feedback size="large" title={t("ColorsSection.completed")} icon={IconConfetti} />
      <Inline space={16}>
        <ButtonLink
          size="large"
          kind="solid"
          hierarchy="secondary"
          label={t("ColorsSection.returnToMyTheme")}
          href="/theme"
        />
        <ButtonLink
          size="large"
          kind="solid"
          hierarchy="primary"
          label={t("ColorsSection.goToTypography")}
          href="/theme/typography"
        />
      </Inline>
    </Stack>
  );
}

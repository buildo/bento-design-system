import { ButtonLink, Feedback, Inline, Stack } from "@buildo/bento-design-system";
import { useTranslation } from "react-i18next";
import { IconConfetti } from "../PhosphorIcons";

export function SectionCompleted() {
  const { t } = useTranslation();
  return (
    <Stack space={40} align="center">
      <Feedback size="large" title={t("ElevationsSection.completed")} icon={IconConfetti} />
      <Inline space={16}>
        <ButtonLink
          size="large"
          kind="solid"
          hierarchy="secondary"
          label={t("ElevationsSection.returnToMyTheme")}
          href="/theme"
        />
        <ButtonLink
          size="large"
          kind="solid"
          hierarchy="primary"
          label={t("ElevationsSection.goToTokens")}
          href="/theme/tokens"
        />
      </Inline>
    </Stack>
  );
}

import { ButtonLink, Feedback, Stack } from "@buildo/bento-design-system";
import { useTranslation } from "react-i18next";
import { IconConfetti } from "../PhosphorIcons";

export function SectionCompleted() {
  const { t } = useTranslation();
  return (
    <Stack space={40} align="center">
      <Feedback size="large" title={t("TokensSection.completed")} icon={IconConfetti} />
      <ButtonLink
        size="large"
        kind="solid"
        hierarchy="secondary"
        label={t("TokensSection.returnToMyTheme")}
        href="/theme"
      />
    </Stack>
  );
}

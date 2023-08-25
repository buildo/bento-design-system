import { Button, Feedback, Inline, Stack } from "@buildo/bento-design-system";
import { useTranslation } from "react-i18next";
import { IconConfetti } from "../Icons/IconConfetti";
import { useNavigate } from "react-router-dom";

export function SectionCompleted() {
  const navigate = useNavigate();

  const { t } = useTranslation();
  return (
    <Stack space={40} align="center">
      <Feedback size="large" title={t("ColorsSection.completed")} icon={IconConfetti} />
      <Inline space={16}>
        <Button
          size="large"
          kind="solid"
          hierarchy="secondary"
          label={t("ColorsSection.returnToMyTheme")}
          onPress={() => navigate("/theme")}
        />
        <Button
          size="large"
          kind="solid"
          hierarchy="primary"
          label={t("ColorsSection.goToTypography")}
          onPress={() => navigate("/theme/typography")}
        />
      </Inline>
    </Stack>
  );
}

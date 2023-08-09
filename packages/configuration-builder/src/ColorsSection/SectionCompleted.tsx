import { Button, Columns, Feedback, Stack } from "@buildo/bento-design-system";
import { useTranslation } from "react-i18next";
import { IconConfetti } from "../Icons/IconConfetti";

type Props = {
  goToMyTheme: () => void;
  goToTypography: () => void;
};

export function SectionCompleted(props: Props) {
  const { t } = useTranslation();
  return (
    <Stack space={40} align="center">
      <Feedback size="large" title={t("ColorsSection.completed")} icon={IconConfetti} />
      <Columns space={16}>
        <Button
          size="large"
          kind="solid"
          hierarchy="secondary"
          label={t("ColorsSection.returnToMyTheme")}
          onPress={props.goToMyTheme}
        />
        <Button
          size="large"
          kind="solid"
          hierarchy="primary"
          label={t("ColorsSection.goToTypography")}
          onPress={props.goToTypography}
        />
      </Columns>
    </Stack>
  );
}

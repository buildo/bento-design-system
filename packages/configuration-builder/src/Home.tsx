import {
  Body,
  Columns,
  Display,
  Inline,
  Stack,
  Inset,
  ButtonLink,
} from "@buildo/bento-design-system";
import { useTranslation } from "react-i18next";
import Cover from "./assets/Cover.svg";

export function Home() {
  const { t } = useTranslation();

  return (
    <Inset spaceX={120} spaceY={80}>
      <Columns space={40}>
        <Stack space={40}>
          <Stack space={16}>
            <Display size="large">{t("App.name")}</Display>
            <Body size="large">{t("App.description")}</Body>
          </Stack>
          <Inline space={0}>
            <ButtonLink
              kind="solid"
              hierarchy="primary"
              size="large"
              href="/theme"
              label={t("Home.createTheme")}
            />
          </Inline>
        </Stack>
        <img src={Cover} width={640} height={420} alt="" />
      </Columns>
    </Inset>
  );
}

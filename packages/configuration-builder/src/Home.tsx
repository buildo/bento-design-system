import { Body, Button, Columns, Display, Inline, Stack, Inset } from "@buildo/bento-design-system";
import { useTranslation } from "react-i18next";
import Cover from "./assets/Cover.svg";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Inset spaceX={120} spaceY={80}>
      <Columns space={40}>
        <Stack space={40}>
          <Stack space={16}>
            <Display size="large">{t("App.name")}</Display>
            <Body size="large">{t("App.description")}</Body>
          </Stack>
          <Inline space={0}>
            <Button
              kind="solid"
              hierarchy="primary"
              size="large"
              onPress={() => navigate("/theme")}
              label={t("Home.createTheme")}
            />
          </Inline>
        </Stack>
        <img src={Cover} width={640} height={420} alt="" />
      </Columns>
    </Inset>
  );
}

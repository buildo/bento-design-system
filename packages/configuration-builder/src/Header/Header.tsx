import { Body, Inline, Inset } from "@buildo/bento-design-system";
import bentoLogo from "../assets/bentoLogo.svg";
import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation();

  return (
    <Inset spaceX={40} spaceY={16}>
      <Inline space={24} alignY="center">
        <img src={bentoLogo} alt="" />
        <Body size="large">{t("App.name")}</Body>
      </Inline>
    </Inset>
  );
}

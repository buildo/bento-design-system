import { useTranslation } from "react-i18next";
import { useConfiguratorStatusContext } from "../ConfiguratorStatusContext";
import {
  Body,
  Card,
  Column,
  Columns,
  Headline,
  Inset,
  SelectField,
  Stack,
  Title,
  AreaLoader,
} from "@buildo/bento-design-system";
import { useEffect, useState } from "react";
import { match } from "ts-pattern";
import { Playground } from "../TokensSection/Playground";

export function FontFamilyStep() {
  const { theme, setTheme } = useConfiguratorStatusContext();
  const { t } = useTranslation();
  const [fontOptions, setFontOptions] = useState([]);
  const [loadingFonts, setLoadingFonts] = useState(true);

  useEffect(() => {
    fetch(
      "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDhvrOZ94Gbv3Q96TBII9HGtR-gj6LyS-Y"
    )
      .then((res) => res.json())
      .then((data) => {
        setFontOptions(
          data.items.map((item: any) => ({
            label: item.family,
            value: item.family,
          }))
        );
        setLoadingFonts(false);
      });
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      theme.typography.fontFamily
    )}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [theme.typography.fontFamily]);

  return match(loadingFonts)
    .with(true, () => <AreaLoader />)
    .with(false, () => (
      <Card borderRadius={40} padding={0}>
        <Columns space={0}>
          <Column width="1/3">
            <Inset space={40}>
              <Stack space={24}>
                <Title size="large">{t("TypographySection.Step.fontFamily")}</Title>
                <SelectField
                  label={t("TypographySection.Step.fontFamily.googleFont")}
                  options={fontOptions}
                  value={theme.typography.fontFamily}
                  onChange={(value) => {
                    if (value) {
                      setTheme({
                        ...theme,
                        typography: { ...theme.typography, fontFamily: value },
                      });
                    }
                  }}
                />
              </Stack>
            </Inset>
          </Column>
          <Column>
            <Playground borderRadius={0}>
              <Inset space={40}>
                <Stack space={24}>
                  <Stack space={12}>
                    <Headline size="small">
                      {t("TypographySection.Step.fontFamily.exampleFirstLine")}
                    </Headline>
                    <Headline size="small">
                      {t("TypographySection.Step.fontFamily.exampleSecondLine")}
                    </Headline>
                    <Headline size="small">
                      {t("TypographySection.Step.fontFamily.exampleThirdLine")}
                    </Headline>
                  </Stack>
                  <Body size="large">{t("LoremIpsum.text")}</Body>
                </Stack>
              </Inset>
            </Playground>
          </Column>
        </Columns>
      </Card>
    ))
    .exhaustive();
}

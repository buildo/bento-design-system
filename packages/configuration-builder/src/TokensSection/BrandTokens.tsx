import {
  AreaLoader,
  Body,
  Box,
  Column,
  Columns,
  SliderField,
  Stack,
  unsafeLocalizedString,
  DecorativeDivider,
  Headline,
} from "@buildo/bento-design-system";
import { ColorSelector } from "./ColorSelector";
import { useTranslation } from "react-i18next";
import { Playground } from "./Playground";
import { ThemeConfig } from "../ConfiguratorStatusContext";

type Props = {
  tokens: ThemeConfig["tokens"]["brandColor"];
  onChange: (value: ThemeConfig["tokens"]["brandColor"]) => void;
};

export function BrandTokens(props: Props) {
  const { t } = useTranslation();

  return (
    <Stack space={40}>
      <Headline size="small">{t("TokensSection.Step.brand")}</Headline>
      <Columns space={40} alignY="stretch">
        <Column width="1/4">
          <Stack space={16}>
            <ColorSelector
              label={t("Tokens.Color.brandPrimary")}
              value={props.tokens.brandPrimary}
              onChange={(value) => props.onChange({ ...props.tokens, brandPrimary: value })}
            />
            <ColorSelector
              label={t("Tokens.Color.brandSecondary")}
              value={props.tokens.brandSecondary}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  brandSecondary: value,
                })
              }
            />
            <ColorSelector
              label={t("Tokens.Color.brandTertiary")}
              value={props.tokens.brandTertiary}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  brandTertiary: value,
                })
              }
            />
          </Stack>
        </Column>
        <Playground>
          <Stack space={40}>
            <Stack space={12}>
              <Body size="medium" color="secondary">
                {t("Component.decorativeDivider")}
              </Body>
              <DecorativeDivider />
            </Stack>
            <Stack space={12}>
              <Body size="medium" color="secondary">
                {t("Component.areaLoader")}
              </Body>
              <Box position="relative" style={{ height: 240 }}>
                <AreaLoader />
              </Box>
            </Stack>
            <Stack space={12}>
              <Body size="medium" color="secondary">
                {t("Component.sliderField")}
              </Body>
              <SliderField
                type="single"
                label={unsafeLocalizedString("")}
                value={50}
                minValue={0}
                maxValue={100}
                onChange={() => {}}
              />
            </Stack>
          </Stack>
        </Playground>
      </Columns>
    </Stack>
  );
}

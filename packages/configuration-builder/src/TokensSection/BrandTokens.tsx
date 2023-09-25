import {
  AreaLoader,
  BentoThemeProvider,
  BentoTokens,
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
import { ColorTokenField } from "./ColorTokenField";
import { useTranslation } from "react-i18next";

type Props = {
  tokens: BentoTokens;
  onChange: (value: BentoTokens["brandColor"]) => void;
};

export function BrandTokens(props: Props) {
  const { t } = useTranslation();

  return (
    <Stack space={40}>
      <Headline size="small">{t("TokensSection.Step.brand")}</Headline>
      <Columns space={40} alignY="stretch">
        <Column width="1/4">
          <Stack space={16}>
            <ColorTokenField
              label={t("Tokens.Color.primary")}
              value={props.tokens.brandColor.brandPrimary}
              onChange={(value) =>
                props.onChange({ ...props.tokens.brandColor, brandPrimary: value })
              }
            />
            <ColorTokenField
              label={t("Tokens.Color.secondary")}
              value={props.tokens.brandColor.brandSecondary}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens.brandColor,
                  brandSecondary: value,
                })
              }
            />
            <ColorTokenField
              label={t("Tokens.Color.tertiary")}
              value={props.tokens.brandColor.brandTertiary}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens.brandColor,
                  brandTertiary: value,
                })
              }
            />
          </Stack>
        </Column>
        <Box
          borderRadius={24}
          padding={40}
          background="backgroundSecondary"
          display="flex"
          flexDirection="column"
          flexGrow={1}
        >
          <BentoThemeProvider theme={props.tokens}>
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
          </BentoThemeProvider>
        </Box>
      </Columns>
    </Stack>
  );
}

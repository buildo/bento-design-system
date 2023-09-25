import {
  AreaLoader,
  BentoThemeProvider,
  Body,
  Box,
  Column,
  Columns,
  DecorativeDivider,
  LocalizedString,
  SliderField,
  Stack,
  Title,
  unsafeLocalizedString,
} from "@buildo/bento-design-system";
import { ConfiguratorSection } from "../ConfiguratorSection/ConfiguratorSection";
import { useConfiguratorStatusContext } from "../ConfiguratorStatusContext";
import { ColorPickerField } from "../ColorPickerField/ColorPickerField";
import { useTranslation } from "react-i18next";

function ColorTokenField(props: {
  label: LocalizedString;
  value: string;
  onChange: (value: string) => void;
}) {
  const { theme } = useConfiguratorStatusContext();
  const { t } = useTranslation();
  return (
    <Columns space={24} alignY="stretch">
      <Column width="content">
        <Box borderRadius={16} height="full" style={{ background: props.value, width: 64 }} />
      </Column>
      <Stack space={8}>
        <Title size="medium">{props.label}</Title>
        <ColorPickerField
          colors={theme.colors}
          label={t("Tokens.Color.label")}
          value={props.value}
          onChange={props.onChange}
        />
      </Stack>
    </Columns>
  );
}

export function TokensSection() {
  const { theme, setTheme } = useConfiguratorStatusContext();
  const { t } = useTranslation();

  const tokens = theme.tokens;
  const setTokens = (tokens: typeof theme.tokens) => setTheme({ ...theme, tokens });

  return (
    <ConfiguratorSection title={t("Tokens.title")} steps={[]} currentStep={0}>
      <Columns space={40} alignY="stretch">
        <Column width="1/4">
          <Stack space={16}>
            <ColorTokenField
              label={t("Tokens.Color.primary")}
              value={tokens.brandColor.brandPrimary}
              onChange={(value) =>
                setTokens({ ...tokens, brandColor: { ...tokens.brandColor, brandPrimary: value } })
              }
            />
            <ColorTokenField
              label={t("Tokens.Color.secondary")}
              value={tokens.brandColor.brandSecondary}
              onChange={(value) =>
                setTokens({
                  ...tokens,
                  brandColor: { ...tokens.brandColor, brandSecondary: value },
                })
              }
            />
            <ColorTokenField
              label={t("Tokens.Color.tertiary")}
              value={tokens.brandColor.brandTertiary}
              onChange={(value) =>
                setTokens({ ...tokens, brandColor: { ...tokens.brandColor, brandTertiary: value } })
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
          <BentoThemeProvider theme={tokens}>
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
    </ConfiguratorSection>
  );
}

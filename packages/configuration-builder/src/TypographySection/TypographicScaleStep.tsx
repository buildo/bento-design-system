import {
  Body,
  Box,
  Card,
  Columns,
  Display,
  Headline,
  Inset,
  Label,
  Link,
  NumberField,
  SelectField,
  Stack,
  Title,
} from "@buildo/bento-design-system";
import { TypographyConfig, useConfiguratorStatusContext } from "../ConfiguratorStatusContext";
import { Playground } from "../TokensSection/Playground";
import { useTranslation } from "react-i18next";
import { match } from "ts-pattern";

function TypographyConfigurator(props: { component: keyof TypographyConfig["typographicScale"] }) {
  const { theme, setTheme } = useConfiguratorStatusContext();
  const config = theme.typography.typographicScale[props.component];
  const onChange = (newConfig: typeof config) => {
    setTheme({
      ...theme,
      typography: {
        ...theme.typography,
        typographicScale: {
          ...theme.typography.typographicScale,
          [props.component]: newConfig,
        },
      },
    });
  };
  const { t } = useTranslation();
  const Component = match(props.component)
    .with("display", () => Display)
    .with("headline", () => Headline)
    .with("title", () => Title)
    .with("label", () => Label)
    .with("body", () => Body)
    .exhaustive();

  const fontWeightOptions = [
    {
      label: t("TypographySection.Step.typographicScale.fontWeight.regular"),
      value: "400",
    },
    {
      label: t("TypographySection.Step.typographicScale.fontWeight.semibold"),
      value: "500",
    },
    {
      label: t("TypographySection.Step.typographicScale.fontWeight.bold"),
      value: "600",
    },
  ];

  return (
    <Card borderRadius={40} padding={0}>
      <Box display="flex" flexDirection="row" gap={0} alignItems="stretch" overflow="hidden">
        <Box flex={1}>
          <Inset space={40}>
            <Stack space={24}>
              <Title size="large">
                {t(`TypographySection.Step.typographicScale.${props.component}`)}
              </Title>
              <SelectField
                label={
                  props.component === "body"
                    ? t("TypographySection.Step.typographicScale.regularFontWeight")
                    : t("TypographySection.Step.typographicScale.fontWeight")
                }
                options={fontWeightOptions}
                value={config.weights.regular}
                onChange={(value) => {
                  if (value) {
                    onChange({ ...config, weights: { ...config.weights, regular: value } });
                  }
                }}
              />
              {props.component === "body" && (
                <SelectField
                  label={t("TypographySection.Step.typographicScale.strongFontWeight")}
                  options={fontWeightOptions}
                  value={(config as TypographyConfig["typographicScale"]["body"]).weights.strong}
                  onChange={(value) => {
                    if (value) {
                      onChange({ ...config, weights: { ...config.weights, strong: value } });
                    }
                  }}
                />
              )}
              <Columns space={40}>
                {(["large", "medium", "small"] as const).map((size) => (
                  <Stack space={16}>
                    <Title size="medium">
                      {t(`TypographySection.Step.typographicScale.fontSize.${size}`)}
                    </Title>
                    <NumberField
                      label={t("TypographySection.Step.typographicScale.fontSize")}
                      value={config.sizes[size].fontSize}
                      onChange={(value) => {
                        onChange({
                          ...config,
                          sizes: {
                            ...config.sizes,
                            [size]: { ...config.sizes[size], fontSize: value },
                          },
                        });
                      }}
                    />
                    <NumberField
                      label={t("TypographySection.Step.typographicScale.lineHeight")}
                      value={config.sizes[size].lineHeight}
                      onChange={(value) => {
                        onChange({
                          ...config,
                          sizes: {
                            ...config.sizes,
                            [size]: { ...config.sizes[size], lineHeight: value },
                          },
                        });
                      }}
                    />
                  </Stack>
                ))}
              </Columns>
            </Stack>
          </Inset>
        </Box>
        <Box flex={1} overflow="hidden">
          <Playground borderRadius={0}>
            <Stack space={24}>
              {(["large", "medium", "small"] as const).map((size) => (
                <Stack space={0} key={size}>
                  <Component size={size} ellipsis>
                    {t("LoremIpsum.title")}
                  </Component>
                  <Label size="small" color="secondary">
                    {t(`TypographySection.Step.typographicScale.fontSize.${size}`)}
                  </Label>
                </Stack>
              ))}
              {props.component === "body" &&
                (["large", "medium", "small"] as const).map((size) => (
                  <Stack space={0} key={size}>
                    <Body size={size} weight="strong" ellipsis>
                      {t("LoremIpsum.title")}
                    </Body>
                    <Label size="small" color="secondary">
                      {t(`TypographySection.Step.typographicScale.fontSize.${size}Strong`)}
                    </Label>
                  </Stack>
                ))}
              {(props.component === "body" || props.component === "label") &&
                (["large", "medium", "small"] as const).map((size) => (
                  <Stack space={0} key={size}>
                    <Component size={size} ellipsis>
                      {(<Link>{t("LoremIpsum.title")}</Link>) as any}
                    </Component>
                    <Label size="small" color="secondary">
                      {t(`TypographySection.Step.typographicScale.fontSize.${size}Link`)}
                    </Label>
                  </Stack>
                ))}
            </Stack>
          </Playground>
        </Box>
      </Box>
    </Card>
  );
}

export function TypographicScaleStep() {
  return (
    <Stack space={24}>
      <TypographyConfigurator component="display" />
      <TypographyConfigurator component="headline" />
      <TypographyConfigurator component="title" />
      <TypographyConfigurator component="body" />
      <TypographyConfigurator component="label" />
    </Stack>
  );
}

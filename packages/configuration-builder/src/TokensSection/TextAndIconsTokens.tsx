import {
  Body,
  Box,
  Stack,
  Headline,
  Card,
  Title,
  Actions,
  Columns,
  Column,
} from "@buildo/bento-design-system";
import { ColorSelector } from "./ColorSelector";
import { useTranslation } from "react-i18next";
import { IconCloudMoon, IconPlanet } from "../PhosphorIcons";
import { ThemeConfig } from "../ConfiguratorStatusContext";
import { Playground } from "./Playground";

type Props = {
  tokens: ThemeConfig["tokens"];
  onChange: (value: ThemeConfig["tokens"]) => void;
  onNext: () => void;
  onBack: () => void;
};

function PlaygroundExample({ theme }: { theme: "light" | "dark" }) {
  const { t } = useTranslation();

  return (
    <Card
      padding={40}
      background={theme === "light" ? "backgroundPrimary" : "backgroundPrimaryInverse"}
      borderRadius={0}
    >
      <Stack space={24}>
        <Stack space={12}>
          <Title size="large" color={theme === "light" ? "primary" : "primaryInverse"}>
            {t("LoremIpsum.title")}
          </Title>
          <Body size="large" color={theme === "light" ? "primary" : "primaryInverse"}>
            {t("LoremIpsum.text")}
          </Body>
        </Stack>
        <Box
          padding={24}
          background={theme === "light" ? "backgroundSecondary" : "backgroundSecondaryInverse"}
        >
          <Stack space={24}>
            <Stack space={12}>
              <Columns space={16} alignY="center">
                <Column width="content">
                  <IconPlanet
                    size={24}
                    color={theme === "light" ? "secondary" : "secondaryInverse"}
                  />
                </Column>
                <Title size="medium" color={theme === "light" ? "secondary" : "secondaryInverse"}>
                  {t("LoremIpsum.title")}
                </Title>
              </Columns>
              <Body size="medium" color={theme === "light" ? "secondary" : "secondaryInverse"}>
                {t("LoremIpsum.text")}
              </Body>
            </Stack>
            <Box padding={24} background="backgroundOverlay">
              <Columns space={24} alignY="center">
                <Column width="content">
                  <IconCloudMoon
                    size={24}
                    color={theme === "light" ? "primary" : "primaryInverse"}
                  />
                </Column>
                <Body size="small" color={theme === "light" ? "primary" : "primaryInverse"}>
                  {t("LoremIpsum.text")}
                </Body>
              </Columns>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}

export function TextAndIconsTokens(props: Props) {
  const { t } = useTranslation();

  return (
    <Stack space={40}>
      <Headline size="small">{t("TokensSection.Step.textAndIcons")}</Headline>
      <Playground>
        <Columns space={40}>
          <PlaygroundExample theme="light" />
          <PlaygroundExample theme="dark" />
        </Columns>
      </Playground>
      <Columns space={40}>
        <Stack space={24}>
          <Title size="large">{t("Tokens.Color.backgroundTokens")}</Title>
          <Stack space={16}>
            <ColorSelector
              label={t("Tokens.Color.backgroundPrimary")}
              value={props.tokens.backgroundColor.backgroundPrimary}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  backgroundColor: { ...props.tokens.backgroundColor, backgroundPrimary: value },
                })
              }
            />
            <ColorSelector
              label={t("Tokens.Color.backgroundSecondary")}
              value={props.tokens.backgroundColor.backgroundSecondary}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  backgroundColor: { ...props.tokens.backgroundColor, backgroundSecondary: value },
                })
              }
            />
            <ColorSelector
              label={t("Tokens.Color.backgroundOverlay")}
              value={props.tokens.backgroundColor.backgroundOverlay}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  backgroundColor: { ...props.tokens.backgroundColor, backgroundOverlay: value },
                })
              }
            />
            <ColorSelector
              label={t("Tokens.Color.backgroundPrimaryInverse")}
              value={props.tokens.backgroundColor.backgroundPrimaryInverse}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  backgroundColor: {
                    ...props.tokens.backgroundColor,
                    backgroundPrimaryInverse: value,
                  },
                })
              }
            />
            <ColorSelector
              label={t("Tokens.Color.backgroundSecondaryInverse")}
              value={props.tokens.backgroundColor.backgroundSecondaryInverse}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  backgroundColor: {
                    ...props.tokens.backgroundColor,
                    backgroundSecondaryInverse: value,
                  },
                })
              }
            />
          </Stack>
        </Stack>
        <Stack space={24}>
          <Title size="large">{t("Tokens.Color.textTokens")}</Title>
          <Stack space={16}>
            <ColorSelector
              label={t("Tokens.Color.textPrimary")}
              value={props.tokens.textColor.textPrimary}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  textColor: { ...props.tokens.textColor, textPrimary: value },
                })
              }
            />
            <ColorSelector
              label={t("Tokens.Color.textSecondary")}
              value={props.tokens.textColor.textSecondary}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  textColor: { ...props.tokens.textColor, textSecondary: value },
                })
              }
            />
            <ColorSelector
              label={t("Tokens.Color.textPrimaryInverse")}
              value={props.tokens.textColor.textPrimaryInverse}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  textColor: { ...props.tokens.textColor, textPrimaryInverse: value },
                })
              }
            />
            <ColorSelector
              label={t("Tokens.Color.textSecondaryInverse")}
              value={props.tokens.textColor.textSecondaryInverse}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  textColor: { ...props.tokens.textColor, textSecondaryInverse: value },
                })
              }
            />
          </Stack>
        </Stack>
        <Stack space={24}>
          <Title size="large">{t("Tokens.Color.foregroundTokens")}</Title>
          <Stack space={16}>
            <ColorSelector
              label={t("Tokens.Color.foregroundPrimary")}
              value={props.tokens.foregroundColor.foregroundPrimary}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  foregroundColor: { ...props.tokens.foregroundColor, foregroundPrimary: value },
                })
              }
            />
            <ColorSelector
              label={t("Tokens.Color.foregroundSecondary")}
              value={props.tokens.foregroundColor.foregroundSecondary}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  foregroundColor: { ...props.tokens.foregroundColor, foregroundSecondary: value },
                })
              }
            />
            <ColorSelector
              label={t("Tokens.Color.foregroundPrimaryInverse")}
              value={props.tokens.foregroundColor.foregroundPrimaryInverse}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  foregroundColor: {
                    ...props.tokens.foregroundColor,
                    foregroundPrimaryInverse: value,
                  },
                })
              }
            />
            <ColorSelector
              label={t("Tokens.Color.foregroundSecondaryInverse")}
              value={props.tokens.foregroundColor.foregroundSecondaryInverse}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  foregroundColor: {
                    ...props.tokens.foregroundColor,
                    foregroundSecondaryInverse: value,
                  },
                })
              }
            />
          </Stack>
        </Stack>
      </Columns>
      <Actions
        primaryAction={{ label: t("Next"), onPress: props.onNext }}
        secondaryAction={{ label: t("Back"), onPress: props.onBack }}
      />
    </Stack>
  );
}

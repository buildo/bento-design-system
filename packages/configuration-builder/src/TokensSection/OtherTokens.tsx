import { useTranslation } from "react-i18next";
import { ThemeConfig } from "../ConfiguratorStatusContext";
import { Playground as _Playground } from "./Playground";
import { Column, Columns, Title, Stack, Box, Body, Link } from "@buildo/bento-design-system";
import { ColorSelector } from "./ColorSelector";

type Props = {
  tokens: Pick<
    ThemeConfig["tokens"],
    "backgroundColor" | "outlineColor" | "interactiveForegroundColor"
  >;
  onChange: (
    value: Pick<
      ThemeConfig["tokens"],
      "backgroundColor" | "outlineColor" | "interactiveForegroundColor"
    >
  ) => void;
};

function ModalPlayground() {
  const { t } = useTranslation();

  return (
    <_Playground>
      <Box position="relative" display="flex" padding={32} style={{ height: 400 }}>
        <Body size="medium">{t("LoremIpsum.longText")}</Body>
        <Box position="absolute" height="full" width="full" top={0} left={0} display="flex">
          <Box display="flex" flexGrow={1}>
            <Box flex={1} height="full" background="backgroundDarkScrim" />
            <Box flex={1} height="full" background="backgroundLightScrim" />
          </Box>
        </Box>
      </Box>
    </_Playground>
  );
}

function LinkPlayground() {
  const { t } = useTranslation();

  return (
    <_Playground>
      <Box display="flex" flexDirection="row" style={{ height: 200 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ height: 200 }}
          flex={1}
        >
          <Stack space={24}>
            <Link label={t("TokensSection.Step.other.linkEnabled")} />
            <Link label={t("TokensSection.Step.other.linkHover")} />
            <Link label={t("TokensSection.Step.other.linkFocus")} />
            <Link label={t("TokensSection.Step.other.linkDisabled")} />
          </Stack>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flex={1}
          background="backgroundSecondaryInverse"
          margin="negative40"
          padding={40}
        >
          <Stack space={24}>
            <Link kind="inverse" label={t("TokensSection.Step.other.linkEnabled")} />
            <Link kind="inverse" label={t("TokensSection.Step.other.linkHover")} />
            <Link kind="inverse" label={t("TokensSection.Step.other.linkFocus")} />
            <Link kind="inverse" label={t("TokensSection.Step.other.linkDisabled")} />
          </Stack>
        </Box>
      </Box>
    </_Playground>
  );
}

export function OtherTokens(props: Props) {
  const { t } = useTranslation();

  return (
    <Stack space={40}>
      <Columns space={40} alignY="stretch">
        <Column width="1/3">
          <Stack space={24}>
            <Title size="large">{t("Tokens.Color.Background")}</Title>
            <Stack space={16}>
              <ColorSelector
                label={t("Tokens.Color.lightScrim")}
                value={props.tokens.backgroundColor.backgroundLightScrim}
                onChange={(value) =>
                  props.onChange({
                    ...props.tokens,
                    backgroundColor: {
                      ...props.tokens.backgroundColor,
                      backgroundLightScrim: value,
                    },
                  })
                }
              />
              <ColorSelector
                label={t("Tokens.Color.darkScrim")}
                value={props.tokens.backgroundColor.backgroundDarkScrim}
                onChange={(value) =>
                  props.onChange({
                    ...props.tokens,
                    backgroundColor: {
                      ...props.tokens.backgroundColor,
                      backgroundDarkScrim: value,
                    },
                  })
                }
              />
            </Stack>
            <Title size="large">{t("Tokens.Color.Outline")}</Title>
            <ColorSelector
              label={t("Tokens.Color.outlineContainer")}
              value={props.tokens.outlineColor.outlineContainer}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  outlineColor: {
                    ...props.tokens.outlineColor,
                    outlineContainer: value,
                  },
                })
              }
            />
          </Stack>
        </Column>
        <ModalPlayground />
      </Columns>
      <Columns space={40} alignY="stretch">
        <Column width="1/3">
          <Stack space={24}>
            <Title size="large">{t("Tokens.Color.Link")}</Title>
            <Stack space={16}>
              <ColorSelector
                label={t("Tokens.Color.linkMasterColor")}
                value={props.tokens.interactiveForegroundColor.linkEnabled}
                onChange={(value) =>
                  props.onChange({
                    ...props.tokens,
                    interactiveForegroundColor: {
                      ...props.tokens.interactiveForegroundColor,
                      linkEnabled: value,
                    },
                  })
                }
              />
              <ColorSelector
                label={t("Tokens.Color.linkInverseMasterColor")}
                value={props.tokens.interactiveForegroundColor.linkEnabledInverse}
                onChange={(value) =>
                  props.onChange({
                    ...props.tokens,
                    interactiveForegroundColor: {
                      ...props.tokens.interactiveForegroundColor,
                      linkEnabledInverse: value,
                    },
                  })
                }
              />
            </Stack>
          </Stack>
        </Column>
        <LinkPlayground />
      </Columns>
    </Stack>
  );
}

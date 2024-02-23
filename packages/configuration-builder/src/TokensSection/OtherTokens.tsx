import { useTranslation } from "react-i18next";
import { ThemeConfig, useConfiguratorStatusContext } from "../ConfiguratorStatusContext";
import { Playground as _Playground } from "./Playground";
import {
  Column,
  Columns,
  Title,
  Stack,
  Box,
  Body,
  Link,
  Modal,
  unsafeLocalizedString,
  withBentoTheme,
} from "@buildo/bento-design-system";
import { ColorSelector } from "./ColorSelector";
import { useRef } from "react";
import { getRelativeStep as _getRelativeStep } from "../utils/paletteUtils";
import { useConfiguredTheme } from "../utils/preview";

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

  const ExampleModal = withBentoTheme(
    {
      backgroundColor: {
        backgroundDarkScrim: "transparent",
      },
    },
    Modal
  );

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <_Playground>
      <Box
        position="relative"
        display="flex"
        padding={32}
        style={{
          height: 400,
          // Note: the following transform doesn't alter the Box in any way, but it creates a context for the
          // fixed position of the modal overlay, so that it's not relative to the body but to this Box instead.
          transform: "scale(1)",
        }}
        ref={containerRef}
      >
        <Body size="medium">{t("LoremIpsum.longText")}</Body>
        <Box position="absolute" height="full" width="full" top={0} left={0} display="flex">
          <Box display="flex" flexGrow={1}>
            <Box flex={1} height="full" background="backgroundDarkScrim" />
            <Box flex={1} height="full" background="backgroundLightScrim" />
          </Box>
        </Box>
        <ExampleModal
          size="small"
          title={t("TokensSection.Step.other.modalTitle")}
          onClose={() => {}}
          portalContainer={containerRef.current ?? undefined}
          primaryAction={{
            label: unsafeLocalizedString(t("TokensSection.Step.other.modalAction")),
            onPress: () => {},
          }}
          secondaryAction={{
            label: unsafeLocalizedString(t("TokensSection.Step.other.modalCancel")),
            onPress: () => {},
          }}
          autoFocus={false}
        >
          <Body size="medium">{t("TokensSection.Step.other.modalContent")}</Body>
        </ExampleModal>
      </Box>
    </_Playground>
  );
}

function LinkPlayground() {
  const { t } = useTranslation();
  const theme = useConfiguredTheme();

  const HoverLink = withBentoTheme(
    {
      interactiveForegroundColor: {
        linkEnabled: theme.interactiveForegroundColor?.linkHover,
        linkEnabledInverse: theme.interactiveForegroundColor?.linkHoverInverse,
      },
    },
    Link
  );

  const FocusLink = withBentoTheme(
    {
      interactiveForegroundColor: {
        linkEnabled: theme.interactiveForegroundColor?.linkFocus,
        linkEnabledInverse: theme.interactiveForegroundColor?.linkFocusInverse,
      },
    },
    Link
  );

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
            <HoverLink label={t("TokensSection.Step.other.linkHover")} />
            <FocusLink label={t("TokensSection.Step.other.linkFocus")} />
            <Link isDisabled label={t("TokensSection.Step.other.linkDisabled")} />
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
            <HoverLink kind="inverse" label={t("TokensSection.Step.other.linkHover")} />
            <FocusLink kind="inverse" label={t("TokensSection.Step.other.linkFocus")} />
            <Link isDisabled kind="inverse" label={t("TokensSection.Step.other.linkDisabled")} />
          </Stack>
        </Box>
      </Box>
    </_Playground>
  );
}

export function OtherTokens(props: Props) {
  const { t } = useTranslation();
  const colors = useConfiguratorStatusContext().theme.colors;
  const getRelativeStep = _getRelativeStep(colors);

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
                      linkHover: getRelativeStep(value, 2),
                      linkFocus: getRelativeStep(value, 2),
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
                      linkHoverInverse: getRelativeStep(value, -1),
                      linkFocusInverse: getRelativeStep(value, -1),
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

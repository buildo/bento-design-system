import {
  Stack,
  Headline,
  Title,
  Actions,
  Columns,
  ButtonProps,
  Button,
  unsafeLocalizedString,
  withBentoTheme,
  Children,
  Body,
  SelectField,
  Column,
} from "@buildo/bento-design-system";
import { ColorSelector } from "./ColorSelector";
import { useTranslation } from "react-i18next";
import { Playground as _Playground } from "./Playground";
import { ThemeConfig } from "../ConfiguratorStatusContext";
import { useConfiguredTheme } from "../utils/preview";
import { ColorKey, ColorToken, colorToken, stepNames } from "../utils/paletteUtils";
import { useState } from "react";
import { match } from "ts-pattern";

type Props = {
  tokens: Pick<
    ThemeConfig["tokens"],
    "interactiveBackgroundColor" | "interactiveForegroundColor" | "outlineColor"
  >;
  onChange: (
    value: Pick<
      ThemeConfig["tokens"],
      "interactiveBackgroundColor" | "interactiveForegroundColor" | "outlineColor"
    >
  ) => void;
  onNext: () => void;
  onBack: () => void;
};

function PlayGroundButtonsStack({ hierarchy, kind }: Pick<ButtonProps, "kind" | "hierarchy">) {
  const theme = useConfiguredTheme();
  const { t } = useTranslation();

  // Note(vince): We simulate an hovered/focused button by replacing the Enabled status tokens with
  // the Hover/Focus ones, so that the button in the playground shows the hover/focus style when in idle state.
  const HoverButton = withBentoTheme(
    {
      interactiveBackgroundColor: {
        [`${hierarchy}SolidEnabledBackground`]:
          theme.interactiveBackgroundColor?.[`${hierarchy}SolidHoverBackground`],
        [`${hierarchy}TransparentEnabledBackground`]:
          theme.interactiveBackgroundColor?.[`${hierarchy}TransparentHoverBackground`],
      },
      interactiveForegroundColor: {
        [`${hierarchy}SolidEnabledForeground`]:
          theme.interactiveForegroundColor?.[`${hierarchy}SolidHoverForeground`],
        [`${hierarchy}TransparentEnabledForeground`]:
          theme.interactiveForegroundColor?.[`${hierarchy}TransparentHoverForeground`],
      },
    },
    Button
  );

  const FocusButton = withBentoTheme(
    {
      interactiveBackgroundColor: {
        [`${hierarchy}SolidEnabledBackground`]:
          theme.interactiveBackgroundColor?.[`${hierarchy}SolidFocusBackground`],
        [`${hierarchy}TransparentEnabledBackground`]:
          theme.interactiveBackgroundColor?.[`${hierarchy}TransparentFocusBackground`],
      },
      interactiveForegroundColor: {
        [`${hierarchy}SolidEnabledForeground`]:
          theme.interactiveForegroundColor?.[`${hierarchy}SolidFocusForeground`],
        [`${hierarchy}TransparentEnabledForeground`]:
          theme.interactiveForegroundColor?.[`${hierarchy}TransparentFocusForeground`],
      },
    },
    Button
  );

  return (
    <Stack space={12}>
      <Body size="medium" color="secondary">
        {t(`TokensSection.Step.InteractiveElements.${kind}Button`)}
      </Body>
      <Button
        size="large"
        hierarchy={hierarchy}
        kind={kind}
        label={unsafeLocalizedString("Button")}
        onPress={() => {}}
      />
      <HoverButton
        size="large"
        hierarchy={hierarchy}
        kind={kind}
        label={unsafeLocalizedString("Button")}
        onPress={() => {}}
      />
      <FocusButton
        size="large"
        hierarchy={hierarchy}
        kind={kind}
        label={unsafeLocalizedString("Button")}
        onPress={() => {}}
      />
      <Button
        size="large"
        hierarchy={hierarchy}
        kind="solid"
        label={unsafeLocalizedString("Button")}
        onPress={() => {}}
        isDisabled
      />
    </Stack>
  );
}

function Playground({ hierarchy }: { hierarchy: ButtonProps["hierarchy"] }) {
  return (
    <_Playground>
      <Columns space={80}>
        <PlayGroundButtonsStack hierarchy={hierarchy} kind="solid" />
        <PlayGroundButtonsStack hierarchy={hierarchy} kind="outline" />
        <PlayGroundButtonsStack hierarchy={hierarchy} kind="transparent" />
      </Columns>
    </_Playground>
  );
}

function getRelativeStep(colorToken: ColorToken, gap: number): ColorToken {
  if (colorToken.colorKey === "black" || colorToken.colorKey === "white") {
    return { colorKey: "black", alpha: colorToken.alpha };
  }
  const [palette, step] = colorToken.colorKey.split("-");
  const stepIndex = stepNames.indexOf(step as (typeof stepNames)[number]);
  const nextStepIndex = stepIndex + gap;
  if (stepNames[nextStepIndex] != null) {
    return {
      colorKey: `${palette}-${stepNames[nextStepIndex]}` as ColorKey,
      alpha: colorToken.alpha,
    };
  } else {
    return { colorKey: "black", alpha: colorToken.alpha };
  }
}

function getPaletteStep(
  colorKey: ColorKey,
  step: (typeof stepNames)[number],
  alpha: number
): ColorToken {
  if (colorKey === "black" || colorKey === "white") {
    return { colorKey: "black", alpha };
  }
  const [palette] = colorKey.split("-");
  return {
    colorKey: `${palette}-${step}` as ColorKey,
    alpha,
  };
}

function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function ButtonHierarchyConfiguration(
  props: Pick<Props, "tokens" | "onChange"> & {
    hierarchy: ButtonProps["hierarchy"];
    children?: Children;
  }
) {
  const { t } = useTranslation();

  return (
    <Columns space={40}>
      <Column width="1/3">
        <Stack space={24}>
          <Title size="large">{t(`Tokens.Color.${props.hierarchy}Interactive`)}</Title>
          <Stack space={16}>
            <ColorSelector
              label={t("Tokens.Color.interactiveSolidBackground")}
              value={
                props.tokens.interactiveBackgroundColor[`${props.hierarchy}SolidEnabledBackground`]
              }
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  interactiveBackgroundColor: {
                    ...props.tokens.interactiveBackgroundColor,
                    [`${props.hierarchy}SolidEnabledBackground`]: value,
                    [`${props.hierarchy}SolidHoverBackground`]: getRelativeStep(value, 2),
                    [`${props.hierarchy}SolidFocusBackground`]: getRelativeStep(value, 2),
                    [`${props.hierarchy}TransparentHoverBackground`]: getPaletteStep(
                      value.colorKey,
                      "10",
                      40
                    ),
                    [`${props.hierarchy}TransparentFocusBackground`]: getPaletteStep(
                      value.colorKey,
                      "10",
                      40
                    ),
                  },
                  interactiveForegroundColor: {
                    ...props.tokens.interactiveForegroundColor,
                    [`${props.hierarchy}TransparentEnabledForeground`]: value,
                    [`${props.hierarchy}TransparentHoverForeground`]: getRelativeStep(value, 2),
                    [`${props.hierarchy}TransparentFocusForeground`]: getRelativeStep(value, 2),
                  },
                  outlineColor: {
                    ...props.tokens.outlineColor,
                    [`outlineInteractive${capitalizeFirstLetter(props.hierarchy)}Enabled`]: value,
                    [`outlineInteractive${capitalizeFirstLetter(props.hierarchy)}Focus`]:
                      getRelativeStep(value, 2),
                    [`outlineInteractive${capitalizeFirstLetter(props.hierarchy)}Hover`]:
                      getRelativeStep(value, 2),
                  },
                })
              }
            />
            <ColorSelector
              label={t("Tokens.Color.interactiveSolidForeground")}
              value={
                props.tokens.interactiveForegroundColor[`${props.hierarchy}SolidEnabledForeground`]
              }
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  interactiveForegroundColor: {
                    ...props.tokens.interactiveForegroundColor,
                    [`${props.hierarchy}SolidEnabledForeground`]: value,
                    [`${props.hierarchy}SolidHoverForeground`]: value,
                    [`${props.hierarchy}SolidFocusForeground`]: value,
                  },
                })
              }
            />
          </Stack>
        </Stack>
      </Column>
      <Playground hierarchy={props.hierarchy} />
    </Columns>
  );
}

function SecondaryButtonConfiguration(props: Pick<Props, "tokens" | "onChange">) {
  const { t } = useTranslation();

  const [kind, setKind] = useState<"light" | "dark">("light");

  function setTokens(kind: "light" | "dark") {
    const [background, foreground] = match(kind)
      .with("light", () => [colorToken("Neutral-5"), colorToken("Neutral-90")])
      .with("dark", () => [colorToken("Neutral-70"), colorToken("Neutral-1")])
      .exhaustive();

    props.onChange({
      interactiveBackgroundColor: {
        ...props.tokens.interactiveBackgroundColor,
        secondarySolidEnabledBackground: background,
        secondarySolidHoverBackground: getRelativeStep(background, 2),
        secondarySolidFocusBackground: getRelativeStep(background, 2),
        secondaryTransparentHoverBackground: colorToken("Neutral-10", 40),
        secondaryTransparentFocusBackground: colorToken("Neutral-10", 40),
      },
      interactiveForegroundColor: {
        ...props.tokens.interactiveForegroundColor,
        secondarySolidEnabledForeground: foreground,
        secondarySolidHoverForeground: foreground,
        secondarySolidFocusForeground: foreground,
        secondaryTransparentEnabledForeground: colorToken("Neutral-70"),
        secondaryTransparentHoverForeground: colorToken("Neutral-90"),
        secondaryTransparentFocusForeground: colorToken("Neutral-90"),
      },
      outlineColor: {
        ...props.tokens.outlineColor,
        outlineInteractiveSecondaryEnabled: colorToken("Neutral-70"),
        outlineInteractiveSecondaryFocus: colorToken("Neutral-90"),
        outlineInteractiveSecondaryHover: colorToken("Neutral-90"),
      },
    });
  }

  return (
    <Columns space={40}>
      <Column width="1/3">
        <Stack space={24}>
          <Title size="large">{t(`Tokens.Color.secondaryInteractive`)}</Title>
          <SelectField
            label={t("Tokens.Color.kind")}
            value={kind}
            onChange={(_value) => {
              const value = _value ?? "light";
              setKind(value);
              setTokens(value);
            }}
            options={[
              { label: t("Tokens.Color.light"), value: "light" as const },
              { label: t("Tokens.Color.dark"), value: "dark" as const },
            ]}
          />
        </Stack>
      </Column>
      <Playground hierarchy="secondary" />
    </Columns>
  );
}

export function InteractiveElementsTokens(props: Props) {
  const { t } = useTranslation();

  return (
    <Stack space={40}>
      <Headline size="small">{t("TokensSection.Step.interactiveElements")}</Headline>
      <ButtonHierarchyConfiguration
        tokens={props.tokens}
        onChange={props.onChange}
        hierarchy="primary"
      />
      <SecondaryButtonConfiguration tokens={props.tokens} onChange={props.onChange} />
      <ButtonHierarchyConfiguration
        tokens={props.tokens}
        onChange={props.onChange}
        hierarchy="danger"
      />
      <Actions
        primaryAction={{ label: t("Next"), onPress: props.onNext }}
        secondaryAction={{ label: t("Back"), onPress: props.onBack }}
      />
    </Stack>
  );
}

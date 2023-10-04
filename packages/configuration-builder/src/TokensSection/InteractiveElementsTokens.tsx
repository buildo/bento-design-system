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
} from "@buildo/bento-design-system";
import { ColorSelector } from "./ColorSelector";
import { useTranslation } from "react-i18next";
import { Playground } from "./Playground";
import { ThemeConfig } from "../ConfiguratorStatusContext";
import { useConfiguredTheme } from "../utils/preview";
import { ColorKey, ColorToken, stepNames } from "../utils/paletteUtils";

type Props = {
  tokens: Pick<ThemeConfig["tokens"], "interactiveBackgroundColor" | "interactiveForegroundColor">;
  onChange: (
    value: Pick<ThemeConfig["tokens"], "interactiveBackgroundColor" | "interactiveForegroundColor">
  ) => void;
  onNext: () => void;
  onBack: () => void;
};

function PlayGroundButtonsStack({ hierarchy, kind }: Pick<ButtonProps, "kind" | "hierarchy">) {
  const theme = useConfiguredTheme();
  const { t } = useTranslation();

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

function PlaygroundExample({ hierarchy }: { hierarchy: ButtonProps["hierarchy"] }) {
  return (
    <Columns space={80}>
      <PlayGroundButtonsStack hierarchy={hierarchy} kind="solid" />
      <PlayGroundButtonsStack hierarchy={hierarchy} kind="outline" />
      <PlayGroundButtonsStack hierarchy={hierarchy} kind="transparent" />
    </Columns>
  );
}

function getNextStep(colorToken: ColorToken, steps: number): ColorToken {
  if (colorToken.colorKey === "black" || colorToken.colorKey === "white") {
    return { colorKey: "black", alpha: colorToken.alpha };
  }
  const [palette, step] = colorToken.colorKey.split("-");
  const stepIndex = stepNames.indexOf(step as (typeof stepNames)[number]);
  const nextStepIndex = stepIndex + steps;
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

function ButtonHierarchyConfiguration(
  props: Pick<Props, "tokens" | "onChange"> & {
    hierarchy: ButtonProps["hierarchy"];
    children?: Children;
  }
) {
  const { t } = useTranslation();

  return (
    <Columns space={40}>
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
                  [`${props.hierarchy}SolidHoverBackground`]: getNextStep(value, 2),
                  [`${props.hierarchy}SolidFocusBackground`]: getNextStep(value, 2),
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
                  [`${props.hierarchy}TransparentHoverForeground`]: getNextStep(value, 2),
                  [`${props.hierarchy}TransparentFocusForeground`]: getNextStep(value, 2),
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
      <Playground>
        <PlaygroundExample hierarchy={props.hierarchy} />
      </Playground>
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
      <ButtonHierarchyConfiguration
        tokens={props.tokens}
        onChange={props.onChange}
        hierarchy="secondary"
      />
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

import {
  Stack,
  Title,
  Columns,
  ButtonProps,
  Button,
  unsafeLocalizedString,
  withBentoTheme,
  Children,
  Body,
  Column,
} from "@buildo/bento-design-system";
import { ColorSelector } from "./ColorSelector";
import { useTranslation } from "react-i18next";
import { Playground as _Playground } from "./Playground";
import { ThemeConfig } from "../ConfiguratorStatusContext";
import { useConfiguredTheme } from "../utils/preview";
import { ColorKey, ColorToken, stepNames } from "../utils/paletteUtils";

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
      <Columns space={80} align="center">
        <Column width="content">
          <PlayGroundButtonsStack hierarchy={hierarchy} kind="solid" />
        </Column>
        <Column width="content">
          <PlayGroundButtonsStack hierarchy={hierarchy} kind="outline" />
        </Column>
        <Column width="content">
          <PlayGroundButtonsStack hierarchy={hierarchy} kind="transparent" />
        </Column>
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
            <ColorSelector
              label={t("Tokens.Color.interactiveOutlineTransparent")}
              value={
                props.tokens.interactiveForegroundColor[
                  `${props.hierarchy}TransparentEnabledForeground`
                ]
              }
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  interactiveForegroundColor: {
                    ...props.tokens.interactiveForegroundColor,
                    [`${props.hierarchy}TransparentEnabledForeground`]: value,
                    [`${props.hierarchy}TransparentHoverForeground`]: getRelativeStep(value, 2),
                    [`${props.hierarchy}TransparentFocusForeground`]: getRelativeStep(value, 2),
                  },
                  interactiveBackgroundColor: {
                    ...props.tokens.interactiveBackgroundColor,
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
          </Stack>
        </Stack>
      </Column>
      <Playground hierarchy={props.hierarchy} />
    </Columns>
  );
}

export function InteractiveElementsTokens(props: Props) {
  return (
    <>
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
    </>
  );
}

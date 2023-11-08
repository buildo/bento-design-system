import {
  Body,
  Columns,
  Stack,
  TextField as BentoTextField,
  TextArea as BentoTextArea,
  withBentoTheme,
  Actions,
  Column,
} from "@buildo/bento-design-system";
import { Playground as _Playground } from "./Playground";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ThemeConfig } from "../ConfiguratorStatusContext";
import { useConfiguredTheme } from "../utils/preview";
import { ColorSelector } from "./ColorSelector";

type Props = {
  tokens: Pick<ThemeConfig["tokens"], "outlineColor">;
  onChange: (value: Pick<ThemeConfig["tokens"], "outlineColor">) => void;
  onNext: () => void;
  onBack: () => void;
};

function TextField(props: { initialValue?: string }) {
  const { t } = useTranslation();
  const [value, setValue] = useState(props.initialValue ?? "");

  return (
    <BentoTextField
      label={t("TokensSection.Step.inputs.label")}
      placeholder={t("TokensSection.Step.inputs.placeholder")}
      value={value}
      onChange={setValue}
    />
  );
}

function TextArea(props: { initialValue?: string }) {
  const { t } = useTranslation();
  const [value, setValue] = useState(props.initialValue ?? "");

  return (
    <BentoTextArea
      label={t("TokensSection.Step.inputs.label")}
      placeholder={t("TokensSection.Step.inputs.placeholder")}
      value={value}
      onChange={setValue}
    />
  );
}

function Playground() {
  const { t } = useTranslation();
  const theme = useConfiguredTheme();

  const HoverTextField = withBentoTheme(
    {
      boxShadow: {
        outlineInputEnabled: theme.boxShadow?.outlineInputHover,
      },
    },
    TextField
  );

  const FocusedTextField = withBentoTheme(
    {
      boxShadow: {
        outlineInputEnabled: theme.boxShadow?.outlineInputFocus,
      },
    },
    TextField
  );

  const HoverTextArea = withBentoTheme(
    {
      boxShadow: {
        outlineInputEnabled: theme.boxShadow?.outlineInputHover,
      },
    },
    TextArea
  );

  const FocusedTextArea = withBentoTheme(
    {
      boxShadow: {
        outlineInputEnabled: theme.boxShadow?.outlineInputFocus,
      },
    },
    TextArea
  );

  return (
    <_Playground>
      <Columns space={40}>
        <Stack space={12}>
          <Body size="medium" color="secondary">
            {t("TokensSection.Step.inputs.textField")}
          </Body>
          <TextField />
          <HoverTextField />
          <FocusedTextField initialValue="value" />
        </Stack>
        <Stack space={12}>
          <Body size="medium" color="secondary">
            {t("TokensSection.Step.inputs.textArea")}
          </Body>
          <TextArea />
          <HoverTextArea />
          <FocusedTextArea initialValue="value" />
        </Stack>
      </Columns>
    </_Playground>
  );
}

export function InputTokens(props: Props) {
  const { t } = useTranslation();
  return (
    <Stack space={40}>
      <Columns space={40}>
        <Column width="1/3">
          <Stack space={16}>
            <ColorSelector
              label={t("Tokens.Color.outlineEnabled")}
              value={props.tokens.outlineColor.outlineInputEnabled}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  outlineColor: {
                    ...props.tokens.outlineColor,
                    outlineInputEnabled: value,
                  },
                })
              }
            />
            <ColorSelector
              label={t("Tokens.Color.outlineHover")}
              value={props.tokens.outlineColor.outlineInputHover}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  outlineColor: {
                    ...props.tokens.outlineColor,
                    outlineInputHover: value,
                  },
                })
              }
            />
            <ColorSelector
              label={t("Tokens.Color.outlineFocus")}
              value={props.tokens.outlineColor.outlineInputFocus}
              onChange={(value) =>
                props.onChange({
                  ...props.tokens,
                  outlineColor: {
                    ...props.tokens.outlineColor,
                    outlineInputFocus: value,
                  },
                })
              }
            />
          </Stack>
        </Column>
        <Playground />
      </Columns>
      <Actions
        primaryAction={{ label: t("Next"), onPress: props.onNext }}
        secondaryAction={{ label: t("Back"), onPress: props.onBack }}
      />
    </Stack>
  );
}

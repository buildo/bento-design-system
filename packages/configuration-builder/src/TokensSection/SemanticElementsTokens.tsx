import {
  Stack,
  unsafeLocalizedString,
  Banner,
  Body,
  Columns,
  Title,
} from "@buildo/bento-design-system";
import { useTranslation } from "react-i18next";
import { Playground as _Playground } from "./Playground";
import { ThemeConfig } from "../ConfiguratorStatusContext";
import { ColorSelector } from "./ColorSelector";

type Props = {
  tokens: Pick<ThemeConfig["tokens"], "backgroundColor" | "foregroundColor" | "textColor">;
  onChange: (
    value: Pick<ThemeConfig["tokens"], "backgroundColor" | "foregroundColor" | "textColor">
  ) => void;
};

function Playground() {
  const { t } = useTranslation();
  return (
    <_Playground>
      <Columns space={40}>
        {(["informative", "positive", "warning", "negative"] as const).map((kind) => (
          <Stack space={12}>
            <Body size="medium" color="secondary">
              {t(`TokensSection.Step.semanticElements.${kind}Banner`)}
            </Body>
            <Banner key={kind} kind={kind} title={unsafeLocalizedString("Title")} />
          </Stack>
        ))}
      </Columns>
    </_Playground>
  );
}

export function SemanticElementsTokens(props: Props) {
  const { t } = useTranslation();

  return (
    <>
      <Playground />
      <Columns space={40}>
        <Stack space={24}>
          <Title size="large">{t("Tokens.Color.backgroundTokens")}</Title>
          <Stack space={16}>
            {(
              [
                "backgroundInformative",
                "backgroundPositive",
                "backgroundWarning",
                "backgroundNegative",
              ] as const
            ).map((token) => (
              <ColorSelector
                label={t(`Tokens.Color.${token}`)}
                value={props.tokens.backgroundColor[token]}
                onChange={(value) =>
                  props.onChange({
                    ...props.tokens,
                    backgroundColor: {
                      ...props.tokens.backgroundColor,
                      [token]: value,
                    },
                  })
                }
              />
            ))}
          </Stack>
        </Stack>
        <Stack space={24}>
          <Title size="large">{t("Tokens.Color.textTokens")}</Title>
          <Stack space={16}>
            {(["textInformative", "textPositive", "textWarning", "textNegative"] as const).map(
              (token) => (
                <ColorSelector
                  label={t(`Tokens.Color.${token}`)}
                  value={props.tokens.textColor[token]}
                  onChange={(value) =>
                    props.onChange({
                      ...props.tokens,
                      textColor: {
                        ...props.tokens.textColor,
                        [token]: value,
                      },
                    })
                  }
                />
              )
            )}
          </Stack>
        </Stack>
        <Stack space={24}>
          <Title size="large">{t("Tokens.Color.foregroundTokens")}</Title>
          <Stack space={16}>
            {(
              [
                "foregroundInformative",
                "foregroundPositive",
                "foregroundWarning",
                "foregroundNegative",
              ] as const
            ).map((token) => (
              <ColorSelector
                label={t(`Tokens.Color.${token}`)}
                value={props.tokens.foregroundColor[token]}
                onChange={(value) =>
                  props.onChange({
                    ...props.tokens,
                    foregroundColor: {
                      ...props.tokens.foregroundColor,
                      [token]: value,
                    },
                  })
                }
              />
            ))}
          </Stack>
        </Stack>
      </Columns>
    </>
  );
}

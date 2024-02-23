import {
  BarChart,
  Body,
  Chip,
  Column,
  Columns,
  Inline,
  SelectField,
  Stack,
  Title,
  unsafeLocalizedString,
} from "@buildo/bento-design-system";
import { ThemeConfig } from "../ConfiguratorStatusContext";
import { Playground } from "./Playground";
import { useTranslation } from "react-i18next";
import { ColorToken, colorToken, stepNames } from "../utils/paletteUtils";

type Props = {
  tokens: Pick<ThemeConfig["tokens"], "dataVisualizationColor">;
  onChange: (value: Pick<ThemeConfig["tokens"], "dataVisualizationColor">) => void;
};

const dataVizColors = [
  "indigo",
  "violet",
  "pink",
  "red",
  "orange",
  "yellow",
  "green",
  "jade",
  "blue",
  "grey",
] as const;

function LowContrastPlayground() {
  const { t } = useTranslation();
  return (
    <Playground>
      <Stack space={12}>
        <Body size="medium" color="secondary">
          {t("TokensSection.Step.categoricalPalettes.chip")}
        </Body>
        <Inline space={24}>
          {dataVizColors.map((color) => (
            <Chip
              key={color}
              color={color}
              label={t("TokensSection.Step.categoricalPalettes.chipLabel")}
            />
          ))}
        </Inline>
      </Stack>
    </Playground>
  );
}

function HighContrastPlayground() {
  const { t } = useTranslation();
  return (
    <Playground>
      <Stack space={12}>
        <Body size="medium" color="secondary">
          {t("TokensSection.Step.categoricalPalettes.chip")}
        </Body>
        <Inline space={24}>
          <BarChart
            height={300}
            dataKey="data"
            categories={["A", "B", "C", "D", "E", "F", "G", "H", "I", "L"]}
            hideLegend
            hideTooltip
            data={[
              {
                data: "data",
                A: 170,
                B: 131,
                C: 223,
                D: 178,
                E: 178,
                F: 131,
                G: 223,
                H: 131,
                I: 223,
                L: 223,
              },
            ]}
          >
            {dataVizColors.map((color) => (
              <Chip
                key={color}
                color={color}
                label={t("TokensSection.Step.categoricalPalettes.chipLabel")}
              />
            ))}
          </BarChart>
        </Inline>
      </Stack>
    </Playground>
  );
}

const getStepFromToken = (token: ColorToken): (typeof stepNames)[number] => {
  return token.colorKey.split("-")[1] as (typeof stepNames)[number];
};

export function CategoricalPalettesTokens(props: Props) {
  const { t } = useTranslation();
  return (
    <>
      <Columns space={40}>
        <Column width="1/3">
          <Stack space={24}>
            <Title size="large">{t("TokensSection.Step.categoricalPalettes.lowContrast")}</Title>
            <SelectField
              label={t("TokensSection.Step.categoricalPalettes.colorStep")}
              value={getStepFromToken(props.tokens.dataVisualizationColor.softBlue)}
              options={stepNames.map((step) => ({
                value: step,
                label: unsafeLocalizedString(step),
              }))}
              onChange={(step) => {
                if (!step) return;
                props.onChange({
                  ...props.tokens,
                  dataVisualizationColor: {
                    ...props.tokens.dataVisualizationColor,
                    softIndigo: colorToken(`Indigo-${step}`),
                    softViolet: colorToken(`Violet-${step}`),
                    softPink: colorToken(`Pink-${step}`),
                    softRed: colorToken(`Red-${step}`),
                    softOrange: colorToken(`Orange-${step}`),
                    softYellow: colorToken(`Yellow-${step}`),
                    softGreen: colorToken(`Green-${step}`),
                    softJade: colorToken(`Jade-${step}`),
                    softBlue: colorToken(`Blue-${step}`),
                    softGrey: colorToken(`Grey-${step}`),
                  },
                });
              }}
            />
          </Stack>
        </Column>
        <LowContrastPlayground />
      </Columns>
      <Columns space={40}>
        <Column width="1/3">
          <Stack space={24}>
            <Title size="large">{t("TokensSection.Step.categoricalPalettes.highContrast")}</Title>
            <SelectField
              label={t("TokensSection.Step.categoricalPalettes.colorStep")}
              value={getStepFromToken(props.tokens.dataVisualizationColor.brightBlue)}
              options={stepNames.map((step) => ({
                value: step,
                label: unsafeLocalizedString(step),
              }))}
              onChange={(step) => {
                if (!step) return;
                props.onChange({
                  ...props.tokens,
                  dataVisualizationColor: {
                    ...props.tokens.dataVisualizationColor,
                    brightIndigo: colorToken(`Indigo-${step}`),
                    brightViolet: colorToken(`Violet-${step}`),
                    brightPink: colorToken(`Pink-${step}`),
                    brightRed: colorToken(`Red-${step}`),
                    brightOrange: colorToken(`Orange-${step}`),
                    brightYellow: colorToken(`Yellow-${step}`),
                    brightGreen: colorToken(`Green-${step}`),
                    brightJade: colorToken(`Jade-${step}`),
                    brightBlue: colorToken(`Blue-${step}`),
                    brightGrey: colorToken(`Grey-${step}`),
                  },
                });
              }}
            />
          </Stack>
        </Column>
        <HighContrastPlayground />
      </Columns>
    </>
  );
}

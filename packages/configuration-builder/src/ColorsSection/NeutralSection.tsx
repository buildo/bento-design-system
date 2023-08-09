import { useTranslation } from "react-i18next";
import { ThemeConfig } from "../ThemeConfigurator/ThemeConfigurator";
import { Actions, Headline, Stack } from "@buildo/bento-design-system";
import { ColorEditor } from "../ColorEditor/ColorEditor";
import { ColorPresets } from "./ColorPresets";
import { HexColor } from "../utils/colorUtils";
import { defaultColorConfig } from "./defaultColor";

type NeutralColor = ThemeConfig["colors"]["neutral"];

type Props = {
  value: NeutralColor;
  onChange: (value: NeutralColor) => void;
  onNext: () => void;
  onBack: () => void;
};

const presets: HexColor[] = [
  "#1A212B" as HexColor,
  "#5A7481" as HexColor,
  "#6E6E6E" as HexColor,
  "#786363" as HexColor,
];

export function NeutralSection(props: Props) {
  const { t } = useTranslation();

  return (
    <Stack space={40}>
      <Stack space={24}>
        <Headline size="small">{t("ColorsSection.Step.neutral")}</Headline>
      </Stack>
      <ColorPresets
        kind="single"
        presets={presets}
        onSelect={(preset) => props.onChange(defaultColorConfig(preset))}
      />

      <ColorEditor
        name={t("NeutralColors.neutral")}
        value={props.value}
        onChange={props.onChange}
      />

      <Actions
        primaryAction={{ label: t("Next"), onPress: props.onNext }}
        secondaryAction={{ label: t("Back"), onPress: props.onBack }}
      />
    </Stack>
  );
}

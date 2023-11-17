import { useTranslation } from "react-i18next";
import { ColorEditor } from "../ColorEditor/ColorEditor";
import { ColorPresets } from "./ColorPresets";
import { HexColor } from "../utils/colorUtils";
import { defaultColorConfig } from "./defaultColor";
import { ThemeConfig } from "../ConfiguratorStatusContext";

type NeutralColor = ThemeConfig["colors"]["neutral"];

type Props = {
  value: NeutralColor;
  onChange: (value: NeutralColor) => void;
};

const presets: HexColor[] = [
  "#1A212B" as HexColor,
  "#5A7481" as HexColor,
  "#6E6E6E" as HexColor,
  "#786363" as HexColor,
];

export function NeutralColor(props: Props) {
  const { t } = useTranslation();

  return (
    <>
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
    </>
  );
}

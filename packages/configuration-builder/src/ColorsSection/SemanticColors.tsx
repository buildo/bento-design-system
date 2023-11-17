import { useTranslation } from "react-i18next";
import { ColorEditor } from "../ColorEditor/ColorEditor";
import { ColorPresets } from "./ColorPresets";
import { HexColor } from "../utils/colorUtils";
import { defaultColorConfig } from "./defaultColor";
import { ThemeConfig } from "../ConfiguratorStatusContext";

type SemanticColors = ThemeConfig["colors"]["semantic"];

type Props = {
  value: SemanticColors;
  onChange: (value: SemanticColors) => void;
};

const presets: Record<"informative" | "positive" | "warning" | "negative", HexColor>[] = [
  {
    informative: "#4799EB" as HexColor,
    positive: "#66CC66" as HexColor,
    warning: "#FFBB33" as HexColor,
    negative: "#F04B42" as HexColor,
  },
  {
    informative: "#477EEB" as HexColor,
    positive: "#66CC80" as HexColor,
    warning: "#FFC233" as HexColor,
    negative: "#F04251" as HexColor,
  },
  {
    informative: "#47B4EB" as HexColor,
    positive: "#77CC66" as HexColor,
    warning: "#FFAA33" as HexColor,
    negative: "#F05142" as HexColor,
  },
  {
    informative: "#47DDEB" as HexColor,
    positive: "#88CC66" as HexColor,
    warning: "#FFCC33" as HexColor,
    negative: "#F05F42" as HexColor,
  },
];

export function SemanticColors(props: Props) {
  const { t } = useTranslation();

  return (
    <>
      <ColorPresets
        kind="multiple"
        presets={presets}
        onSelect={(preset) =>
          props.onChange({
            informative: defaultColorConfig(preset.informative),
            positive: defaultColorConfig(preset.positive),
            warning: defaultColorConfig(preset.warning),
            negative: defaultColorConfig(preset.negative),
          })
        }
      />

      <ColorEditor
        name={t("SemanticColors.informative")}
        value={props.value.informative}
        onChange={(value) => props.onChange({ ...props.value, informative: value })}
      />

      <ColorEditor
        name={t("SemanticColors.positive")}
        value={props.value.positive}
        onChange={(value) => props.onChange({ ...props.value, positive: value })}
      />

      <ColorEditor
        name={t("SemanticColors.warning")}
        value={props.value.warning}
        onChange={(value) => props.onChange({ ...props.value, warning: value })}
      />

      <ColorEditor
        name={t("SemanticColors.negative")}
        value={props.value.negative}
        onChange={(value) => props.onChange({ ...props.value, negative: value })}
      />
    </>
  );
}

import { useTranslation } from "react-i18next";
import { ColorEditor } from "../ColorEditor/ColorEditor";
import { ThemeConfig } from "../ConfiguratorStatusContext";

type DataVizColors = ThemeConfig["colors"]["dataVisualization"];

type Props = {
  value: DataVizColors;
  onChange: (value: DataVizColors) => void;
};

export function DataVizColors(props: Props) {
  const { t } = useTranslation();

  return (
    <>
      <ColorEditor
        name={t("DataVizColors.grey")}
        value={props.value.grey}
        onChange={(grey) => props.onChange({ ...props.value, grey })}
      />

      <ColorEditor
        name={t("DataVizColors.red")}
        value={props.value.red}
        onChange={(red) => props.onChange({ ...props.value, red })}
      />

      <ColorEditor
        name={t("DataVizColors.orange")}
        value={props.value.orange}
        onChange={(orange) => props.onChange({ ...props.value, orange })}
      />

      <ColorEditor
        name={t("DataVizColors.yellow")}
        value={props.value.yellow}
        onChange={(yellow) => props.onChange({ ...props.value, yellow })}
      />

      <ColorEditor
        name={t("DataVizColors.green")}
        value={props.value.green}
        onChange={(green) => props.onChange({ ...props.value, green })}
      />

      <ColorEditor
        name={t("DataVizColors.jade")}
        value={props.value.jade}
        onChange={(jade) => props.onChange({ ...props.value, jade })}
      />

      <ColorEditor
        name={t("DataVizColors.blue")}
        value={props.value.blue}
        onChange={(blue) => props.onChange({ ...props.value, blue })}
      />

      <ColorEditor
        name={t("DataVizColors.indigo")}
        value={props.value.indigo}
        onChange={(indigo) => props.onChange({ ...props.value, indigo })}
      />

      <ColorEditor
        name={t("DataVizColors.violet")}
        value={props.value.violet}
        onChange={(violet) => props.onChange({ ...props.value, violet })}
      />

      <ColorEditor
        name={t("DataVizColors.pink")}
        value={props.value.pink}
        onChange={(pink) => props.onChange({ ...props.value, pink })}
      />
    </>
  );
}

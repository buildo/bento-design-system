import { SelectField } from "@buildo/bento-design-system";
import { LightnessInterpolation } from "./ColorEditor";
import { useTranslation } from "react-i18next";

type Props = {
  value: LightnessInterpolation;
  onChange: (value: LightnessInterpolation | undefined) => void;
};

export function LightnessInterpolationSelector(props: Props) {
  const { t } = useTranslation();
  return (
    <SelectField
      label={t("ColorEditor.lightnessInterpolation")}
      value={props.value}
      onChange={props.onChange}
      options={[
        { value: "Linear", label: t("ColorEditor.LightnessInterpolation.linear") },
        { value: "EaseIn", label: t("ColorEditor.LightnessInterpolation.easeIn") },
        { value: "EaseOut", label: t("ColorEditor.LightnessInterpolation.easeOut") },
        { value: "EaseInOut", label: t("ColorEditor.LightnessInterpolation.easeInOut") },
      ]}
    />
  );
}

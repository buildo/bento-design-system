import { TextField } from "@buildo/bento-design-system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HexColor, isHexColor } from "../utils/colorUtils";

type Props = {
  value: HexColor;
  onChange: (value: HexColor) => void;
};

export function HexColorField(props: Props) {
  const [value, setValue] = useState<string>(props.value);
  const { t } = useTranslation();

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <TextField
      label={t("ColorEditor.hexValue")}
      value={value}
      onChange={(value) => {
        setValue(value);
        if (isHexColor(value)) {
          props.onChange(value);
        }
      }}
    />
  );
}

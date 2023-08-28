import { Box, Inline, LocalizedString, TextField } from "@buildo/bento-design-system";
import { useEffect, useState } from "react";
import { HexColor, isHexColor } from "../utils/colorUtils";

type Props = {
  label: LocalizedString;
  value: HexColor;
  onChange: (value: HexColor) => void;
  isReadOnly?: boolean;
};

export function HexColorField(props: Props) {
  const [value, setValue] = useState<string>(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <Inline space={12} alignY="bottom">
      <TextField
        label={props.label}
        value={value}
        onChange={(value) => {
          setValue(value);
          if (isHexColor(value)) {
            props.onChange(value);
          }
        }}
        isReadOnly={props.isReadOnly}
      />
      <Box borderRadius="circled" style={{ width: 48, height: 48, backgroundColor: props.value }} />
    </Inline>
  );
}

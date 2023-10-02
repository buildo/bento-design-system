import {
  Box,
  Column,
  Columns,
  LocalizedString,
  NumberField,
  Stack,
  Title,
} from "@buildo/bento-design-system";
import { useConfiguratorStatusContext } from "../ConfiguratorStatusContext";
import { useTranslation } from "react-i18next";
import { ColorPickerField } from "../ColorPickerField/ColorPickerField";
import { colorTokenToRGBA } from "../utils/paletteUtils";

type Value = {
  colorKey: string;
  alpha: number;
};

export function ColorSelector(props: {
  label: LocalizedString;
  value: Value;
  onChange: (value: Value) => void;
}) {
  const colors = useConfiguratorStatusContext().theme.colors;
  const selectedColor = colorTokenToRGBA(colors)(props.value);
  const { t } = useTranslation();

  return (
    <Columns space={24} alignY="stretch">
      <Column width="content">
        <Box
          borderRadius={16}
          height="full"
          style={{ background: selectedColor, width: 64 }}
          boxShadow="outlineContainer"
        />
      </Column>
      <Columns space={12} alignY="bottom">
        <Stack space={8}>
          <Title size="medium">{props.label}</Title>
          <ColorPickerField
            colors={colors}
            label={t("Tokens.Color.label")}
            value={props.value.colorKey}
            onChange={(colorKey) => props.onChange({ ...props.value, colorKey: colorKey })}
          />
        </Stack>
        <Column width="content">
          <Box style={{ width: 100 }}>
            <NumberField
              kind="percentage"
              value={props.value.alpha}
              onChange={(alpha) => props.onChange({ ...props.value, alpha })}
              label={t("Tokens.Color.alphaLabel")}
            />
          </Box>
        </Column>
      </Columns>
    </Columns>
  );
}

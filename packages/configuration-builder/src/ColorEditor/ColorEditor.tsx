import {
  Box,
  Button,
  Card,
  CheckboxField,
  Column,
  Columns,
  Divider,
  Inline,
  LocalizedString,
  Stack,
  Title,
} from "@buildo/bento-design-system";
import { HexColorField } from "./HexColorField";
import { Palette } from "./Palette";
import { HexToHSL, HexColor } from "../utils/colorUtils";
import { useTranslation } from "react-i18next";
import { LightnessInterpolationSelector } from "./LightnessInterpolationSelector";
import { CounterField } from "./CounterField";

export type LightnessInterpolation = "Linear" | "EaseIn" | "EaseOut" | "EaseInOut";

export type ColorConfig = {
  referenceColor: HexColor;
  useReferenceAsKeyColor: boolean;
  lightnessInterpolation: LightnessInterpolation;
  hue: number;
  saturation: number;
};

type Props = {
  name: LocalizedString;
  value: ColorConfig;
} & (
  | {
      isReadOnly?: false;
      onChange: (value: ColorConfig) => void;
      onDelete?: () => void;
    }
  | {
      isReadOnly: true;
    }
);

export function ColorEditor(props: Props) {
  const { t } = useTranslation();

  function onReferenceColorChange(referenceColor: HexColor) {
    if (props.isReadOnly) return;
    const hsl = HexToHSL(referenceColor);
    props.onChange({
      ...props.value,
      referenceColor,
      hue: hsl.h,
      saturation: hsl.s,
    });
  }

  function onHueChange(hue: number) {
    if (props.isReadOnly) return;
    props.onChange({ ...props.value, hue });
  }

  function onSaturationChange(saturation: number) {
    if (props.isReadOnly) return;
    props.onChange({ ...props.value, saturation });
  }

  function onReset() {
    if (props.isReadOnly) return;
    const hsl = HexToHSL(props.value.referenceColor);
    if (hsl) {
      props.onChange({ ...props.value, hue: hsl.h, saturation: hsl.s });
    }
  }

  function onUseReferenceAsKeyColorChange(value: boolean) {
    if (props.isReadOnly) return;
    props.onChange({ ...props.value, useReferenceAsKeyColor: value });
  }

  return (
    <Card borderRadius={40} elevation="small">
      <Box padding={40} paddingBottom={24}>
        <Stack space={16}>
          <Title size="large">{props.name}</Title>
          <Palette
            hue={props.value.hue}
            saturation={props.value.saturation}
            lightnessInterpolation={props.value.lightnessInterpolation}
          />
        </Stack>
      </Box>
      {!props.isReadOnly && (
        <Box background="backgroundSecondary" padding={40} paddingTop={24}>
          <Columns space={40} alignY="stretch">
            <Column width="content">
              <Stack space={12}>
                <HexColorField
                  label={t("ColorEditor.referenceColor")}
                  value={props.value.referenceColor}
                  onChange={onReferenceColorChange}
                  isReadOnly={props.isReadOnly}
                />
                <CheckboxField
                  label={t("ColorEditor.useReferenceAsKeyColor")}
                  value={props.value.useReferenceAsKeyColor}
                  onChange={onUseReferenceAsKeyColorChange}
                />
              </Stack>
            </Column>
            <Column width="content">
              <Divider orientation="vertical" />
            </Column>
            <Columns space={40} alignY="bottom">
              <CounterField
                label={t("ColorEditor.hue")}
                minValue={0}
                maxValue={360}
                value={props.value.hue}
                onChange={onHueChange}
              />
              <CounterField
                label={t("ColorEditor.saturation")}
                minValue={0}
                maxValue={100}
                value={props.value.saturation}
                onChange={onSaturationChange}
              />
              <LightnessInterpolationSelector
                value={props.value.lightnessInterpolation}
                onChange={(lightnessInterpolation) => {
                  if (lightnessInterpolation) {
                    props.onChange({ ...props.value, lightnessInterpolation });
                  }
                }}
              />
              <Column width="content">
                <Button
                  kind="solid"
                  hierarchy="secondary"
                  onPress={onReset}
                  label={t("ColorEditor.reset")}
                />
              </Column>
              {props.onDelete && (
                <Inline space={0} align="right">
                  <Button
                    kind="solid"
                    hierarchy="secondary"
                    label={t("ColorEditor.delete")}
                    onPress={props.onDelete}
                  />
                </Inline>
              )}
            </Columns>
          </Columns>
        </Box>
      )}
    </Card>
  );
}

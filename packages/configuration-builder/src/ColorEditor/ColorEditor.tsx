import {
  Box,
  Button,
  Card,
  Column,
  Columns,
  IconButton,
  Inline,
  LocalizedString,
  Stack,
  Title,
} from "@buildo/bento-design-system";
import { HexColorField } from "./HexColorField";
import { Palette } from "./Palette";
import { HSLToHex, HexToHSL, HexColor } from "../utils/colorUtils";
import { useTranslation } from "react-i18next";
import { LightnessInterpolationSelector } from "./LightnessInterpolationSelector";
import { CounterField } from "./CounterField";
import { IconLockSimple } from "../Icons/IconLockSimple";
import { IconLockOpen } from "../Icons/IconLockOpen";

export type LightnessInterpolation = "Linear" | "EaseIn" | "EaseOut" | "EaseInOut";

export type ColorConfig = {
  keyColor: HexColor;
  lightnessInterpolation: LightnessInterpolation;
  hue: number;
  saturation: number;
  keyColorLocked: boolean;
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

  function onKeyColorChange(keyColor: HexColor) {
    if (props.isReadOnly) return;
    const hsl = HexToHSL(keyColor);
    props.onChange({
      ...props.value,
      keyColor,
      hue: hsl.h,
      saturation: hsl.s,
    });
  }

  function onHueChange(hue: number) {
    if (props.isReadOnly) return;
    if (props.value.keyColorLocked) {
      props.onChange({ ...props.value, hue });
    } else {
      const keyColorHsl = HexToHSL(props.value.keyColor);
      const newKeyColor = HSLToHex({ ...keyColorHsl, h: hue });
      props.onChange({ ...props.value, hue, keyColor: newKeyColor });
    }
  }

  function onSaturationChange(saturation: number) {
    if (props.isReadOnly) return;
    if (props.value.keyColorLocked) {
      props.onChange({ ...props.value, saturation });
    } else {
      const keyColorHsl = HexToHSL(props.value.keyColor);
      const newKeyColor = HSLToHex({ ...keyColorHsl, s: saturation });
      props.onChange({ ...props.value, saturation, keyColor: newKeyColor });
    }
  }

  function onReset() {
    if (props.isReadOnly) return;
    if (!props.value.keyColorLocked) return;
    const hsl = HexToHSL(props.value.keyColor);
    if (hsl) {
      props.onChange({ ...props.value, hue: hsl.h, saturation: hsl.s });
    }
  }

  function onToggleKeyColorLocked() {
    if (props.isReadOnly) return;
    props.onChange({ ...props.value, keyColorLocked: !props.value.keyColorLocked });
  }

  return (
    <Card borderRadius={40} padding={40} elevation="small">
      <Stack space={16}>
        <Title size="large">{props.name}</Title>
        <Columns space={40} alignY="stretch">
          <Column width="content">
            <Stack space={16}>
              <Title size="small">{t("ColorEditor.keyColor")}</Title>
              <Box
                width={40}
                height={40}
                borderRadius="circled"
                style={{ backgroundColor: props.value.keyColor }}
              />
              <Inline space={8} alignY="bottom">
                <HexColorField
                  value={props.value.keyColor}
                  onChange={onKeyColorChange}
                  isReadOnly={props.isReadOnly}
                />
                <IconButton
                  label={
                    props.value.keyColorLocked
                      ? t("ColorEditor.unlockKeyColor")
                      : t("ColorEditor.lockKeyColor")
                  }
                  kind="solid"
                  hierarchy="secondary"
                  icon={props.value.keyColorLocked ? IconLockSimple : IconLockOpen}
                  size={16}
                  onPress={onToggleKeyColorLocked}
                  isDisabled={props.isReadOnly}
                />
              </Inline>
            </Stack>
          </Column>
          <Palette
            keyColor={props.value.keyColor}
            keyColorLocked={props.value.keyColorLocked}
            hue={props.value.hue}
            saturation={props.value.saturation}
            lightnessInterpolation={props.value.lightnessInterpolation}
          />
        </Columns>
        {!props.isReadOnly && (
          <Columns space={40} alignY="bottom">
            <Column width="content">
              <LightnessInterpolationSelector
                value={props.value.lightnessInterpolation}
                onChange={(lightnessInterpolation) => {
                  if (lightnessInterpolation) {
                    props.onChange({ ...props.value, lightnessInterpolation });
                  }
                }}
              />
            </Column>
            <Column width="content">
              <CounterField
                label={t("ColorEditor.hue")}
                minValue={0}
                maxValue={360}
                value={props.value.hue}
                onChange={onHueChange}
              />
            </Column>
            <Column width="content">
              <CounterField
                label={t("ColorEditor.saturation")}
                minValue={0}
                maxValue={100}
                value={props.value.saturation}
                onChange={onSaturationChange}
              />
            </Column>
            <Column width="content">
              <Button
                kind="solid"
                hierarchy="secondary"
                onPress={onReset}
                label={t("ColorEditor.reset")}
                isDisabled={!props.value.keyColorLocked}
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
        )}
      </Stack>
    </Card>
  );
}

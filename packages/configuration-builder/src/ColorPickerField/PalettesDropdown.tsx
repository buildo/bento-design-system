import { Box, Card, Divider, Inline, Label, Stack } from "@buildo/bento-design-system";
import { ThemeConfig } from "../ConfiguratorStatusContext";
import { colorBoxRecipe } from "./PalettesDropdown.css";
import { SelectState } from "@react-stately/select";
import { AriaListBoxOptions, useListBox, useOption } from "@react-aria/listbox";
import { Key, useRef } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  colors: ThemeConfig["colors"];
  value: string | null;
  onChange: (value: string) => void;
  state: SelectState<object>;
  menuProps: AriaListBoxOptions<object>;
};

function ColorBox({
  color,
  colorKey,
  state,
}: {
  color: string;
  colorKey: Key;
  state: SelectState<object>;
}) {
  const ref = useRef(null);
  const { optionProps, isSelected } = useOption({ key: colorKey }, state, ref);
  return (
    <Box
      ref={ref}
      role="option"
      {...optionProps}
      className={colorBoxRecipe({ isSelected })}
      style={{ backgroundColor: color }}
    />
  );
}

function Palette(props: {
  name: string;
  onChange: (value: string) => void;
  value: string | null;
  state: SelectState<object>;
}) {
  const colors = [...props.state.collection.getChildren!(props.name)];

  return (
    <Inline space={4} alignY="stretch">
      {colors.map((color) => {
        const colorBox = (
          <ColorBox colorKey={color.key} state={props.state} color={color.textValue} />
        );
        if (color.key.toString().endsWith("reference")) {
          return [<Divider orientation="vertical" />, colorBox];
        }
        return colorBox;
      })}
    </Inline>
  );
}

export function PalettesDropdown(props: Props) {
  const { t } = useTranslation();

  const ref = useRef(null);

  const { listBoxProps } = useListBox(props.menuProps, props.state, ref);

  return (
    <Box {...listBoxProps} ref={ref} overflowY="auto" outline="none">
      <Card padding={24} borderRadius={16}>
        <Stack space={16}>
          <Inline space={4}>
            {[...props.state.collection.getChildren!("General")].map((color) => (
              <ColorBox color={color.key as string} colorKey={color.key} state={props.state} />
            ))}
          </Inline>
          <Stack space={4}>
            <Label size="small">{t("ColorsSection.Step.brand")}</Label>
            <Palette
              name="BrandPrimary"
              onChange={props.onChange}
              value={props.value}
              state={props.state}
            />
          </Stack>
          <Stack space={4}>
            <Label size="small">{t("ColorsSection.Step.interactive")}</Label>
            <Inline space={4}>
              <Palette
                name="Interactive"
                onChange={props.onChange}
                value={props.value}
                state={props.state}
              />
            </Inline>
          </Stack>
          <Stack space={4}>
            <Label size="small">{t("ColorsSection.Step.neutral")}</Label>
            <Palette
              name="Neutral"
              onChange={props.onChange}
              value={props.value}
              state={props.state}
            />
          </Stack>
          <Stack space={4}>
            <Label size="small">{t("ColorsSection.Step.semantic")}</Label>
            {["Informative", "Positive", "Warning", "Negative"].map((semanticColor) => (
              <Palette
                name={semanticColor}
                onChange={props.onChange}
                value={props.value}
                state={props.state}
              />
            ))}
          </Stack>
          <Stack space={4}>
            <Label size="small">{t("ColorsSection.Step.dataVisualization")}</Label>
            {[
              "Grey",
              "Red",
              "Orange",
              "Yellow",
              "Green",
              "Jade",
              "Blue",
              "Indigo",
              "Violet",
              "Pink",
            ].map((dataVizColor) => (
              <Palette
                name={dataVizColor}
                onChange={props.onChange}
                value={props.value}
                state={props.state}
              />
            ))}
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}

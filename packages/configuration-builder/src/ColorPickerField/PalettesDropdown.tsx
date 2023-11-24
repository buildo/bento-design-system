import { Box, Card, Divider, Inline, Label, Stack } from "@buildo/bento-design-system";
import { ThemeConfig, useConfiguratorStatusContext } from "../ConfiguratorStatusContext";
import { colorBoxRecipe } from "./PalettesDropdown.css";
import { SelectState } from "@react-stately/select";
import { AriaListBoxOptions, useListBox, useOption } from "@react-aria/listbox";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Node } from "@react-types/shared";
import { PaletteName, getPalette, getPaletteKeyColor } from "../utils/paletteUtils";

type Props = {
  colors: ThemeConfig["colors"];
  state: SelectState<object>;
  menuProps: AriaListBoxOptions<object>;
};

function ColorBox({
  item,
  state,
  color,
}: {
  item: Node<object>;
  state: SelectState<object>;
  color: string;
}) {
  const ref = useRef(null);
  const { optionProps, isSelected } = useOption({ key: item.key }, state, ref);

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

function Palette(props: { name: PaletteName; state: SelectState<object> }) {
  const colors = useConfiguratorStatusContext().theme.colors;
  const colorItems = [...props.state.collection.getChildren!(props.name)];
  const keyColor = getPaletteKeyColor(props.name, colors);
  if (keyColor) {
    const palette = getPalette(keyColor);

    return (
      <Inline space={4} alignY="stretch">
        {colorItems.map((colorItem, index) => {
          if (colorItem.key.toString().endsWith("ref")) {
            return [
              <Divider orientation="vertical" />,
              <ColorBox item={colorItem} state={props.state} color={keyColor.referenceColor} />,
            ];
          }
          return <ColorBox item={colorItem} state={props.state} color={palette[index].value} />;
        })}
      </Inline>
    );
  }
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
              <ColorBox item={color} color={color.textValue} state={props.state} />
            ))}
          </Inline>
          <Stack space={4}>
            <Label size="small">{t("ColorsSection.Step.brand")}</Label>
            {(["BrandPrimary", "BrandSecondary", "BrandTertiary"] as PaletteName[]).map(
              (brandColor) => (
                <Palette name={brandColor} state={props.state} />
              )
            )}
          </Stack>
          <Stack space={4}>
            <Label size="small">{t("ColorsSection.Step.interactive")}</Label>
            <Inline space={4}>
              <Palette name="Interactive" state={props.state} />
            </Inline>
          </Stack>
          <Stack space={4}>
            <Label size="small">{t("ColorsSection.Step.neutral")}</Label>
            <Palette name="Neutral" state={props.state} />
          </Stack>
          <Stack space={4}>
            <Label size="small">{t("ColorsSection.Step.semantic")}</Label>
            {(["Informative", "Positive", "Warning", "Negative"] as PaletteName[]).map(
              (semanticColor) => (
                <Palette name={semanticColor} state={props.state} />
              )
            )}
          </Stack>
          <Stack space={4}>
            <Label size="small">{t("ColorsSection.Step.dataVisualization")}</Label>
            {(
              [
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
              ] as PaletteName[]
            ).map((dataVizColor) => (
              <Palette name={dataVizColor} state={props.state} />
            ))}
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}

import { Body, Box, Card, Children, Inline, Stack, Title } from "@buildo/bento-design-system";
import { match } from "ts-pattern";
import { HexColor, HexToHSL } from "../utils/colorUtils";
import { useTranslation } from "react-i18next";

function ColorBox(props: { color: string }) {
  return <Box flex={1} style={{ backgroundColor: props.color }} />;
}

function Palette(props: { children: Children; onSelect: () => void }) {
  return (
    <Box
      style={{ width: 290 }}
      height={40}
      borderRadius={12}
      overflow="hidden"
      display="flex"
      cursor="pointer"
      onClick={props.onSelect}
    >
      {props.children}
    </Box>
  );
}

function SingleColorPalette(props: { keyColor: HexColor; onSelect: () => void }) {
  const hslColor = HexToHSL(props.keyColor);
  const colors = [10, 30, 50, 70, 90].map(
    (lightness) => `hsl(${hslColor.h}, ${hslColor.s}%, ${lightness}%)`
  );
  return (
    <Palette onSelect={props.onSelect}>
      {colors.map((color, i) => (
        <ColorBox key={i} color={color} />
      ))}
    </Palette>
  );
}

function MultipleColorPalette<T extends string>(props: {
  keyColors: Record<T, HexColor>;
  onSelect: () => void;
}) {
  return (
    <Palette onSelect={props.onSelect}>
      {Object.values<HexColor>(props.keyColors).map((keyColor) => (
        <ColorBox key={keyColor} color={keyColor} />
      ))}
    </Palette>
  );
}

type Props<T extends string> =
  | {
      kind: "single";
      presets: HexColor[];
      onSelect: (preset: HexColor) => void;
    }
  | {
      kind: "multiple";
      presets: Record<T, HexColor>[];
      onSelect: (preset: Record<T, HexColor>) => void;
    };

export function ColorPresets<T extends string>(props: Props<T>) {
  const { t } = useTranslation();

  return (
    <Card padding={40} borderRadius={40}>
      <Stack space={24}>
        <Stack space={8}>
          <Title size="large">{t("ColorPresets.presets")}</Title>
          <Body size="medium">{t("ColorPresets.description")}</Body>
        </Stack>
        <Inline space={40}>
          {match(props)
            .with({ kind: "single" }, (props) =>
              props.presets.map((preset, i) => (
                <SingleColorPalette
                  key={i}
                  keyColor={preset}
                  onSelect={() => props.onSelect(preset)}
                />
              ))
            )
            .with({ kind: "multiple" }, (props) =>
              props.presets.map((preset, i) => (
                <MultipleColorPalette
                  key={i}
                  keyColors={preset}
                  onSelect={() => props.onSelect(preset)}
                />
              ))
            )
            .exhaustive()}
        </Inline>
      </Stack>
    </Card>
  );
}

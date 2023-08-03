import { Box, Title } from "@buildo/bento-design-system";
import { LightnessInterpolation } from "./ColorEditor";
import { useTranslation } from "react-i18next";
import { HexColor, HexToHSL } from "../utils/colorUtils";
import { IconLockSimple } from "../Icons/IconLockSimple";

type Props = {
  keyColor: HexColor;
  keyColorLocked: boolean;
  hue: number;
  saturation: number;
  lightnessInterpolation: LightnessInterpolation;
};

const interpolations: Record<LightnessInterpolation, number[]> = {
  Linear: [10, 19, 28, 37, 46, 55, 64, 73, 82, 91, 97],
  EaseIn: [10, 21, 32, 43, 54, 65, 75, 82, 88, 93, 97],
  EaseOut: [10, 14, 19, 25, 32, 42, 53, 64, 75, 86, 97],
  EaseInOut: [10, 14, 20, 28, 41, 54, 67, 79, 87, 93, 97],
};

function findLightnessCloserToKeyColor(keyColorLightness: number, lightnesses: number[]) {
  for (let i = 0; i < lightnesses.length; i++) {
    if (lightnesses[i] > keyColorLightness) {
      if (i === 0) return lightnesses[i];
      const previousLightness = lightnesses[i - 1];
      if (keyColorLightness - previousLightness < lightnesses[i] - keyColorLightness) {
        return previousLightness;
      } else {
        return lightnesses[i];
      }
    }
  }
}

export function Palette(props: Props) {
  const { hue, saturation, lightnessInterpolation } = props;

  const keyColorHSL = HexToHSL(props.keyColor);
  const keyColorLightness = keyColorHSL.l;

  const lightnesses = interpolations[lightnessInterpolation];
  const closestLightness = findLightnessCloserToKeyColor(keyColorLightness, lightnesses);

  const { t } = useTranslation();

  return (
    <Box display="flex" gap={16} flexDirection="column" flexGrow={1} height="full" width="full">
      <Title size="small">{t("ColorEditor.palette")}</Title>
      <Box display="flex" gap={4} flexGrow={1}>
        {lightnesses.map((lightness) => {
          const isKeyColorLightness = lightness === closestLightness;

          const backgroundColor =
            isKeyColorLightness && props.keyColorLocked
              ? `hsl(${keyColorHSL.h}, ${keyColorHSL.s}%, ${keyColorHSL.l}%)`
              : `hsl(${hue}, ${saturation}%, ${lightness}%)`;

          return (
            <Box
              flexGrow={1}
              key={lightness}
              padding={16}
              borderRadius={16}
              style={{
                flexBasis: "100%",
                backgroundColor,
              }}
            >
              {isKeyColorLightness && <IconLockSimple size={16} color="primaryInverse" />}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

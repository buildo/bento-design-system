import { Box } from "@buildo/bento-design-system";
import { LightnessInterpolation } from "./ColorEditor";
import { useState } from "react";
import { IconEyedropper } from "../Icons/IconEyedropper";
import { HSLToHex, HexColor } from "../utils/colorUtils";

type Props = {
  hue: number;
  saturation: number;
  lightnessInterpolation: LightnessInterpolation;
};

const interpolations: Record<LightnessInterpolation, number[]> = {
  Linear: [97, 91, 82, 73, 64, 55, 46, 37, 28, 19, 10],
  EaseIn: [97, 93, 88, 82, 75, 65, 54, 43, 32, 21, 10],
  EaseOut: [97, 86, 75, 64, 53, 42, 32, 25, 19, 14, 10],
  EaseInOut: [97, 93, 87, 79, 67, 54, 41, 28, 20, 14, 10],
};

export function PaletteColorBox(props: { color: HexColor }) {
  const [isHovered, setIsHovered] = useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(props.color);
  }

  return (
    <Box
      flexGrow={1}
      padding={16}
      borderRadius={16}
      style={{
        flexBasis: "100%",
        backgroundColor: props.color,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={copyToClipboard}
      cursor="pointer"
    >
      {isHovered && (
        <Box borderRadius={8} padding={8} background="backgroundDarkScrim">
          <IconEyedropper size={24} color="primaryInverse" />
        </Box>
      )}
    </Box>
  );
}

export function Palette(props: Props) {
  const { hue, saturation, lightnessInterpolation } = props;

  const lightnesses = interpolations[lightnessInterpolation];

  return (
    <Box
      display="flex"
      gap={16}
      flexDirection="column"
      flexGrow={1}
      width="full"
      style={{ height: 160 }}
    >
      <Box display="flex" gap={4} flexGrow={1}>
        {lightnesses.map((lightness) => {
          const color = HSLToHex({ h: hue, s: saturation, l: lightness });
          return <PaletteColorBox color={color} key={lightness} />;
        })}
      </Box>
    </Box>
  );
}

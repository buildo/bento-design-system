import { Box } from "@buildo/bento-design-system";
import { LightnessInterpolation } from "./ColorEditor";
import { useState } from "react";
import { IconEyedropper } from "../PhosphorIcons";
import { HexColor } from "../utils/colorUtils";
import { getPalette } from "../utils/paletteUtils";

type Props = {
  hue: number;
  saturation: number;
  lightnessInterpolation: LightnessInterpolation;
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
  const colors = getPalette(props);

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
        {colors.map((color) => {
          return <PaletteColorBox color={color.value} key={color.value} />;
        })}
      </Box>
    </Box>
  );
}

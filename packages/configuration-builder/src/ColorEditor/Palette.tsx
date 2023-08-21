import { Box } from "@buildo/bento-design-system";
import { LightnessInterpolation } from "./ColorEditor";

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
          const backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

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
            />
          );
        })}
      </Box>
    </Box>
  );
}

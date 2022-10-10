import clsx from "clsx";
import { Box, Inline, Stack, Body, LocalizedString } from "..";
import { container, dot, text } from "./AreaLoader.css";
import { BentoSprinkles } from "../internal";
import { AreaLoaderConfig } from "./Config";
import { BodyProps } from "../Typography/Body/Body";
import { useBentoConfig } from "../BentoConfigContext";
import { useSprinkles } from "../SprinklesContext";

function readabilityAreaColorToBackground(
  color: AreaLoaderConfig["readabilityAreaColor"]
): BentoSprinkles["background"] {
  switch (color) {
    case "primary":
      return "backgroundPrimary";
    case "secondary":
      return "backgroundSecondary";
    case "primary-inverse":
      return "backgroundPrimaryInverse";
    case "secondary-inverse":
      return "backgroundSecondaryInverse";
  }
}

function messageColorToBodyColor(color: AreaLoaderConfig["messageColor"]): BodyProps["color"] {
  switch (color) {
    case "primary":
      return "default";
    case "primary-inverse":
      return "primaryInverse";
  }
}

type Props = {
  message?: LocalizedString;
};

export type { Props as AreaLoaderProps };

/**
 *  `Loader` fills the parent container with an overlay and renders an animated indefinite loader
 *  centered in it.
 *
 *  It is absolutely positioned so that it covers the closest relative container.
 *  Example usage:
 *
 *  ```tsx
 *  <Card padding="24">
 *    <Box position="relative">
 *      {cardContent}
 *      {isLoading && <AreaLoader />}
 *    </Box>
 *  </Card>
 *  ```
 */
export function AreaLoader({ message }: Props) {
  const config = useBentoConfig().areaLoader;
  const sprinkles = useSprinkles();

  return (
    <Box
      className={clsx(
        container,
        sprinkles({
          background: config.scrimColor === "dark" ? "backgroundDarkScrim" : "backgroundLightScrim",
        })
      )}
    >
      <Box
        padding={80}
        className={sprinkles({
          background: readabilityAreaColorToBackground(config.readabilityAreaColor),
          borderRadius: config.readabilityAreaBorderRadius,
        })}
      >
        <Stack space={32}>
          <Inline space={8} align="center">
            {config.dots.map((dotConfig, index) => (
              <Box
                key={`dot-${index}`}
                className={clsx(dot, sprinkles({ background: dotConfig.color }))}
                style={{
                  animationDelay: `${0.2 * index}s`,
                }}
              />
            ))}
          </Inline>
          {message && (
            <Box className={text}>
              <Body size={config.messageSize} color={messageColorToBodyColor(config.messageColor)}>
                {message}
              </Body>
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

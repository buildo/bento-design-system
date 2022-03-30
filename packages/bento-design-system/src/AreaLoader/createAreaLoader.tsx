import clsx from "clsx";
import { BentoSprinkles, bentoSprinkles, Box, Inline, Stack } from "../internal";
import { container, dot, text } from "./AreaLoader.css";
import { Body, LocalizedString } from "..";
import { AreaLoaderConfig } from "./Config";

function visibilityAreaColorToBackground(
  color: AreaLoaderConfig["visibilityAreaColor"]
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

type Props = {
  message?: LocalizedString;
};

export function createAreaLoader(config: AreaLoaderConfig) {
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
  return function AreaLoader({ message }: Props) {
    return (
      <Box
        className={clsx(
          container,
          bentoSprinkles({
            background: config.overlay === "dark" ? "backgroundDarkScrim" : "backgroundLightScrim",
          })
        )}
      >
        <Box
          padding={80}
          className={bentoSprinkles({
            background: visibilityAreaColorToBackground(config.visibilityAreaColor),
          })}
        >
          <Stack space={32}>
            <Inline space={8} align="center">
              {config.dots.map((dotConfig, index) => (
                <Box
                  key={`dot-${index}`}
                  className={clsx(dot, bentoSprinkles({ background: dotConfig.color }))}
                  style={{
                    animationDelay: `${0.2 * index}s`,
                  }}
                />
              ))}
            </Inline>
            {message && (
              <Box className={text}>
                <Body size="medium">{message}</Body>
              </Box>
            )}
          </Stack>
        </Box>
      </Box>
    );
  };
}

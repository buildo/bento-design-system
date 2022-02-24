import { StyleRule, styleVariants } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal/sprinkles.css";
import { Breakpoint, breakpoints } from "../util/breakpoints";

const styleForScale = (scale: number): StyleRule => ({
  flex: `0 0 ${scale * 100}%`,
  width: "100%",
});

export const fullWidth = bentoSprinkles({
  width: "full",
});

const widths = {
  content: {},
  full: styleForScale(1),
  "1/2": styleForScale(1 / 2),
  "1/3": styleForScale(1 / 3),
  "2/3": styleForScale(2 / 3),
  "1/4": styleForScale(1 / 4),
  "3/4": styleForScale(3 / 4),
  "1/5": styleForScale(1 / 5),
  "2/5": styleForScale(2 / 5),
  "3/5": styleForScale(3 / 5),
  "4/5": styleForScale(4 / 5),
};

const makeWidthVariants = (breakpoint: Breakpoint) =>
  styleVariants(widths, (widthStyle) => {
    switch (breakpoint) {
      case "desktop":
        return widthStyle;
      case "tablet":
      case "mobile":
        return {
          "@media": {
            [breakpoints[breakpoint]["@media"]]: widthStyle,
          },
        };
    }
  });

export const desktopWidths = makeWidthVariants("desktop");
export const tabletWidths = makeWidthVariants("tablet");
export const mobileWidths = makeWidthVariants("mobile");

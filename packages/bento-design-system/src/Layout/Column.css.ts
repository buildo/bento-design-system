import { StyleRule, createVar, style, styleVariants } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal/sprinkles.css";
import { Breakpoint, breakpoints } from "../util/breakpoints";

export const columnsSpace = createVar("columns-space");

export const columns = style({
  marginLeft: `calc(${columnsSpace} * -1)`,
});

export const columnContent = style({
  marginLeft: columnsSpace,
  height: "100%",
});

const styleForScale = (scale: number): StyleRule => ({
  flex: `0 0 ${scale * 100}%`,
  width: "100%",
});

export const fullWidth = bentoSprinkles({
  width: "full",
});

const widths = {
  content: { flexShrink: 0 },
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
      case "wide":
        return widthStyle;
      case "desktop":
      case "tablet":
      case "mobile":
        return {
          "@media": {
            [breakpoints[breakpoint]["@media"]]: widthStyle,
          },
        };
    }
  });

export const wideWidths = makeWidthVariants("wide");
export const desktopWidths = makeWidthVariants("desktop");
export const tabletWidths = makeWidthVariants("tablet");
export const mobileWidths = makeWidthVariants("mobile");

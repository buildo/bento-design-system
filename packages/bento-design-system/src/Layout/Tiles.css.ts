import { StyleRule, styleVariants } from "@vanilla-extract/css";
import { Breakpoint, breakpoints } from "../util/breakpoints";

const columnsTemplates = {
  1: "1fr",
  2: "repeat(2, 1fr)",
  3: "repeat(3, 1fr)",
  4: "repeat(4, 1fr)",
  5: "repeat(5, 1fr)",
  6: "repeat(6, 1fr)",
} as const;

const makeColumnVariants = (breakpoint: Breakpoint) =>
  styleVariants(columnsTemplates, (columnTemplate) => {
    const styleRule: StyleRule = { gridTemplateColumns: columnTemplate };

    switch (breakpoint) {
      case "desktop":
        return styleRule;
      case "tablet":
      case "mobile":
        return {
          "@media": {
            [breakpoints[breakpoint]["@media"]]: styleRule,
          },
        };
    }
  });

export const desktopColumns = makeColumnVariants("desktop");
export const tabletColumns = makeColumnVariants("tablet");
export const mobileColumns = makeColumnVariants("mobile");

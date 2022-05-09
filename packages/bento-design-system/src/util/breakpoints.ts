export const breakpoints = {
  wide: {},
  desktop: { "@media": "screen and (max-width: 1750px)" },
  tablet: { "@media": "screen and (max-width: 1000px)" },
  mobile: { "@media": "screen and (max-width: 600px)" },
};

export type Breakpoint = keyof typeof breakpoints;

export const breakpoints = {
  desktop: {},
  tablet: { "@media": "screen and (max-width: 1023px)" },
  mobile: { "@media": "screen and (max-width: 767px)" },
};

export type Breakpoint = keyof typeof breakpoints;

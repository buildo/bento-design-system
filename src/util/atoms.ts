import { vars } from "../vars.css";
import { breakpoints } from "./breakpoints";
import { statusConditions } from "./conditions";

export const unconditionalProperties = {
  fontFamily: vars.fontFamily,
} as const;

export const responsiveProperties = {
  display: ["flex", "none", "block"],
  flexDirection: ["row", "column"],
  alignItems: {
    flexStart: "flex-start",
    center: "center",
    flexEnd: "flex-end",
    stretch: "stretch",
  },
  justifyContent: {
    flexStart: "flex-start",
    center: "center",
    flexEnd: "flex-end",
  },
  flexWrap: {
    nowrap: "nowrap",
    wrap: "wrap",
    wrapReverse: "wrap-reverse",
  },
  flexShrink: [0],
  paddingTop: vars.space,
  paddingBottom: vars.space,
  paddingLeft: vars.space,
  paddingRight: vars.space,
  gap: vars.space,
} as const;

export const statusProperties = {
  color: vars.color,
  background: vars.color,
} as const;

export function buildUnconditionalPropertyOptions<T extends Record<string, string>>(
  customFontFamilies: T
) {
  return {
    properties: {
      ...unconditionalProperties,
      fontFamily: {
        ...unconditionalProperties.fontFamily,
        ...customFontFamilies,
      },
    },
  };
}

export function buildStatusPropertyOptions<T extends Record<string, string>>(customColors: T) {
  return {
    properties: {
      ...statusProperties,
      color: {
        ...statusProperties.color,
        ...customColors,
      },
      background: {
        ...statusProperties.background,
        ...customColors,
      },
    },
    conditions: statusConditions,
    defaultCondition: "default",
  };
}

export function buildResponsivePropertyOptions<T extends Record<string, string>>(customSpaces: T) {
  const spaces = {
    ...responsiveProperties.gap,
    ...customSpaces,
  };

  return {
    conditions: breakpoints,
    defaultCondition: "desktop",
    properties: {
      ...responsiveProperties,
      paddingTop: spaces,
      paddingBottom: spaces,
      paddingLeft: spaces,
      paddingRight: spaces,
      gap: spaces,
    },
  };
}

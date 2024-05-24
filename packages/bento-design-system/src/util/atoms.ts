import { CSSVarFunction } from "@vanilla-extract/private";
import { vars } from "../vars.css";

const spacing = {
  0: 0,
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
  32: 32,
  40: 40,
  80: 80,
  120: 120,
  160: 160,
} as const;
const negativeSpacing: Record<`negative${keyof typeof spacing}`, number> = Object.entries(
  spacing
).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [`negative${key}`]: value,
  }),
  {} as Record<`negative${keyof typeof spacing}`, number>
);

const radius = {
  ...spacing,
  circled: "50%",
  // dirty trick to make the border-radius look good regardless of the width of the container
  circledX: "100vh",
} as const;

export * from "./conditions";

export * from "./shorthands";

type BoxShadowConfig = "" | "Bottom" | "Strong";
type BoxShadowVars = Record<`${keyof typeof vars.outlineColor}${BoxShadowConfig}`, CSSVarFunction>;
const boxShadowsFromOutlines: BoxShadowVars = Object.entries(vars.outlineColor).reduce(
  (acc, [key, value]) => {
    return {
      ...acc,
      [key]: `inset 0px 0px 0px 1px ${value}`,
      [`${key}Bottom`]: `inset 0px -1px 0px ${value}`,
      [`${key}Strong`]: `inset 0px 0px 0px 2px ${value}`,
    };
  },
  {} as BoxShadowVars
);

export const unconditionalProperties = {
  borderRadius: radius,
  borderTopLeftRadius: radius,
  borderTopRightRadius: radius,
  borderBottomLeftRadius: radius,
  borderBottomRightRadius: radius,
  textTransform: ["none", "uppercase", "lowercase", "capitalize"],
  fontFamily: vars.fontFamily,
  fontWeight: vars.fontWeight,
  fontSize: vars.fontSize,
  lineHeight: vars.lineHeight,
  letterSpacing: vars.letterSpacing,
  height: {
    ...spacing,
    full: "100%",
  },
  position: ["relative", "absolute", "fixed", "sticky"],
  overflow: ["hidden", "visible", "auto"],
  overflowX: ["hidden", "visible", "auto"],
  overflowY: ["hidden", "visible", "auto"],
  isolation: ["auto", "isolate"],
  textOverflow: ["ellipsis"],
  whiteSpace: ["nowrap"],
} as const;

export const responsiveProperties = {
  display: ["flex", "none", "block", "grid", "inline-block"],
  flexDirection: {
    row: "row",
    column: "column",
    rowReverse: "row-reverse",
    columnReverse: "column-reverse",
  },
  alignItems: {
    flexStart: "flex-start",
    center: "center",
    flexEnd: "flex-end",
    stretch: "stretch",
    baseline: "baseline",
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
  flexGrow: [0, 1, 2],
  flex: [0, 1, 2],
  width: {
    ...spacing,
    full: "100%",
  },
  paddingTop: spacing,
  paddingBottom: spacing,
  paddingLeft: spacing,
  paddingRight: spacing,
  gap: spacing,
  textAlign: ["left", "center", "right", "justify"],
  maxWidth: {
    700: "700px",
    1440: "1440px",
  },
  top: spacing,
  bottom: spacing,
  left: spacing,
  right: spacing,
  marginTop: { ...spacing, ...negativeSpacing },
  marginBottom: { ...spacing, ...negativeSpacing },
  marginLeft: { ...spacing, ...negativeSpacing },
  marginRight: { ...spacing, ...negativeSpacing },
} as const;

const color = {
  ...vars.brandColor,
  ...vars.foregroundColor,
  ...vars.textColor,
  ...vars.interactiveForegroundColor,
  ...vars.outlineColor,
  ...vars.dataVisualizationColor,
  transparent: "transparent",
};

const background = {
  ...vars.brandColor,
  ...vars.backgroundColor,
  ...vars.interactiveBackgroundColor,
  ...vars.outlineColor,
  ...vars.dataVisualizationColor,
};

const decoration = {
  ...vars.brandColor,
  ...vars.foregroundColor,
  transparent: "transparent",
};

export const allColors = {
  ...vars.brandColor,
  ...vars.textColor,
  ...vars.foregroundColor,
  ...vars.backgroundColor,
  ...vars.interactiveForegroundColor,
  ...vars.interactiveBackgroundColor,
  ...vars.outlineColor,
  ...vars.dataVisualizationColor,
};

export const statusProperties = {
  color,
  decoration,
  background: { ...background, currentColor: "currentColor" },
  cursor: {
    pointer: "pointer",
    default: "default",
    notAllowed: "not-allowed",
  },
  boxShadow: {
    ...boxShadowsFromOutlines,
    ...vars.elevations,
    none: "none",
    inherit: "inset 0px 0px 0px 1px",
  },
  outline: {
    none: "none",
  },
  outlineStyle: {
    solid: "solid",
    dashed: "dashed",
  },
  outlineWidth: { 1: "1px", 2: "2px" },
  outlineColor: vars.outlineColor,
  stroke: color,
  textDecoration: ["none", "underline"],
  fill: { ...color, ...background, inherit: "inherit", currentColor: "currentColor" },
  borderColor: color,
  borderStyle: {
    solid: "solid",
    dashed: "dashed",
  },
  borderWidth: {
    1: "1px",
    2: "2px",
  },
  borderBottomWidth: {
    1: "1px",
    2: "2px",
  },
} as const;

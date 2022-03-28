import { vars } from "../vars.css";

const radius = {
  ...vars.radius,
  circled: "50%",
  // dirty trick to make the border-radius look good regardless of the width of the container
  circledX: "100vh",
};

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
    ...vars.space,
    full: "100%",
  },
  position: ["relative", "absolute", "fixed", "sticky"],
  overflow: ["hidden", "visible", "auto"],
  overflowX: ["hidden", "visible", "auto"],
  overflowY: ["hidden", "visible", "auto"],
  isolation: ["auto", "isolate"],
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
  width: {
    ...vars.space,
    full: "100%",
  },
  paddingTop: vars.space,
  paddingBottom: vars.space,
  paddingLeft: vars.space,
  paddingRight: vars.space,
  gap: vars.space,
  textAlign: ["left", "center", "right", "justify"],
  maxWidth: {
    700: "700px",
    1440: "1440px",
  },
  top: vars.space,
  bottom: vars.space,
  left: vars.space,
  right: vars.space,
  marginTop: vars.negativeSpace,
  marginBottom: vars.negativeSpace,
  marginLeft: vars.negativeSpace,
  marginRight: vars.negativeSpace,
} as const;

const color = {
  ...vars.brandColor,
  ...vars.foregroundColor,
  ...vars.textColor,
  ...vars.interactiveForegroundColor,
  ...vars.outlineColor,
};

const background = {
  ...vars.brandColor,
  ...vars.backgroundColor,
  ...vars.interactiveBackgroundColor,
  ...vars.outlineColor,
  ...vars.dataVisualizationColor,
};

export const statusProperties = {
  color,
  background,
  cursor: {
    pointer: "pointer",
    default: "default",
    notAllowed: "not-allowed",
  },
  boxShadow: { ...vars.boxShadow, none: "none", inherit: "inset 0px 0px 0px 1px" },
  outline: ["none"],
  outlineStyle: ["solid"],
  outlineWidth: { 1: "1px" },
  outlineColor: vars.outlineColor,
  stroke: color,
  textDecoration: ["none", "underline"],
  fill: { ...color, ...background, inherit: "inherit" },
} as const;

import { vars } from "../vars.css";

export const unconditionalProperties = {
  borderRadius: {
    ...vars.radius,
    circled: "50%",
    // dirty trick to make the border-radius look good regardless of the width of the container
    circledX: "100vh",
  },
  textTransform: ["none", "uppercase", "lowercase", "capitalize"],
  fontFamily: vars.fontFamily,
  fontWeight: vars.fontWeight,
  fontSize: vars.fontSize,
  lineHeight: vars.lineHeight,
  letterSpacing: vars.letterSpacing,
  width: {
    ...vars.space,
    full: "100%",
  },
  height: {
    ...vars.space,
    full: "100%",
  },
  top: vars.space,
  bottom: vars.space,
  left: vars.space,
  right: vars.space,
  position: ["relative", "absolute", "fixed"],
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
  textAlign: ["left", "center", "right", "justify"],
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
};

export const statusProperties = {
  color,
  background,
  cursor: {
    pointer: "pointer",
    default: "default",
    notAllowed: "not-allowed",
  },
  boxShadow: vars.boxShadow,
  outline: { ...vars.outlineColor, none: "none" },
  stroke: color,
  fill: color,
} as const;

import { vars } from "../vars.css";

export const unconditionalProperties = {
  fontFamily: vars.fontFamily,
  width: {
    full: "100%",
  },
  height: {
    full: "100%",
  },
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
} as const;

export const statusProperties = {
  color: vars.color,
  background: vars.color,
} as const;

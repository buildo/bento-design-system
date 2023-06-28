// NOTE(gabro): the weird redundant casts are necessary because `as const` would insert readonly which defineProperties really doesn't like

export const unconditionalPropertiesShorthands = {
  borderTopRadius: ["borderTopLeftRadius", "borderTopRightRadius"] as [
    "borderTopLeftRadius",
    "borderTopRightRadius"
  ],
  borderBottomRadius: ["borderBottomLeftRadius", "borderBottomRightRadius"] as [
    "borderBottomLeftRadius",
    "borderBottomRightRadius"
  ],
};

export const responsivePropertiesShorthands = {
  inset: ["top", "right", "bottom", "left"] as ["top", "right", "bottom", "left"],
  padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"] as [
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight"
  ],
  paddingX: ["paddingLeft", "paddingRight"] as ["paddingLeft", "paddingRight"],
  paddingY: ["paddingTop", "paddingBottom"] as ["paddingTop", "paddingBottom"],
  margin: ["marginTop", "marginBottom", "marginLeft", "marginRight"] as [
    "marginTop",
    "marginBottom",
    "marginLeft",
    "marginRight"
  ],
  marginX: ["marginLeft", "marginRight"] as ["marginLeft", "marginRight"],
  marginY: ["marginTop", "marginBottom"] as ["marginTop", "marginBottom"],
};

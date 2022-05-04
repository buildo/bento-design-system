import { createVar, style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";

export const chip = bentoSprinkles({
  color: "textPrimary",
  textTransform: "uppercase",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const maxWidth = createVar();

export const ellipsedLabel = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: maxWidth,
});

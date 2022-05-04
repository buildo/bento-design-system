import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";

export const chip = bentoSprinkles({
  color: "textPrimary",
  textTransform: "uppercase",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ellipsedLabel = style({
  display: "-webkit-box",
  overflowY: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
});

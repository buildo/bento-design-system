import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";

export const tooltip = style([
  bentoSprinkles({
    background: "backgroundPrimaryInverse",
  }),
  style({
    width: "max-content",
    maxWidth: 240,
  }),
]);

export const arrow = style([
  bentoSprinkles({
    position: "absolute",
    background: "backgroundPrimaryInverse",
    width: 8,
    height: 8,
  }),
  {
    transform: "rotate(45deg)",
  },
]);

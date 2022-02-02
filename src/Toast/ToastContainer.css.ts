import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";

export const container = style([
  bentoSprinkles({
    position: "fixed",
    bottom: 16,
    right: 16,
  }),
]);

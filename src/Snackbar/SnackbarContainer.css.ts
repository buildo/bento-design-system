import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { vars } from "../vars.css";

export const container = style([
  bentoSprinkles({
    position: "fixed",
  }),
  {
    bottom: vars.space["16"],
    right: vars.space["16"],
  },
]);

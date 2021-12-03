import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { vars } from "./vars.css";

const unconditionalProperties = defineProperties({
  properties: {
    fontFamily: vars.fontFamily,
  },
});

export const sprinkles = createSprinkles(unconditionalProperties);

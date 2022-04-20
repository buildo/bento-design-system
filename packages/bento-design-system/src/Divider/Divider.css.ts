import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal/sprinkles.css";

export const verticalDivider = style([
  {
    width: "1px",
  },
  bentoSprinkles({
    height: "full",
  }),
]);

export const horizontalDivider = style([
  {
    height: 1,
  },
  bentoSprinkles({
    width: "full",
  }),
]);

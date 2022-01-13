import { style } from "@vanilla-extract/css";
import { baseSprinkles } from "../sprinkles.css";

export const divider = style([
  {
    height: 1,
  },
  baseSprinkles({
    background: "neutral20",
    width: "full",
  }),
]);

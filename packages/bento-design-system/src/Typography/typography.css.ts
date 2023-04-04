import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";

export const ellipsis = style([
  {
    width: "inherit",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  bentoSprinkles({
    display: "inline-block",
    overflow: "hidden",
  }),
]);

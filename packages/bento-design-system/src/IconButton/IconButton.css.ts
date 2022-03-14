import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { extendedHitAreaRecipe } from "../util/extendedHitArea.css";

export const iconButton = style([
  bentoSprinkles({
    display: "flex",
    cursor: { default: "pointer", disabled: "notAllowed" },
    position: "relative",
  }),
  extendedHitAreaRecipe({ axis: "both" }),
]);

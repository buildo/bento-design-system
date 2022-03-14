import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { extendedHitAreaRecipe } from "../util/extendedHitArea.css";

export const radioOption = style([
  bentoSprinkles({
    cursor: { disabled: "notAllowed", default: "pointer" },
  }),
  extendedHitAreaRecipe({ axis: "y" }),
]);

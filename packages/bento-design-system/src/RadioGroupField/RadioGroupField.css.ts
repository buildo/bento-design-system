import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { extendedHitAreaRecipe } from "../util/extendedHitArea.css";

export const radioOption = style([
  // NOTE(gabro): this is to force the generation of a unique class name so that
  // we can reference this style in custom selectors(e.g.in Radio.css.ts)
  {},
  bentoSprinkles({
    cursor: { disabled: "notAllowed", default: "pointer" },
  }),
  extendedHitAreaRecipe({ axis: "y" }),
]);

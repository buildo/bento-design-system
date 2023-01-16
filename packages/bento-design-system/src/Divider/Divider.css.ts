import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal/sprinkles.css";
import { strictRecipe } from "../util/strictRecipe";

export const divider = strictRecipe({
  base: bentoSprinkles({
    background: "outlineDecorative",
  }),
  variants: {
    orientation: {
      horizontal: style([
        {
          height: 1,
        },
        bentoSprinkles({ width: "full" }),
      ]),
      vertical: style([
        {
          width: 1,
        },
        bentoSprinkles({ height: "full" }),
      ]),
    },
  },
});

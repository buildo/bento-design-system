import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";

export const barRecipe = strictRecipe({
  variants: {
    active: {
      false: bentoSprinkles({
        background: "backgroundOverlay",
      }),
      true: [bentoSprinkles({ color: "foregroundInteractive", background: "currentColor" })],
    },
  },
});

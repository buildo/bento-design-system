import { strictRecipe } from "../../util/strictRecipe";
import { bentoSprinkles } from "../../internal/sprinkles.css";

export const bodyRecipe = strictRecipe({
  variants: {
    weight: {
      regular: bentoSprinkles({ fontWeight: "regular" }),
      semibold: bentoSprinkles({ fontWeight: "semibold" }),
    },
  },
});

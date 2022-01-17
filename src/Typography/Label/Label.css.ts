import { strictRecipe } from "../../util/strictRecipe";
import { bentoSprinkles } from "../../internal/sprinkles.css";

export const labelRecipe = strictRecipe({
  base: bentoSprinkles({ fontFamily: "default", fontWeight: "semibold" }),
  variants: {
    size: {
      small: bentoSprinkles({ letterSpacing: "1" }),
      medium: bentoSprinkles({ letterSpacing: "1" }),
      large: bentoSprinkles({ letterSpacing: "2" }),
    },
    uppercase: {
      false: {},
      true: bentoSprinkles({ textTransform: "uppercase" }),
    },
  },
});

import { strictRecipe } from "../../util/strictRecipe";
import { bentoSprinkles } from "../../internal";

export const headlineRecipe = strictRecipe({
  base: bentoSprinkles({ fontFamily: "default", fontWeight: "regular", color: "textPrimary" }),
  variants: {
    size: {
      small: bentoSprinkles({ fontSize: "headlineSmall", lineHeight: "headlineSmall" }),
      medium: bentoSprinkles({ fontSize: "headlineMedium", lineHeight: "headlineMedium" }),
      large: bentoSprinkles({ fontSize: "headlineLarge", lineHeight: "headlineLarge" }),
    },
  },
});

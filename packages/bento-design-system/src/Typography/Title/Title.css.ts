import { strictRecipe } from "../../util/strictRecipe";
import { bentoSprinkles } from "../../internal/sprinkles.css";

export const titleRecipe = strictRecipe({
  base: bentoSprinkles({ fontFamily: "default", fontWeight: "title" }),
  variants: {
    size: {
      small: bentoSprinkles({
        fontSize: "titleSmall",
        lineHeight: "titleSmall",
        letterSpacing: 1,
      }),
      medium: bentoSprinkles({ fontSize: "titleMedium", lineHeight: "titleMedium" }),
      large: bentoSprinkles({ fontSize: "titleLarge", lineHeight: "titleLarge" }),
    },
    color: {
      default: bentoSprinkles({ color: "textPrimary" }),
      informative: bentoSprinkles({ color: "textInformative" }),
      positive: bentoSprinkles({ color: "textPositive" }),
      warning: bentoSprinkles({ color: "textWarning" }),
      negative: bentoSprinkles({ color: "textNegative" }),
      secondary: bentoSprinkles({ color: "textSecondary" }),
      primaryInverse: bentoSprinkles({ color: "textPrimaryInverse" }),
      secondaryInverse: bentoSprinkles({ color: "textSecondaryInverse" }),
    },
  },
});

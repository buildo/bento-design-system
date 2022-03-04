import { strictRecipe } from "../../util/strictRecipe";
import { bentoSprinkles } from "../../internal/sprinkles.css";

export const bodyRecipe = strictRecipe({
  base: bentoSprinkles({ fontFamily: "default" }),
  variants: {
    size: {
      small: bentoSprinkles({ fontSize: "bodySmall", lineHeight: "bodySmall", letterSpacing: 1 }),
      medium: bentoSprinkles({ fontSize: "bodyMedium", lineHeight: "bodyMedium" }),
      large: bentoSprinkles({ fontSize: "bodyLarge", lineHeight: "bodyLarge" }),
    },
    weight: {
      regular: bentoSprinkles({ fontWeight: "regular" }),
      semibold: bentoSprinkles({ fontWeight: "semibold" }),
    },
    color: {
      default: bentoSprinkles({ color: "textPrimary" }),
      secondary: bentoSprinkles({ color: "textSecondary" }),
      negative: bentoSprinkles({ color: "textNegative" }),
      disabled: bentoSprinkles({ color: "textDisabled" }),
      positive: bentoSprinkles({ color: "textPositive" }),
      warning: bentoSprinkles({ color: "textWarning" }),
      informative: bentoSprinkles({ color: "textInformative" }),
      link: bentoSprinkles({ color: "textLink" }),
      inverse: bentoSprinkles({ color: "textPrimaryInverse" }),
    },
  },
});

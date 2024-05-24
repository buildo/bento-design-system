import { strictRecipe } from "../../util/strictRecipe";
import { bentoSprinkles } from "../../internal/sprinkles.css";
import { ellipsis } from "../typography.css";

export const titleRecipe = strictRecipe({
  base: bentoSprinkles({ fontFamily: "title" }),
  variants: {
    size: {
      small: bentoSprinkles({
        fontSize: "titleSmall",
        lineHeight: "titleSmall",
        fontWeight: "titleSmall",
        letterSpacing: "titleSmall",
      }),
      medium: bentoSprinkles({
        fontSize: "titleMedium",
        lineHeight: "titleMedium",
        fontWeight: "titleMedium",
        letterSpacing: "titleMedium",
      }),
      large: bentoSprinkles({
        fontSize: "titleLarge",
        lineHeight: "titleLarge",
        fontWeight: "titleLarge",
        letterSpacing: "titleLarge",
      }),
    },
    color: {
      default: bentoSprinkles({ color: "textPrimary" }),
      primary: bentoSprinkles({ color: "textPrimary" }),
      secondary: bentoSprinkles({ color: "textSecondary" }),
      primaryInverse: bentoSprinkles({ color: "textPrimaryInverse" }),
      secondaryInverse: bentoSprinkles({ color: "textSecondaryInverse" }),
      informative: bentoSprinkles({ color: "textInformative" }),
      positive: bentoSprinkles({ color: "textPositive" }),
      warning: bentoSprinkles({ color: "textWarning" }),
      negative: bentoSprinkles({ color: "textNegative" }),
      inherit: { color: "inherit" },
    },
    ellipsis: {
      false: {},
      true: ellipsis,
    },
  },
});

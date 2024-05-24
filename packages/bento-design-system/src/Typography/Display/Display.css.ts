import { strictRecipe } from "../../util/strictRecipe";
import { bentoSprinkles } from "../../internal";
import { ellipsis } from "../typography.css";

export const displayRecipe = strictRecipe({
  base: bentoSprinkles({ fontFamily: "display", color: "textPrimary" }),
  variants: {
    size: {
      small: bentoSprinkles({
        fontSize: "displaySmall",
        lineHeight: "displaySmall",
        fontWeight: "displaySmall",
        letterSpacing: "displaySmall",
      }),
      medium: bentoSprinkles({
        fontSize: "displayMedium",
        lineHeight: "displayMedium",
        fontWeight: "displayMedium",
        letterSpacing: "displayMedium",
      }),
      large: bentoSprinkles({
        fontSize: "displayLarge",
        lineHeight: "displayLarge",
        fontWeight: "displayLarge",
        letterSpacing: "displayLarge",
      }),
    },
    color: {
      primary: bentoSprinkles({ color: "textPrimary" }),
      secondary: bentoSprinkles({ color: "textSecondary" }),
      primaryInverse: bentoSprinkles({ color: "textPrimaryInverse" }),
      secondaryInverse: bentoSprinkles({ color: "textSecondaryInverse" }),
      inherit: { color: "inherit" },
    },
    ellipsis: {
      false: {},
      true: ellipsis,
    },
  },
});

import { strictRecipe } from "../../util/strictRecipe";
import { bentoSprinkles } from "../../internal";
import { ellipsis } from "../typography.css";

export const displayRecipe = strictRecipe({
  base: bentoSprinkles({ fontFamily: "display", fontWeight: "display", color: "textPrimary" }),
  variants: {
    size: {
      small: bentoSprinkles({ fontSize: "displaySmall", lineHeight: "displaySmall" }),
      medium: bentoSprinkles({ fontSize: "displayMedium", lineHeight: "displayMedium" }),
      large: bentoSprinkles({ fontSize: "displayLarge", lineHeight: "displayLarge" }),
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

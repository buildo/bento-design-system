import { strictRecipe } from "../../util/strictRecipe";
import { bentoSprinkles } from "../../internal/sprinkles.css";

export const labelRecipe = strictRecipe({
  base: bentoSprinkles({ fontFamily: "default", fontWeight: "label" }),
  variants: {
    size: {
      small: bentoSprinkles({
        fontSize: "labelSmall",
        lineHeight: "labelSmall",
        letterSpacing: 1,
      }),
      medium: bentoSprinkles({
        fontSize: "labelMedium",
        lineHeight: "labelMedium",
        letterSpacing: 1,
      }),
      large: bentoSprinkles({
        fontSize: "labelLarge",
        lineHeight: "labelLarge",
        letterSpacing: 2,
      }),
    },
    color: {
      default: {},
      primary: bentoSprinkles({ color: "textPrimary", fill: "textPrimary" }),
      primaryInverse: bentoSprinkles({ color: "textPrimaryInverse", fill: "textPrimaryInverse" }),
      secondary: bentoSprinkles({ color: "textSecondary", fill: "textSecondary" }),
      secondaryInverse: bentoSprinkles({
        color: "textSecondaryInverse",
        fill: "textSecondaryInverse",
      }),
      disabled: bentoSprinkles({ color: "textDisabled", fill: "textDisabled" }),
      link: bentoSprinkles({ color: "textLink", fill: "textLink" }),
    },
    uppercase: {
      false: {},
      true: bentoSprinkles({ textTransform: "uppercase" }),
    },
  },
});

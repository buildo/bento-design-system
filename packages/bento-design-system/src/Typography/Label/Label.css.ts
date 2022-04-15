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
      positive: bentoSprinkles({ color: "textPositive", fill: "textPositive" }),
      warning: bentoSprinkles({ color: "textWarning", fill: "textWarning" }),
      informative: bentoSprinkles({ color: "textInformative", fill: "textInformative" }),
      negative: bentoSprinkles({ color: "textNegative", fill: "textNegative" }),
      inherit: { color: "inherit", fill: "inherit" },
    },
    uppercase: {
      false: {},
      true: bentoSprinkles({ textTransform: "uppercase" }),
    },
  },
});

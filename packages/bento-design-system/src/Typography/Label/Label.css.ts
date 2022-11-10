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
      secondary: bentoSprinkles({ color: "textSecondary", fill: "textSecondary" }),
      primaryInverse: bentoSprinkles({ color: "textPrimaryInverse", fill: "textPrimaryInverse" }),
      secondaryInverse: bentoSprinkles({
        color: "textSecondaryInverse",
        fill: "textSecondaryInverse",
      }),
      interactive: bentoSprinkles({ color: "textInteractive", fill: "textInteractive" }),
      informative: bentoSprinkles({ color: "textInformative", fill: "textInformative" }),
      positive: bentoSprinkles({ color: "textPositive", fill: "textPositive" }),
      warning: bentoSprinkles({ color: "textWarning", fill: "textWarning" }),
      negative: bentoSprinkles({ color: "textNegative", fill: "textNegative" }),
      disabled: bentoSprinkles({ color: "textDisabled", fill: "textDisabled" }),
      inherit: { color: "inherit", fill: "inherit" },
    },
    uppercase: {
      false: {},
      true: bentoSprinkles({ textTransform: "uppercase" }),
    },
  },
});

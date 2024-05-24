import { strictRecipe } from "../../util/strictRecipe";
import { bentoSprinkles } from "../../internal/sprinkles.css";
import { ellipsis } from "../typography.css";

export const labelRecipe = strictRecipe({
  base: bentoSprinkles({ fontFamily: "label" }),
  variants: {
    size: {
      small: bentoSprinkles({
        fontSize: "labelSmall",
        lineHeight: "labelSmall",
        fontWeight: "labelSmall",
        letterSpacing: "labelSmall",
      }),
      medium: bentoSprinkles({
        fontSize: "labelMedium",
        lineHeight: "labelMedium",
        fontWeight: "labelMedium",
        letterSpacing: "labelMedium",
      }),
      large: bentoSprinkles({
        fontSize: "labelLarge",
        lineHeight: "labelLarge",
        fontWeight: "labelLarge",
        letterSpacing: "labelLarge",
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
    ellipsis: {
      false: {},
      true: ellipsis,
    },
    uppercase: {
      false: {},
      true: bentoSprinkles({ textTransform: "uppercase" }),
    },
  },
});

import { strictRecipe } from "../../util/strictRecipe";
import { bentoSprinkles } from "../../internal/sprinkles.css";
import { ellipsis } from "../typography.css";

export const bodyRecipe = strictRecipe({
  base: bentoSprinkles({ fontFamily: "body" }),
  variants: {
    size: {
      small: bentoSprinkles({
        fontSize: "bodySmall",
        lineHeight: "bodySmall",
        letterSpacing: "bodySmall",
      }),
      medium: bentoSprinkles({
        fontSize: "bodyMedium",
        lineHeight: "bodyMedium",
        letterSpacing: "bodyMedium",
      }),
      large: bentoSprinkles({
        fontSize: "bodyLarge",
        lineHeight: "bodyLarge",
        letterSpacing: "bodyLarge",
      }),
    },
    weight: {
      default: {},
      strong: {},
    },
    color: {
      default: bentoSprinkles({ color: "textPrimary" }),
      primary: bentoSprinkles({ color: "textPrimary" }),
      secondary: bentoSprinkles({ color: "textSecondary" }),
      primaryInverse: bentoSprinkles({ color: "textPrimaryInverse" }),
      secondaryInverse: bentoSprinkles({ color: "textSecondaryInverse" }),
      interactive: bentoSprinkles({ color: "textInteractive" }),
      informative: bentoSprinkles({ color: "textInformative" }),
      positive: bentoSprinkles({ color: "textPositive" }),
      warning: bentoSprinkles({ color: "textWarning" }),
      negative: bentoSprinkles({ color: "textNegative" }),
      disabled: bentoSprinkles({ color: "textDisabled" }),
      inherit: { color: "inherit" },
    },
    ellipsis: {
      false: {},
      true: ellipsis,
    },
  },
  compoundVariants: [
    {
      variants: {
        size: "small",
        weight: "default",
      },
      style: bentoSprinkles({ fontWeight: "bodySmall" }),
    },
    {
      variants: {
        size: "medium",
        weight: "default",
      },
      style: bentoSprinkles({ fontWeight: "bodyMedium" }),
    },
    {
      variants: {
        size: "large",
        weight: "default",
      },
      style: bentoSprinkles({ fontWeight: "bodyLarge" }),
    },
    {
      variants: {
        size: "small",
        weight: "strong",
      },
      style: bentoSprinkles({ fontWeight: "bodyStrongSmall" }),
    },
    {
      variants: {
        size: "medium",
        weight: "strong",
      },
      style: bentoSprinkles({ fontWeight: "bodyStrongMedium" }),
    },
    {
      variants: {
        size: "large",
        weight: "strong",
      },
      style: bentoSprinkles({ fontWeight: "bodyStrongLarge" }),
    },
  ],
});

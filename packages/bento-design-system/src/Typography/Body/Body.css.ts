import { strictRecipe } from "../../util/strictRecipe";
import { bentoSprinkles } from "../../internal/sprinkles.css";
import { style } from "@vanilla-extract/css";

export const bodyRecipe = strictRecipe({
  base: bentoSprinkles({ fontFamily: "default" }),
  variants: {
    size: {
      small: bentoSprinkles({ fontSize: "bodySmall", lineHeight: "bodySmall", letterSpacing: 1 }),
      medium: bentoSprinkles({ fontSize: "bodyMedium", lineHeight: "bodyMedium" }),
      large: bentoSprinkles({ fontSize: "bodyLarge", lineHeight: "bodyLarge" }),
    },
    weight: {
      default: bentoSprinkles({ fontWeight: "body" }),
      strong: bentoSprinkles({ fontWeight: "bodyStrong" }),
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
      true: style({
        display: "inline-block",
        width: "inherit",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }),
    },
  },
});

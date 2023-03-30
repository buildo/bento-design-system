import { strictRecipe } from "../../util/strictRecipe";
import { bentoSprinkles } from "../../internal";
import { style } from "@vanilla-extract/css";

export const headlineRecipe = strictRecipe({
  base: bentoSprinkles({ fontFamily: "default", fontWeight: "headline", color: "textPrimary" }),
  variants: {
    size: {
      small: bentoSprinkles({ fontSize: "headlineSmall", lineHeight: "headlineSmall" }),
      medium: bentoSprinkles({ fontSize: "headlineMedium", lineHeight: "headlineMedium" }),
      large: bentoSprinkles({ fontSize: "headlineLarge", lineHeight: "headlineLarge" }),
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

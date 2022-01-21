import { recipe } from "@vanilla-extract/recipes";
import { bentoSprinkles } from "../internal";

export const iconRecipe = recipe({
  variants: {
    width: {
      "8": bentoSprinkles({ width: "8" }),
      "16": bentoSprinkles({ width: "16" }),
      "24": bentoSprinkles({ width: "24" }),
    },
    height: {
      "8": bentoSprinkles({ height: "8" }),
      "16": bentoSprinkles({ height: "16" }),
      "24": bentoSprinkles({ height: "24" }),
    },
    color: {
      default: bentoSprinkles({ fill: "textPrimary" }),
      primary: bentoSprinkles({ fill: "textPrimary" }),
      informative: bentoSprinkles({ fill: "textInformative" }),
      positive: bentoSprinkles({ fill: "textPositive" }),
      warning: bentoSprinkles({ fill: "textWarning" }),
      negative: bentoSprinkles({ fill: "textNegative" }),
      disabled: bentoSprinkles({ fill: "textDisabled" }),
    },
  },
});
